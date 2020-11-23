import TrackingPlugin from '@shopgate/tracking-core/plugins/Base';
import getCart from '@shopgate/pwa-tracking/selectors/cart';
import initSDK from './sdk';
import {
  getCartAttributes,
  getCartAttributesFromOrder,
} from './helpers';

/**
 * Tracking plugin for Crossengage tracking
 */
class Crossengage extends TrackingPlugin {
  /**
   * Constructor
   *
   * @param {Object} config Config values for econda
   */
  constructor(config = {}) {
    super('crossengage');

    const options = {
      /**
       * UseNetPrices and excludeShipping only effects the purchase event data
       */
      useNetPrices: false,
      excludeShipping: false,
      ...config,
    };

    this.xngID = options.xngID;
    this.additionalOptions = options.additionalOptions;
    this.userMail = options.userMail;

    this.useNetPrices = options.useNetPrices;
    this.excludeShipping = options.excludeShipping;
    this.sendParentData = options.sendParentData;

    // These pages are not tracked as regular pageviews
    this.ignoredPageviews = ['item'];

    this.initPlugin();
  }

  /**
   * Initiate and setup the SDK
   */
  initPlugin() {
    window.xngID = this.xngID;
    window.additionalOptions = this.additionalOptions;

    initSDK();

    if (this.userMail) {
      this.identify(this.userMail);
    }

    this.register.pageview(({ page, cart }) => {
      // Some pages should be ignored here
      if (this.ignoredPageviews.includes(page.shopgateUrl)) {
        return;
      }

      if (page.shopgateUrl === 'cart_empty') {
        this.track('Viewed Cart', {
          cart: {
            total: 0,
            currency: cart.amount.currency,
            products: [],
          },
        });
        return;
      }

      if (page.shopgateUrl === 'cart') {
        const attributes = {
          cart: getCartAttributes(cart, this.useNetPrices),
        };
        this.track('Viewed Cart', attributes);
        return;
      }

      this.trackPage();
    });

    this.register.viewContent((data, { product }) => {
      this.track('Viewed Product', {
        sku: product.uid,
        name: product.name,
        price: this.useNetPrices ? product.amount.net : product.amount.gross,
        currency: product.amount.currency,
        category: '',
      });
    });

    this.register.addToCart((data, { products }, _, state) => {
      const cart = getCart(state);
      const cartAttributes = getCartAttributes(cart, this.useNetPrices);

      products.forEach((product) => {
        this.track('Added Product', {
          sku: product.uid,
          name: product.name,
          price: this.useNetPrices ? product.amount.net : product.amount.gross,
          currency: product.amount.currency,
          category: '',
          cart: cartAttributes,
        });
      });
    });

    // TODO:
    // Analytics.track('Removed Product', attributes);

    this.register.loginSuccess((user) => {
      this.userMail = user.mail;
      this.identify(this.userMail);
    });

    let previousSearch = null;

    this.register.search((data) => {
      /**
       * Track a search result page only once per searchTerm.
       * Ignores pageviews where only the sorting changed.
       */
      if (previousSearch === data.query) {
        return;
      }
      previousSearch = data.query;

      this.track('Searched Products', {
        searchTerm: data.query,
        productsDisplayed: Math.min(data.resultCount, 32),
      });
    });

    this.register.purchase((data, { order }) => {
      this.track('Completed Order', {
        orderId: order.number,
        total: parseFloat(this.useNetPrices ? order.amount.net : order.amount.gross),
        shipping: parseFloat(order.shipping.amount[this.useNetPrices ? 'net' : 'gross']),
        tax: data.tax,
        // "discount": 5,
        // "coupon": "hasbros",
        currency: data.currency,
        cart: getCartAttributesFromOrder(data, this.useNetPrices),
      });
    });
  }

  identify(email) {
    console.warn('identify', email);
    window.analytics.identify({
      email,
      noUserId: 'true',
    });
  }

  trackPage() {
    console.warn('page');
    window.analytics.page();
  }

  track(event, attributes) {
    console.warn(event, attributes);
    window.analytics.track(event, attributes);
  }
}

export default Crossengage;

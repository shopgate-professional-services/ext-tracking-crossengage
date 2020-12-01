# Shopgate Connect - Crossengage Tracking Extension

[![GitHub license](http://dmlc.github.io/img/apache2.svg)](LICENSE)

Integration of crossengages tracking SDK https://documentation.crossengage.io/tracking

## Configuration

### xngID
Get it from https://app.crossengage.io/settings/system-setup "Web tracking and response data API key"

### additionalOptions
Use it to set a businessUnit https://documentation.crossengage.io/tracking/business-units

## Supported Events
- Identify https://documentation.crossengage.io/tracking/user-behaviour/identify-method
- Pageview https://documentation.crossengage.io/tracking/user-behaviour/page-method
- Search https://documentation.crossengage.io/tracking/user-behaviour/track-method#searched-products
- Add to cart https://documentation.crossengage.io/tracking/user-behaviour/track-method#added-product-removed-product
- Purchase https://documentation.crossengage.io/tracking/user-behaviour/track-method#completed-order
- Viewed Product https://documentation.crossengage.io/tracking/user-behaviour/track-method#viewed-product
- Viewed Cart https://documentation.crossengage.io/tracking/user-behaviour/track-method#viewed-cart

## Not supported yet
- `coupon` field purchase
- `category` fields for products
- `Removed Product` event

## Documentation
- https://documentation.crossengage.io/

## Changelog

See [CHANGELOG.md](CHANGELOG.md) file for more information.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) file for more information.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

This extension is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.

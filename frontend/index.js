import { getUserEmail } from '@shopgate/pwa-common/selectors/user';
import Plugin from './Plugin';
import config from './config';

/**
 * Read the config and create plugin instances
 */
export default function init({ state }) {
  const userMail = getUserEmail(state);

  // eslint-disable-next-line no-new
  new Plugin({
    xngID: config.xngID,
    additionalOptions: config.additionalOptions,
    trackOrders: config.trackOrders,
    userMail,
  });
}

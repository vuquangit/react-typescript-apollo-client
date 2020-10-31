/**
 *
 * Asynchronously loads the component for Notifications
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))

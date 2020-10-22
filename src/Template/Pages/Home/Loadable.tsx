/**
 *
 * Asynchronously loads the component for Home
 *
 */

import loadable from 'Utils/loadable'

export default loadable(() => import('./index'))

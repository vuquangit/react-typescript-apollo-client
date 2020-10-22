/**
 *
 * Asynchronously loads the component for Login
 *
 */

import loadable from 'Utils/loadable'

export default loadable(() => import('./index'))

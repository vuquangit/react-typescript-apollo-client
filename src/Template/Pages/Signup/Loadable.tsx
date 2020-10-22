/**
 *
 * Asynchronously loads the component for Signup
 *
 */

import loadable from 'Utils/loadable'

export default loadable(() => import('./index'))

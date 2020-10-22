/**
 *
 * Asynchronously loads the component for Profile
 *
 */

import loadable from 'Utils/loadable'

export default loadable(() => import('./index'))

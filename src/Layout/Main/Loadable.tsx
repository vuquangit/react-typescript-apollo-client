/**
 *
 * Asynchronously loads the component for Main
 *
 */

import loadable from 'Utils/loadable'

export default loadable(() => import('./index'))

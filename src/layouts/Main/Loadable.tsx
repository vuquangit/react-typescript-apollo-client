/**
 *
 * Asynchronously loads the component for Main
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))

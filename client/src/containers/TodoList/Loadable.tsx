/**
 *
 * Asynchronously loads the component for TodoList
 *
 */

import loadable from '@/utils/loadable'

export default loadable(() => import('./index'))

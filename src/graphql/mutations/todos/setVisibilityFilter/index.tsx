import createSetVisibilityFilter from './setVisibilityFilter'
import { visibilityFilterVar } from '@/graphql/config/apollo-local-cache'

export const setVisibilityFilter = createSetVisibilityFilter(
  visibilityFilterVar
)

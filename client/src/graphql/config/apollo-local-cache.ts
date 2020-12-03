import { InMemoryCache, makeVar } from '@apollo/client'
import { VisibilityFilters, VisibilityFilter } from '../models/VisibilityFilter'

export const localCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        visibilityFilter: {
          read() {
            return visibilityFilterVar()
          },
        },
      },
    },
  },
})

export function initLocalCache() {}

/**
 * Set initial values when we create cache variables.
 */

export const visibilityFilterVar = makeVar<VisibilityFilter>(
  VisibilityFilters.SHOW_ALL
)

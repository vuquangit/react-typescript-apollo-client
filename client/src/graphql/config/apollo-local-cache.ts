import { InMemoryCache, makeVar } from '@apollo/client'
import { VisibilityFilters, VisibilityFilter } from '../models/VisibilityFilter'
// import { IS_LOGGED_IN } from '../queries/isUserLoggedIn'

export const localCache = new InMemoryCache({
  // stored to the cache
  typePolicies: {
    Query: {
      fields: {
        visibilityFilter: {
          read() {
            return visibilityFilterVar()
          },
        },
        isLoggedIn: {
          read() {
            return isLoggedInVar()
          },
        },
      },
    },
  },
})

/**
 * Storing local state in the cache
 * https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-the-cache
 */
export function initLocalCache() {
  // localCache.writeQuery({
  //   query: IS_LOGGED_IN,
  //   data: {
  //     isLoggedIn: !!localStorage.getItem("token"),
  //   },
  // });
}

/**
 * Reactive variables: https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables
 * Set initial values when we create cache variables.
 */

export const visibilityFilterVar = makeVar<VisibilityFilter>(
  VisibilityFilters.SHOW_ALL
)

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'))

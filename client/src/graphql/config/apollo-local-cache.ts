import { InMemoryCache, makeVar } from '@apollo/client'

// import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
// import introspectionQueryResultData from '../generated/fragment-matcher.json';

export const localCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar();
          }
        }
      }
    }
  }
})

export function initLocalCache() {
  // localCache.writeData({
  //   data: {
  //     shoppingCart: {
  //       __typename: 'ShoppingCart',
  //       id: btoa('ShoppingCart:1'),
  //       totalPrice: 0,
  //       numActionFigures: 0,
  //     },
  //   },
  // });
}

export const cartItemsVar = makeVar([]);

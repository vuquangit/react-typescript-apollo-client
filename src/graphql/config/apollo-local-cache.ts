import { InMemoryCache } from '@apollo/client'

// import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
// import introspectionQueryResultData from '../generated/fragment-matcher.json';

export const localCache = new InMemoryCache({
  //   fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
  // freezeResults: true,
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

import { ApolloClient, NormalizedCacheObject, ApolloLink } from '@apollo/client'

import { httpLink } from './apollo-link-http'
import { errorLink } from './apollo-link-error'
import { localCache, initLocalCache } from './apollo-local-cache'
import { localResolvers } from './apollo-resolvers'
import { restLink } from './apollo-link-rest'

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient(
  {
    link: ApolloLink.from([errorLink, restLink, httpLink]),
    // Note: httpLink is terminating so must be last, while retry & error wrap
    // the links to their right. State & context links should happen before (to
    // the left of) restLink.
    connectToDevTools: process.env.NODE_ENV !== 'production',
    cache: localCache,
    assumeImmutableResults: true,
    resolvers: localResolvers,
  }
)

initLocalCache()

import { gql } from '@apollo/client'

export const GET_CAT_IMAGES = gql`
  query getEverything($limit: String!) {
    getEverythingResult(limit: $limit)
      @rest(
        type: "Everything"
        path: "/images/search?limit={args.limit}&size=full"
        method: "GET"
        endpoint: "newsapi"
      ) {
      id
      breeds
      url
      width
      height
    }
  }
`

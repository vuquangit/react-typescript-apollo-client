import { gql } from '@apollo/client'

const GET_MEDIA = gql`
  query($id: Int) {
    # Define which variables will be used in the query (id)
    Media(id: $id, type: ANIME) {
      # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      status
      title {
        romaji
        english
        native
      }
    }
  }
`

const GET_PAGE_INFO = gql`
  query($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search) {
        id
        status
        title {
          english
          romaji
        }
      }
    }
  }
`

const GET_RESTAPI_CAT_IMAGES = gql`
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

export { GET_MEDIA, GET_PAGE_INFO, GET_RESTAPI_CAT_IMAGES }

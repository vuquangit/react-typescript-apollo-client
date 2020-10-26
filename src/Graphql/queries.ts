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

export { GET_MEDIA, GET_PAGE_INFO }

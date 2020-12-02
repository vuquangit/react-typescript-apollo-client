import { gql } from '@apollo/client'

export const GET_MEDIA = gql`
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

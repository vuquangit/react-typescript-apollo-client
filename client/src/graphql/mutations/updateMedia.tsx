import { gql } from '@apollo/client'

export const UPDATE_MEDIA = gql`
  mutation($id: Int, $mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry(id: $id, mediaId: $mediaId, status: $status) {
      id
      status
    }
  }
`

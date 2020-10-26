import { gql } from '@apollo/client'

const UPDATE_MEDIA = gql`
  mutation($id: Int, $mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry(id: $id, mediaId: $mediaId, status: $status) {
      id
      status
    }
  }
`
export { UPDATE_MEDIA }

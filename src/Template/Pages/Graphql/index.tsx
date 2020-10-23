import React, { FC, useRef, useState } from 'react'
import { DefaultLayout } from 'Layout'
import { gql, useQuery, useMutation } from '@apollo/client'
import { get } from 'lodash'
import axios, { AxiosRequestConfig } from 'axios'

const getMedia = gql`
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
const getPageInfo = gql`
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
const UPDATE_MEDIA = gql`
  mutation($mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry(mediaId: $mediaId, status: $status) {
      id
      status
    }
  }
`

const Profile: FC = () => {
  const {
    loading: mediaLoading,
    error: mediaError,
    data: mediaData,
    refetch: mediaRefetch,
  } = useQuery(getMedia)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const {
    loading: pageInfoLoading,
    error: pageInfoError,
    data: pageInfoData,
    fetchMore: pageInfoFetchMore,
  } = useQuery(getPageInfo, {
    variables: {
      search: 'Fate/Zero',
      page: 1,
      perPage: 2,
    },
  })

  const onLoadMorePage = () => {
    if (pageInfoData.Page.pageInfo.total <= pageInfoData.Page.media.length)
      return

    setCurrentPage((prev: number) => prev + 1)

    pageInfoFetchMore({
      variables: {
        page: currentPage,
      },
      updateQuery: (previousResult, { fetchMoreResult, variables }) => {
        // console.log('variables:', variables)
        // console.log('fetchMoreResult: ', fetchMoreResult)
        if (!fetchMoreResult) return previousResult
        return {
          ...previousResult,
          Page: {
            ...previousResult.Page,
            media: [
              ...get(previousResult, 'Page.media', []),
              ...get(fetchMoreResult, 'Page.media', []),
            ],
          },
        }
      },
    })
  }

  // console.log('media', mediaData)
  // console.log('data page', pageInfoData)

  // mutation
  const inputMedia = useRef(null)
  const [
    updateMediaEntry,
    {
      data: mutationData,
      // loading: mutationLoading,
      // error: mutationError
    },
  ] = useMutation(UPDATE_MEDIA)

  console.log('mutationData:', mutationData)

  const onUpdateMedia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateMediaEntry({
      variables: { mediaId: 1, status: 'PLANNING' },
      update(cache, mutationResult) {
        console.log('update result', mutationResult)
      },
    })
    // inputMedia.current.value = '';
  }

  // get access token
  const getAccesToken = async () => {
    // https://anilist.co/api/v2/oauth/null?code=def50200329c48caa49a7bc81e770fcda516290d3d49f94bb84a38f9ecf68589f40171a35d916e985392d3dc2c9296ac25cb3e33097507393c9e05bfdd5cb613249995a9be655a92220db0a2937b35a9033c0cf33429b4ae3448a19d9088f6aaaa578c43c6a3eb166f2c67cf70a1e5d021873366cb90db572a3739c529a7bd9fb9ca852f31985981f057aa527949c8caafda132ced39be5df9abd4ae3007f8bc1ddaef1bc851ed4190a8a73b9edb0fc80f10701a361ef0338ba3e2a71c73e776b088d92bd1665e92a33c147a0ee4befa4996daff74915aed8940a5cba916a1576900f393f77a7a980e003d601cd2e7ea2289b093ce5519f238b05b4ddd4f3b5741caec4e1067ca32786e9723392de8e4eca71854144aa0ac2585fae1fdb3ca1594533e903804ed093a44adf42518fc1a41be5cfadc2a14789c75709ad40feed44f909d6aa5a99cccdb7c0b
    const options: AxiosRequestConfig = {
      url: 'https://anilist.co/api/v2/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        grant_type: 'authorization_code',
        client_id: '4235',
        client_secret: 'lrNKk35Z8hzIcuy0HRQqrECBgWHLHIgpwa7a76Hk',
        redirect_uri: 'http://localhost:3000/graphql', // http://example.com/callback
        code:
          'def50200329c48caa49a7bc81e770fcda516290d3d49f94bb84a38f9ecf68589f40171a35d916e985392d3dc2c9296ac25cb3e33097507393c9e05bfdd5cb613249995a9be655a92220db0a2937b35a9033c0cf33429b4ae3448a19d9088f6aaaa578c43c6a3eb166f2c67cf70a1e5d021873366cb90db572a3739c529a7bd9fb9ca852f31985981f057aa527949c8caafda132ced39be5df9abd4ae3007f8bc1ddaef1bc851ed4190a8a73b9edb0fc80f10701a361ef0338ba3e2a71c73e776b088d92bd1665e92a33c147a0ee4befa4996daff74915aed8940a5cba916a1576900f393f77a7a980e003d601cd2e7ea2289b093ce5519f238b05b4ddd4f3b5741caec4e1067ca32786e9723392de8e4eca71854144aa0ac2585fae1fdb3ca1594533e903804ed093a44adf42518fc1a41be5cfadc2a14789c75709ad40feed44f909d6aa5a99cccdb7c0b', // The Authorization Code received previously
      },
    }

    try {
      const res = await axios(options)

      console.log('data access_token', res.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <DefaultLayout>
      <h1 className="profile">GRAPHQL</h1>
      <br />

      <button>
        <a
          target="blank"
          href="https://anilist.co/api/v2/oauth/authorize?client_id=4235&response_type=code"
        >
          Login with AniList
        </a>
      </button>
      <br />
      <br />

      <button onClick={getAccesToken}>GET ACCESS TOKEN</button>
      <hr />
      <br />

      <h2>Media:</h2>
      {mediaLoading && <div>Media is loading</div>}
      {mediaData && (
        <div>
          <div>id: {mediaData.Media.id}</div>
          <div>Status: {mediaData.Media.status}</div>
          <div>Title</div>
          <div>English: {mediaData.Media.title.english}</div>
          <div>Native: {mediaData.Media.title.native}</div>
          <div>Romaji: {mediaData.Media.title.romaji}</div>
        </div>
      )}
      {mediaError && <div>Media is error</div>}
      <button onClick={() => mediaRefetch()}>Refetch media!</button>
      <hr />
      <br />

      <h2>Pagination:</h2>
      {pageInfoLoading && <div>Page is loading</div>}
      <div>
        Page lenght: {pageInfoData ? pageInfoData.Page.media.length : 0}{' '}
      </div>
      {pageInfoError && <div>Error: {pageInfoError}</div>}
      <button onClick={onLoadMorePage}>fetch more</button>

      <hr />
      <div>
        <h2>Mutation:</h2>
        <form onSubmit={(e) => onUpdateMedia(e)}>
          <input ref={inputMedia} />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </DefaultLayout>
  )
}

export default Profile

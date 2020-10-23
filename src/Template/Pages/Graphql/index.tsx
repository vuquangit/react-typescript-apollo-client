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
        // 'code': '{code}', // The Authorization Code received previously
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
        <a href="https://anilist.co/api/v2/oauth/authorize?client_id=4235&redirect_uri=https://react-typescript-saga.vercel.app&response_type=code">
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

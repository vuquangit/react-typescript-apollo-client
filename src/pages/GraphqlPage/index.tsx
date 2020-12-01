import React, { FC, useRef, useState } from 'react'
import { DefaultLayout } from '@/layouts'
import { useQuery, useMutation } from '@apollo/client'
import { get } from 'lodash'
import axios, { AxiosRequestConfig } from 'axios'

import Container from '@/components/Container'
import {
  GET_MEDIA,
  GET_PAGE_INFO,
  GET_RESTAPI_CAT_IMAGES,
} from '@/graphql/queries'
import { UPDATE_MEDIA } from '@/graphql/mutations'

const GraphqlPage: FC = () => {
  const {
    loading: mediaLoading,
    error: mediaError,
    data: mediaData,
    refetch: mediaRefetch,
  } = useQuery(GET_MEDIA)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const {
    loading: pageInfoLoading,
    error: pageInfoError,
    data: pageInfoData,
    fetchMore: pageInfoFetchMore,
  } = useQuery(GET_PAGE_INFO, {
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

  // mutation
  const inputMedia = useRef(null)
  const [SaveMediaListEntry] = useMutation(UPDATE_MEDIA)
  const onUpdateMedia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    SaveMediaListEntry({
      variables: { id: 1, status: 'CURRENT' },
    })
  }

  // get access token
  const clientId = process.env.REACT_APP_API_CLIENT_ID
  const redirectUri = process.env.REACT_APP_API_REDIRECT_URL
  const getAccesToken = async () => {
    const options: AxiosRequestConfig = {
      url: 'https://anilist.co/api/v2/oauth/token',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
      data: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
        redirect_uri: redirectUri,
        code:
          'def502005a8062b7f9dcc843e9650e43d08dd1cc4c4aa003cc0255e1b4b4214bcfce01392cfe952c14435b6345c7b751cdd8f65de88d02c4aa3944259c675fb63b6f614da9c59aaa99731920254c84800f116e1cc95286313304895681d8f2f58288e27ae528ad34ff3148d5ac0d57ec14af30e7ff120c28df369a68250c7277752c0d72bd6673323771e9ae6048d7f01f49a3199ddca0ca5aed89f00c49dc16d9b5b642f90e2a63417613cbf69617e1b699cee136c05b1de0c45c4cf37ebf885c003e56645ad609f287608969274446972740e365ab70882c7dee0f91420ce880ff245e4fc56911ce5c0b60b050243de9cb49a6161125e4930fb7516c15c4f7f395862adc633106ad454c601356a050cac0926a2c05f37b8aff7a6aa81c5dbfd6687a9c74f380d20a86b5541a561975682689b95866a2bf2f585df1cffee855461233f7d81b1d54233fd2eadc2054954fb35c7dea51809bc1369079bd300450e66c0f721e2c48efb9744e0fa429a865',
      },
    }

    try {
      const res = await axios(options)

      console.log('data access_token', res.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  // rest api
  const {
    loading: newsEverythingLoading,
    error: newsEverythingError,
    data: newsEverythingData,
  } = useQuery(GET_RESTAPI_CAT_IMAGES, {
    variables: {
      limit: 10,
    },
  })

  return (
    <DefaultLayout>
      <Container>
        <div>
          <h2>GRAPHQL QUERY</h2>
          <br />

          <button>
            <a
              href={`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`}
            >
              Login with AniList
            </a>
          </button>
          <br />
          <br />

          <button onClick={getAccesToken}>GET ACCESS TOKEN</button>
          <hr />
          <br />
          <div>
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
          </div>

          {/*
        <div>
          <h2>Pagination:</h2>
          {pageInfoLoading && <div>Page is loading</div>}
          <div>
            Page lenght: {pageInfoData ? pageInfoData.Page.media.length : 0}{' '}
          </div>
          {pageInfoError && <div>Error: {pageInfoError}</div>}
          <button onClick={onLoadMorePage}>fetch more</button>
        </div>

        <hr />
        <div>
          <h2>Mutation:</h2>
          <form onSubmit={(e) => onUpdateMedia(e)}>
            <input ref={inputMedia} />
            <button type="submit">Add Todo</button>
          </form>
        </div> */}
        </div>

        <br />
        <br />

        <div>
          <h2 className="profile">GRAPHQL REST API</h2>
          <p>Search image: cat</p>
          {newsEverythingLoading && <p>REST API request is loading...</p>}
          {newsEverythingError && (
            <p>
              Error: <span>{newsEverythingError.message}</span>
            </p>
          )}
          {newsEverythingData && (
            <ol
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {newsEverythingData.getEverythingResult.map(
                (item: any, index: number) => (
                  <li key={item + index} style={{ width: '33.3333%' }}>
                    <img src={item.url} alt="" />
                  </li>
                )
              )}
            </ol>
          )}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default GraphqlPage

/**
 *
 * CatImageSearch
 *
 */

import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/client'

import { GET_CAT_IMAGES } from '@/graphql/queries/getCatImages'
import Button from '@/components/Button'

const CatImageSearch: FC = () => {
  const [limitImage, setLimitImages] = useState<number>(10)
  const onInputChange = (event: any) => {
    setLimitImages(event.target.value)
  }

  const handleSearchImages = () => {
    refetch({ limit: limitImage })
  }

  const handleKeyDown = (event: any) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      handleSearchImages()
    }
  }

  // rest api
  const { loading, error, data, refetch } = useQuery(GET_CAT_IMAGES, {
    variables: {
      limit: 10,
    },
  })

  return (
    <div>
      <h2 className="profile">GRAPHQL REST API</h2>
      <p>Search image: cat</p>
      <div>
        <label htmlFor="limitImages">Length:</label>
        <input
          type="number"
          min="0"
          id="limitImages"
          value={limitImage}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button ml="8px" cursor="pointer" onClick={handleSearchImages}>
          Search
        </Button>
      </div>
      {loading ? (
        <p>REST API request is loading...</p>
      ) : (
        <>
          {error && (
            <p>
              Error: <span>{error.message}</span>
            </p>
          )}

          {data && (
            <ol
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {data.getEverythingResult.map((item: any, index: number) => (
                <li key={item + index} style={{ width: '33.3333%' }}>
                  <img src={item.url} alt="" />
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </div>
  )
}

export default CatImageSearch

import React, { FC, ReactNode, useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@/themes/globalStyles'
import { lightTheme, darkTheme } from '@/themes/theme'
// import { ApolloProvider } from '@apollo/client'
import { GET_THEME_CURRENT } from '@/graphql/queries/getThemeCurrent'
import { MockedProvider } from '@apollo/client/testing'
import { applyTheme } from '@/graphql/config/apollo-local-cache'
import { localCache } from '@/graphql/config/apollo-local-cache'
// import { createMockClient } from 'mock-apollo-client'

export const mockThemeMode = (themeMode: string) => {
  return {
    request: {
      query: GET_THEME_CURRENT,
      // variables: {
      //   ...
      // },
    },
    result: {
      data: {
        themeMode: themeMode,
      },
    },
    // error: new Error('aw shucks'),
  }
}

type Props = {
  children: ReactNode
  themeMode: 'light' | 'dark'
}

const AppWrapper: FC<Props> = ({ children, themeMode }) => {
  const mock = mockThemeMode(themeMode)

  const [theme, setTheme] = useState<any>({})
  useEffect(() => {
    applyTheme(themeMode) // TODO: Fix me - can't apply ???
    themeMode === 'light' ? setTheme(lightTheme) : setTheme(darkTheme)
  }, [themeMode])

  return (
    <MockedProvider mocks={[mock]} cache={localCache} addTypename={false}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </MockedProvider>
  )
}

// const ApolloWrapper: FC<Props> = (props) => {
//   const mockClient = createMockClient({ cache: localCache })
//   const queryHandler = jest
//     .fn()
//     .mockResolvedValue({ data: { themeMode: 'light' } })
//   mockClient.setRequestHandler(GET_THEME_CURRENT, queryHandler)
//   return (
//     <ApolloProvider client={mockClient}>
//       <AppWrapper {...props} />
//     </ApolloProvider>
//   )
// }

export default AppWrapper

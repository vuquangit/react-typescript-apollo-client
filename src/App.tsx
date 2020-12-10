import React, { FC, useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { useQuery } from '@apollo/client'

import GlobalStyle from '@/themes/globalStyles'
import Main from '@/routes/main'
import { darkTheme, lightTheme } from '@/themes/theme'
import { GET_THEME_CURRENT } from '@/graphql/queries/getThemeCurrent'

const App: FC = () => {
  const {
    data: { themeMode },
  } = useQuery(GET_THEME_CURRENT)

  const [theme, setTheme] = useState(lightTheme)
  useEffect(() => {
    themeMode === 'light' ? setTheme(lightTheme) : setTheme(darkTheme)
  }, [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  )
}

export default App

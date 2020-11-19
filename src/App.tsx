import React, { FC, useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import isEqual from 'lodash/isEqual'

import GlobalStyle from 'themes/globalStyles'
import Main from 'routes/main'
import { RootState } from 'stores/rootReducer'
import { darkTheme, lightTheme } from 'themes/theme'

const App: FC = () => {
  const themeMode = useSelector(
    (state: RootState) => state.theme.themeMode,
    isEqual
  )
  const [theme, setTheme] = useState<any>(lightTheme)
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

import React, { FC } from 'react'
import GlobalStyle from 'Theme/globalStyles'
import Main from './Template/main'
import { ThemeProvider } from 'styled-components'
import * as theme from 'Theme/theme'

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </>
  )
}

export default App

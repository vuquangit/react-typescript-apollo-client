import React, { FC } from 'react'
import GlobalStyle from 'theme/globalStyles'
import Main from './Template/main'
import { ThemeProvider } from 'styled-components'
import * as theme from 'theme/theme'

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

import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'theme/globalStyles'
import Main from './template/main'
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

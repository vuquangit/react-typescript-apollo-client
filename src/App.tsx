import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import isEqual from 'lodash/isEqual'

import GlobalStyle from 'theme/globalStyles'
import Main from './routes/main'
import { RootState } from 'redux/rootReducer'

const App: FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme, isEqual)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  )
}

export default App

import React, { FC, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { initializeStore } from 'stores/store'
import GlobalStyle from 'themes/globalStyles'
import { lightTheme } from 'themes/theme'

type Props = {
  children: ReactNode
  themeMode: 'light' | 'dark'
}

const Wrapper: FC<Props> = ({ children, themeMode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initState: any = { theme: { themeMode: themeMode } }
  const store = initializeStore(initState)

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </Provider>
  )
}

export default Wrapper

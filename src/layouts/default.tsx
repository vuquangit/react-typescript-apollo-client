import React, { FC } from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

import { LayoutWrap } from './Layout.styled'

const Layout: FC = ({ children }) => {
  return (
    <LayoutWrap>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutWrap>
  )
}

export default Layout

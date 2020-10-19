import React, { FC } from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout

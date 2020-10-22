import React, { FC } from 'react'

import { HeaderWrap, NavItem, activeClassName } from './Header.styled'

interface INavList {
  id: number
  label: string
  link: string
  exact?: boolean
}

const Header: FC = () => {
  const navList: INavList[] = [
    {
      id: 1,
      label: 'Home',
      link: '/',
      exact: true,
    },
    {
      id: 2,
      label: 'Profile',
      link: '/profile',
      exact: true,
    },
    {
      id: 3,
      label: 'Login',
      link: '/login',
      exact: true,
    },
    {
      id: 4,
      label: 'Signup',
      link: '/signup',
      exact: true,
    },
  ]

  const navListRender = navList.map((item) => (
    <NavItem
      key={item.id}
      to={item.link}
      exact={item.exact}
      activeClassName={activeClassName}
    >
      {item.label}
    </NavItem>
  ))

  return (
    <header>
      <HeaderWrap>{navListRender}</HeaderWrap>
    </header>
  )
}

export default Header

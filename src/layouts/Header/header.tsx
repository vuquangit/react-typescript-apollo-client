import React, { FC } from 'react'

import { HeaderWrap, NavItem, activeClassName } from './Header.styled'
import { INavList } from './Home.types'
import { navList } from './mock'
import SwitchTheme from 'components/SwitchTheme'

const Header: FC = () => {
  const navListRender = navList.map((item: INavList) => (
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
      <HeaderWrap>
        <div>{navListRender}</div>
        <SwitchTheme />
      </HeaderWrap>
    </header>
  )
}

export default Header

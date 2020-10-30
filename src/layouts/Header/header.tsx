import React, { FC } from 'react'

import {
  HeaderWrapper,
  HeaderContent,
  NavItem,
  activeClassName,
} from './Header.styled'
import { INavList } from './Home.types'
import { navList } from './mock'
import SwitchTheme from 'components/SwitchTheme'
import Container from 'components/Container'

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
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <div>{navListRender}</div>
          <SwitchTheme />
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  )
}

export default Header

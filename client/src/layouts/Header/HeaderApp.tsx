import React, { FC } from 'react'
import { useQuery } from '@apollo/client'

import { IS_LOGGED_IN } from '@/graphql/queries/isUserLoggedIn'
import { BaseHeaderProps, INavList } from './Home.types'
import { navList } from './mock/navList'
import SwitchTheme from '@/components/SwitchTheme'
import Container from '@/components/Container'
import Button from '@/components/Button'
import { isLoggedInVar } from '@/graphql/config/apollo-local-cache'
import {
  HeaderWrapper,
  HeaderContent,
  NavItem,
  activeClassName,
  HeaderList,
} from './Header.styled'

const Header: FC<BaseHeaderProps> = () => {
  const { data } = useQuery(IS_LOGGED_IN)
  const isLoggedIn = data.isLoggedIn

  const handleLogout = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('userId', '')
    isLoggedInVar(false)
  }

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
        <HeaderContent isLoggedIn={isLoggedIn}>
          {isLoggedIn && <HeaderList>{navListRender}</HeaderList>}
          <HeaderList>
            <SwitchTheme />
            {isLoggedIn ? (
              <Button
                ml="8px"
                backgroundColor="transparent"
                cursor="pointer"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <NavItem to={'/login'} exact activeClassName={activeClassName}>
                  Login
                </NavItem>
                <NavItem to={'/signup'} exact activeClassName={activeClassName}>
                  Signup
                </NavItem>
              </>
            )}
          </HeaderList>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  )
}

export default React.memo(Header)

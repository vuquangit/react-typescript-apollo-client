import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { prop, ifProp } from 'styled-tools'
import { IHeaderContentProps } from './Home.types'
export const activeClassName = 'nav-item-active'

export const HeaderWrapper = styled.header`
  border-bottom: 1px solid #e2e2e2;
`

export const HeaderContent = styled('div')<IHeaderContentProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${ifProp(
    { isLoggedIn: true },
    ' space-between;',
    'flex-end'
  )};

  height: 70px;
  padding: 8px 20px;
  order: 0;
`

export const NavItem = styled(NavLink).attrs({
  activeClassName,
})`
  margin-right: 16px;
  color: ${prop('theme.textColor', '#fff')};

  &:last-child {
    margin-right: 0;
  }

  &.${activeClassName} {
    color: red;
    padding-bottom: 5px;
    margin-bottom: -6px;
    border-bottom: 1px solid red;
  }
`
export const HeaderList = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: flex-end;
`

import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const activeClassName = 'nav-item-active'

export const HeaderWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 70px;
  padding: 8px 20px;
  border-bottom: 1px solid #e2e2e2;
`

// ${(props) => props.theme.respondTo.sm`
//   flex-direction: columns;
// `}

export const NavItem = styled(NavLink).attrs({
  activeClassName,
})`
  margin-right: 16px;
  color: #000;

  &:last-child {
    margin-right: 0;
  }

  &.${activeClassName} {
    color: red;
  }
`

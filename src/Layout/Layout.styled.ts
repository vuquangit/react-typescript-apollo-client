import styled from 'styled-components'

export const LayoutWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  width: 100vw;
  min-height: 100%;
`

// ${(props) => props.theme.respondTo.sm`
//   flex-direction: columns;
// `}

// export const NavItem = styled(NavLink).attrs({
//   activeClassName,
// })`
//   margin-right: 16px;
//   color: #000;

//   &:last-child {
//     margin-right: 0;
//   }

//   &.${activeClassName} {
//     color: red;
//   }
// `

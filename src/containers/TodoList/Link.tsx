import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

interface LinkWrapperProps {
  selected: boolean
}

const LinkWrapper = styled('a')<LinkWrapperProps>`
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  ${ifProp(
    'selected',
    css`
      font-weight: 500;
    `
  )}
`

interface LinkProps {
  setFilter: () => any
  active: boolean
  children: any
}

const Link: FC<LinkProps> = ({ active, children, setFilter }) => (
  <LinkWrapper selected={active} onClick={() => setFilter()}>
    {children}
  </LinkWrapper>
)

export default Link

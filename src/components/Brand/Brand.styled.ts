import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { space } from 'styled-system'

export const BrandWrapper = styled('div')`
  ${space};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-left: -32px;
  margin-right: 24px;
`

export const BrandLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const BrandLogo = styled('img')`
  width: 24px;
  height: 24px;
`
export const BrandName = styled('div')`
  margin-left: 8px;
`

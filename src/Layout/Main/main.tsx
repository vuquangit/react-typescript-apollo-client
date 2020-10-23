import React, { FC } from 'react'
import { MainWrapper } from './Main.styled'

const Main: FC = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>
}

export default Main

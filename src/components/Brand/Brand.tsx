import React, { FC } from 'react'

import LogoImage from '@/assets/images/logo.jpg'
import { BrandWrapper, BrandLogo, BrandName, BrandLink } from './Brand.styled'
import { BaseBrandProps } from './Brand.types'

const Brand: FC<BaseBrandProps> = () => {
  return (
    <BrandWrapper>
      <BrandLink to="/">
        <BrandLogo src={LogoImage} alt="" />
        <BrandName>React</BrandName>
      </BrandLink>
    </BrandWrapper>
  )
}

export default Brand

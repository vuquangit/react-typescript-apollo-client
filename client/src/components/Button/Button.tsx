import { GET_THEME_CURRENT } from '@/graphql/queries/getThemeCurrent'
import { useQuery } from '@apollo/client'
import React, { FC, forwardRef } from 'react'

import { AppButton } from './Button.styled'
import { IButtonProps } from './Button.types'
const Button: FC<IButtonProps> = forwardRef((props, ref) => {
  const {
    data: { themeMode } = {}
  } = useQuery(GET_THEME_CURRENT)

  // console.log('BUTTON-themeMode', themeMode);

  return (
    <AppButton
      data-testid="app-button"
      ref={ref}
      variant="normal"
      themeMode={themeMode}
      {...props}
    >
      {props.children}
    </AppButton>
  )
})

Button.displayName = 'Button'
export default Button

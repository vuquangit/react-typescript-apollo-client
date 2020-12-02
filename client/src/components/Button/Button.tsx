import React, { FC, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/rootReducer'

import { AppButton } from './Button.styled'
import { IButtonProps } from './Button.types'
const Button: FC<IButtonProps> = forwardRef((props, ref) => {
  const themeMode = useSelector((state: RootState) => state.theme.themeMode)

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

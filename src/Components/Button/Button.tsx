import React, { FC, forwardRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { AppButton, theme } from './Button.styled'
import { IButtonProps } from './Button.types'

const Button: FC<IButtonProps> = forwardRef((props, ref) => {
  return (
    <ThemeProvider theme={theme}>
      <AppButton
        ref={ref}
        size="medium"
        variant="normal"
        theme={{ kind: 'dark' }}
        {...props}
      >
        {props.children}
      </AppButton>
    </ThemeProvider>
  )
})

Button.displayName = 'Button'
export default Button

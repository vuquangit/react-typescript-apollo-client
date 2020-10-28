/**
 *
 * Wrapper
 *
 */

import React, { FC } from 'react'
import { WrapperProps } from './Wrapper.types'
import { WrapperComponent } from './Wrapper.styled'
import { ThemeProvider } from 'styled-components'
import * as theme from 'theme/theme'

const Wrapper: FC<WrapperProps> = (props: WrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <WrapperComponent {...props} />
    </ThemeProvider>
  )
}

export default Wrapper

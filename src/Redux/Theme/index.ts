import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import get from 'lodash/get'

import { darkTheme } from 'theme/theme'

const isDarkModeLocal = window.localStorage.getItem('theme.isDarkMode')

type ThemeState = {
  theme: any
  isDarkMode: boolean
}

const initialState: ThemeState = {
  theme: darkTheme,
  isDarkMode: isDarkModeLocal === 'true',
}

const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    applyTheme(state, action: PayloadAction<any>) {
      state.theme = { ...get(action, 'payload', {}) }
      state.isDarkMode = !state.isDarkMode

      // save to local
      window.localStorage.setItem('theme.isDarkMode', `${state.isDarkMode}`)
    },
  },
})

export const { applyTheme } = theme.actions

export default theme.reducer

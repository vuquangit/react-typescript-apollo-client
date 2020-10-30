import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import get from 'lodash/get'
type ThemeState = {
  themeMode: 'light' | 'dark'
}

const themeModeLocal =
  window.localStorage.getItem('theme.themeMode') === 'light' ? 'light' : 'dark'

const initialState: ThemeState = {
  themeMode: themeModeLocal,
}

const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    applyTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.themeMode = get(action, 'payload', state.themeMode)

      // save to local
      window.localStorage.setItem(
        'theme.themeMode',
        JSON.stringify(state.themeMode)
      )
    },
  },
})

export const { applyTheme } = theme.actions

export default theme.reducer

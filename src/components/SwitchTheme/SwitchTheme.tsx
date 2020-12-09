import React, { FC } from 'react'
import { useQuery } from '@apollo/client'

import { GET_THEME_CURRENT } from '@/graphql/queries/getThemeCurrent'
import Emoji from '@/components/Emoji'
import { applyTheme } from '@/graphql/config/apollo-local-cache'

import { BaseSwitchThemeProps } from './SwitchTheme.types'
import {
  SwitchWrapper,
  SwitchTrack,
  SwitchTrackLight,
  SwitchTrackDark,
  SwitchToggleContent,
  SwitchToggleThumb,
  SwitchScreenReader,
} from './SwitchTheme.styled'

const SwitchTheme: FC<BaseSwitchThemeProps> = () => {
  const {
    data: { themeMode },
  } = useQuery(GET_THEME_CURRENT)

  const LIGHT = 'light'
  const DARK = 'dark'

  const onSwitchTheme = () => {
    if (themeMode === DARK) {
      applyTheme(LIGHT)
      localStorage.setItem('theme.themeMode', LIGHT)
    } else {
      applyTheme(DARK)
      localStorage.setItem('theme.themeMode', DARK)
    }
  }

  return (
    <SwitchWrapper onClick={onSwitchTheme} data-testid="switch-theme">
      <SwitchTrack>
        <SwitchTrackLight themeMode={themeMode} data-testid="track-light-mode">
          <SwitchToggleContent>
            <Emoji symbol="🌜" label="middle-moon" />
          </SwitchToggleContent>
        </SwitchTrackLight>
        <SwitchTrackDark themeMode={themeMode} data-testid="track-dark-mode">
          <SwitchToggleContent>
            <Emoji symbol="🌞" label="sun" />
          </SwitchToggleContent>
        </SwitchTrackDark>
      </SwitchTrack>
      <SwitchToggleThumb
        themeMode={themeMode}
        data-testid="switch-toggle-thumb"
      />
      <SwitchScreenReader
        aria-label="Dark mode toggle"
        type="checkbox"
        data-testid="switch-theme-input"
        checked={themeMode === 'light'}
        readOnly
      />
    </SwitchWrapper>
  )
}

export default SwitchTheme

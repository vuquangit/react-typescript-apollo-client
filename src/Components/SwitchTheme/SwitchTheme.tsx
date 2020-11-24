import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '@/stores/rootReducer'
import { applyTheme } from '@/stores/Theme'
import Emoji from '@/components/Emoji'
import {
  SwitchWrapper,
  SwitchTrack,
  SwitchTrackLight,
  SwitchTrackDark,
  SwitchToggleContent,
  SwitchToggleThumb,
  SwitchScreenReader,
} from './SwitchTheme.styled'

const SwitchTheme: FC = () => {
  const dispatch = useDispatch()
  const themeMode = useSelector((state: RootState) => state.theme.themeMode)

  const onSwitchTheme = () => {
    themeMode === 'dark'
      ? dispatch(applyTheme('light'))
      : dispatch(applyTheme('dark'))
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
        checked={themeMode === 'light'}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
      />
    </SwitchWrapper>
  )
}

export default SwitchTheme

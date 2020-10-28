import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { darkTheme, lightTheme } from 'theme/theme'
import { RootState } from 'redux/rootReducer'
import { applyTheme } from 'redux/Theme'

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
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  const onSwitchTheme = () => {
    isDarkMode
      ? dispatch(applyTheme(darkTheme))
      : dispatch(applyTheme(lightTheme))
  }

  return (
    <SwitchWrapper onClick={onSwitchTheme}>
      <SwitchTrack>
        <SwitchTrackLight isLightMode={!isDarkMode}>
          <SwitchToggleContent>🌜</SwitchToggleContent>
        </SwitchTrackLight>
        <SwitchTrackDark isDarkMode={isDarkMode}>
          <SwitchToggleContent>🌞</SwitchToggleContent>
        </SwitchTrackDark>
      </SwitchTrack>
      <SwitchToggleThumb checked={isDarkMode} />
      <SwitchScreenReader
        aria-label="Dark mode toggle"
        type="checkbox"
        checked={isDarkMode}
      />
    </SwitchWrapper>
  )
}

export default SwitchTheme

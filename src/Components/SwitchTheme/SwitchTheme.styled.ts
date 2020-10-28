import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import {
  BaseSwitchLight,
  BaseSwitchDark,
  BaseSwitchToggleThumb,
  BaseSwitchScreenReader,
} from './SwitchTheme.types'

export const SwitchWrapper = styled('div')`
  touch-action: pan-x;
  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;
`
export const SwitchTrack = styled('div')`
  width: 50px;
  height: 24px;
  padding: 0;
  border-radius: 30px;
  background-color: #4d4d4d;
  transition: all 0.2s ease;
`
export const SwitchTrackLight = styled('div')<BaseSwitchLight>`
  position: absolute;
  width: 14px;
  height: 10px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  left: 8px;
  opacity: ${ifProp({ isLightMode: true }, 1, 0)};
  transition: opacity 0.25s ease;
`

export const SwitchTrackDark = styled('div')<BaseSwitchDark>`
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  right: 10px;
  opacity: ${ifProp({ isDarkMode: true }, 1, 0)};
  transition: opacity 0.25s ease;
`

export const SwitchToggleContent = styled('span')`
  align-items: center;
  display: flex;
  height: 10px;
  justify-content: center;
  position: relative;
  width: 10px;
`

export const SwitchToggleThumb = styled('div')<BaseSwitchToggleThumb>`
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 1px;
  left: ${ifProp({ checked: true }, '1px', '27px')};
  width: 22px;
  height: 22px;
  border: 1px solid #4d4d4d;
  border-radius: 50%;
  background-color: #fafafa;
  box-sizing: border-box;
  transition: all 0.25s ease;

  box-shadow: 0 0 2px 3px #0099e0;
`

export const SwitchScreenReader: React.FC<BaseSwitchScreenReader> = styled(
  'input'
)<BaseSwitchScreenReader>`
  order: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

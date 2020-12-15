import styled from 'styled-components'
import { prop, ifProp } from 'styled-tools'
import {
  BaseDateTimePickerDetailProps,
  IDate,
} from './DateTimePickerDetail.types'
import { AppButton } from '@/components/Button/Button.styled'

export const DateTimePickerDetailWrapper = styled('div')<
  BaseDateTimePickerDetailProps & IDate
>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  cursor: ${ifProp({ disable: true }, 'default', 'pointer')};

  width: calc(100% / 7);
  height: 30px;
  background-color: #fff;
  border: 1px solid ${ifProp({ isToday: true }, '#000', '#fff')}

  &:hover {
    background-color: #b5d3ff;
  }
`

export const DateItem = styled(AppButton)`
  background-color: transparent;
  cursor: inherit;
  width: 100%;
  height: 100%;
  border-radius: 0;
  margin: 0;
  padding: 0;
`

import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import AppWrapper from '@/test/supports/AppWrapper'
import DateTimePicker from '.'
import { BaseDateTimePickerProps } from './DateTimePicker.types'

export default {
  title: 'Story/Components/DateTimePicker',
  component: DateTimePicker,
  argTypes: {},
} as Meta

const TemplateDateTimePicker: Story<BaseDateTimePickerProps> = (args) => (
  <AppWrapper>
    <DateTimePicker {...args}>Component story</DateTimePicker>
  </AppWrapper>
)

export const DateType = TemplateDateTimePicker.bind({})
DateType.args = {
  typePicker: 'date',
}

export const DateTimeLocalType = TemplateDateTimePicker.bind({})
DateTimeLocalType.args = {
  typePicker: 'datetime-local',
}

export const TimeType = TemplateDateTimePicker.bind({})
TimeType.args = {
  typePicker: 'time',
}

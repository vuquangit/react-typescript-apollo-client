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

const Template: Story<BaseDateTimePickerProps> = (args) => (
  <AppWrapper>
    <DateTimePicker {...args}>Component story</DateTimePicker>
  </AppWrapper>
)

export const Normal = Template.bind({})

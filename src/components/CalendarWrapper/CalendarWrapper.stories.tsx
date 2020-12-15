import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import AppWrapper from '@/test/supports/AppWrapper'
import CalendarWrapper from '.'
import CalendarDetail from '@/components/AttendanceDetail'

export default {
  title: 'Story/Components/CalendarWrapper',
  component: CalendarWrapper,
  argTypes: {},
} as Meta

const TemplateLight: Story = (args) => (
  <AppWrapper themeMode="light">
    <CalendarWrapper {...args}>
      <CalendarDetail />
    </CalendarWrapper>
  </AppWrapper>
)

export const Light = TemplateLight.bind({})

const TemplateDark: Story = (args) => (
  <AppWrapper themeMode="dark">
    <CalendarWrapper {...args}>
      <CalendarDetail />
    </CalendarWrapper>
  </AppWrapper>
)

export const Dark = TemplateDark.bind({})

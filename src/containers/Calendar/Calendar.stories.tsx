import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import AppWrapper from '@/test/supports/Wrapper'
import Calendar from '.'
// import {} from './Calendar.types'

export default {
  title: 'Story/Component/Calendar',
  component: Calendar,
  argTypes: {},
} as Meta

const TemplateLight: Story = (args) => (
  <AppWrapper themeMode="light">
    <Calendar {...args} />
  </AppWrapper>
)

export const Light = TemplateLight.bind({})

const TemplateDark: Story = (args) => (
  <AppWrapper themeMode="dark">
    <Calendar {...args} />
  </AppWrapper>
)

export const Dark = TemplateDark.bind({})

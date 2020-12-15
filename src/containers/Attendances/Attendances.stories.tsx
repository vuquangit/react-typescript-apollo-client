import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import AppWrapper from '@/test/supports/AppWrapper'
import Attendances from '.'

export default {
  title: 'Story/Container/Attendances',
  component: Attendances,
  argTypes: {},
} as Meta

const TemplateLight: Story = (args) => (
  <AppWrapper themeMode="light">
    <Attendances {...args} />
  </AppWrapper>
)

export const Light = TemplateLight.bind({})

const TemplateDark: Story = (args) => (
  <AppWrapper themeMode="dark">
    <Attendances {...args} />
  </AppWrapper>
)

export const Dark = TemplateDark.bind({})

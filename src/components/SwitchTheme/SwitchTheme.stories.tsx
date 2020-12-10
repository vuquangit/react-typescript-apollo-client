import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import AppWrapper from '@/test/supports/AppWrapper'

import SwitchTheme from '.'
import { BaseSwitchThemeProps } from './SwitchTheme.types'

export default {
  title: 'Story/Components/Component',
  component: SwitchTheme,
  argTypes: { onClick: { action: 'onSwitchTheme' } },
} as Meta

const Template: Story<BaseSwitchThemeProps> = (args) => (
  <AppWrapper themeMode="light">
    <SwitchTheme {...args}>Component story</SwitchTheme>
  </AppWrapper>
)

export const Normal = Template.bind({})
Normal.args = {}

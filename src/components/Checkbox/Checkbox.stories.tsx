import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Wrapper from '@/test/supports/AppWrapper'

import Checkbox from '.'
import { ICheckboxProps } from './Checkbox.types'

export default {
  title: 'Story/Components/Checkbox',
  component: Checkbox,
  argTypes: {},
} as Meta

const Template: Story<ICheckboxProps> = (args) => (
  <Wrapper themeMode="light">
    <Checkbox {...args}>Checkbox story</Checkbox>
  </Wrapper>
)

export const Normal = Template.bind({})
Normal.args = {
  label: 'Label text 🌼',
}

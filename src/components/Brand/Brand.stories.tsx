import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import AppWrapper from '@/test/supports/AppWrapper'
import Brand from '.'

export default {
  title: 'Story/Components/Brand',
  component: Brand,
  argTypes: {},
} as Meta

const Template: Story = (args) => (
  <AppWrapper>
    <Brand {...args}>Brand story</Brand>
  </AppWrapper>
)

export const Normal = Template.bind({})

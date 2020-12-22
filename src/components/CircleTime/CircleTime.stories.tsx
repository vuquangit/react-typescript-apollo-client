import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import AppWrapper from '@/test/supports/AppWrapper'
import CircleTime from '.'
import { ICircleTimeProps } from './CircleTime.types'

export default {
  title: 'Story/Components/CircleTime',
  component: CircleTime,
  argTypes: {},
} as Meta

const Template: Story<ICircleTimeProps> = (args) => (
  <AppWrapper>
    <CircleTime {...args}>Component story</CircleTime>
  </AppWrapper>
)

export const Normal = Template.bind({})

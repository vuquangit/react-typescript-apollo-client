import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import AppWrapper from '@/test/supports/AppWrapper'
import MyComponent from '.'
import { IMyComponentProps } from './MyComponent.types'

export default {
  title: 'Story/Components/MyComponent',
  component: MyComponent,
  argTypes: {},
} as Meta

const Template: Story<IMyComponentProps> = (args) => (
  <AppWrapper>
    <MyComponent {...args}>Component story</MyComponent>
  </AppWrapper>
)

export const Normal = Template.bind({})
Normal.args = {
  label: 'Normal MyComponent',
}

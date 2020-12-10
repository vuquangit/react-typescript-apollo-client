import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Wrapper from '@/test/supports/AppWrapper'

import Loader from '.'
import { ILoaderProps } from './Loader.types'

export default {
  title: 'Story/Components/Loader',
  component: Loader,
  argTypes: {},
} as Meta

const Template: Story<ILoaderProps> = (args) => (
  <Wrapper themeMode="light">
    <Loader {...args} />
  </Wrapper>
)

export const Normal = Template.bind({})
Normal.args = {
  size: 24,
}

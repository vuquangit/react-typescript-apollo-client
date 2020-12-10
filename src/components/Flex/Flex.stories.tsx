import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Wrapper from '@/test/supports/AppWrapper'

import Flex from '.'
import { IFlexProps } from './Flex.types'

export default {
  title: 'Story/Components/Flex',
  component: Flex,
  argTypes: {
    flexDirection: {
      control: {
        type: 'radio',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
      },
    },
  },
} as Meta

const Template: Story<IFlexProps> = (args) => (
  <Wrapper themeMode="light">
    <Flex {...args}>
      <div>Content 1</div>
      <div>Content 2</div>
      <div>Content 3</div>
      <div>Content 4</div>
      <div>Content 5</div>
    </Flex>
  </Wrapper>
)

export const Normal = Template.bind({})
Normal.args = {
  flexDirection: 'column',
}

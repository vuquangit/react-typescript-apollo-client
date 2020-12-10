import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Wrapper from '@/test/supports/AppWrapper'

import Emoji from '.'
import { IEmojiProps } from './Emoji.types'
import Flex from '../Flex'

export default {
  title: 'Story/Components/Emoji',
  component: Emoji,
  argTypes: {},
} as Meta

const Template: Story<IEmojiProps> = (args) => (
  <Wrapper themeMode="light">
    <Flex>
      <Emoji {...args} symbol="🌼" label="flower" />
      <Emoji {...args} symbol="🥰" label="face-heart" />
      <Emoji {...args} symbol="🤣" label="face-laugh" />
      <Emoji {...args} symbol="💙" label="heart-blue" />
      <Emoji {...args} symbol="💨" label="wind-blow" />
    </Flex>
  </Wrapper>
)

export const Normal = Template.bind({})

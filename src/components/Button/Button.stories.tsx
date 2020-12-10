import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import Wrapper from '@/test/supports/AppWrapper'

// import {
//   Title,
//   Subtitle,
//   Description,
//   Primary,
//   ArgsTable,
//   Stories,
//   PRIMARY_STORY,
// } from '@storybook/addon-docs/blocks'

import { Button } from '.'
import { IButtonProps } from './Button.types'

export default {
  title: 'Story/Components/Button',
  component: Button,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['normal', 'large'],
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta

const Template: Story<IButtonProps> = (args) => (
  <Wrapper themeMode="light">
    <Button {...args}>Button story</Button>
  </Wrapper>
)

export const Normal = Template.bind({})
Normal.args = {
  label: 'Normal button',
  variant: 'normal',
}

export const Large = Template.bind({})
Large.args = {
  label: 'Large button',
  variant: 'large',
}

export const Disable = Template.bind({})
Disable.args = {
  disabled: true,
}

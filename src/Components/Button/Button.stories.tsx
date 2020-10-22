import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

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
  title: 'Story/Component/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['large', 'medium'],
      },
    },
  },
  // parameters: {
  //   docs: {
  //     page: () => (
  //       <>
  //         <Title />
  //         <Subtitle />
  //         <Description />
  //         <Primary />
  //         <ArgsTable story={PRIMARY_STORY} />
  //         <Stories />
  //       </>
  //     ),
  //   },
  // },
} as Meta

const Template: Story<IButtonProps> = (args) => (
  <Button {...args}>Button story</Button>
)

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Small button',
}

export const Disable = Template.bind({})
Disable.args = {
  disabled: true,
}

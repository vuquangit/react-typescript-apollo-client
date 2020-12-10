import React, { FC } from 'react'
import { EmojiWrapper } from './Emoji.styled'
import { BaseEmojiProps } from './Emoji.types'

const Emoji: FC<BaseEmojiProps> = (props) => (
  <EmojiWrapper
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ''}
    aria-hidden={props.label ? 'false' : 'true'}
  >
    {props.symbol}
  </EmojiWrapper>
)
export default Emoji

import React, { useState, FC } from 'react'
import styled from 'styled-components'

const Input = styled('input')`
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  // padding: 6px;
  // border: 1px solid #999;
  // box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`
type Props = {
  onSave: (val: any) => any
  text?: string
  placeholder?: string
  editing?: boolean
  newTodo?: boolean
}

const TodoTextInput: FC<Props> = (props) => {
  const [text, setText] = useState(props.text || '')

  const handleSubmit = (e: any) => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      props.onSave(text)
      if (props.newTodo) {
        setText('')
      }
    }
  }

  const handleChange = (e: any) => {
    setText(e.target.value)
  }

  const handleBlur = (e: any) => {
    if (!props.newTodo) {
      props.onSave(e.target.value)
    }
  }

  return (
    <Input
      // className={classnames({
      //   edit: this.props.editing,
      //   'new-todo': this.props.newTodo,
      // })}
      type="text"
      placeholder={props.placeholder}
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  )
}

export default TodoTextInput

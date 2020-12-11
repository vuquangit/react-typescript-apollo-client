import styled from 'styled-components'
import { space } from 'styled-system'

export const DateTimePickerWrapper = styled('div')`
  ${space};
  // border: 0;
  // margin: 0;
  // display: inline-flex;
  // padding: 0;
  // position: relative;
  // min-width: 0;
  // flex-direction: column;
  // vertical-align: top;
`
export const DTPLabel = styled('label')`
  // display: block;
  // top: 0;
  // left: 0;
  // position: absolute;
  // transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
  //   transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  // transform: translate(0, 1.5px) scale(0.75);
  // transform-origin: top left;
`
export const DTPFormControl = styled('div')`
  display: flex;
  align-items: center;
  position: relative;
`

export const DTPInput = styled('div')`
  display: flex;
  // border: 1px #000 solid;

  &:after {
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    position: absolute;
    // transform: scaleX(0);
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid #90caf9;
    pointer-events: none;
  }
`

export const DTPDatetimeField = styled('input')`
  // display: inline;
  -webkit-user-modify: read-only !important;
  padding: 0;
  margin: 0;
  border: 0;
  // user-select: all;
  cursor: default;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    background-color: rgb(153, 200, 255);
    color: rgb(0, 0, 0);
    outline: none;
  }
`

export const DTPDatetimeSlash = styled('div')`
  cursor: default;
`

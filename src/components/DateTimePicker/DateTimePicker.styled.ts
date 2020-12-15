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

  // &:after {
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   content: '';
  //   position: absolute;
  //   // transform: scaleX(0);
  //   transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  //   border-bottom: 2px solid #90caf9;
  //   pointer-events: none;
  // }
`

export const DTPDatetimeField = styled('input')`
  // display: inline;
  // -webkit-user-modify: read-only !important;
  padding: 0;
  margin: 0;
  border: 0;

  cursor: default;
  background-color: #fff;
  color: #000;

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
  background-color: #fff;
  color: #000;
  margin-left: -2px;
  padding-right: 1px;
`

export const DTPCalendarIndicatorIcon = styled('div')`
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJjYWxlbmRhcl8xXyI+PHBhdGggZD0iTTI5LjMzNCwzSDI1VjFjMC0wLjU1My0wLjQ0Ny0xLTEtMXMtMSwwLjQ0Ny0xLDF2MmgtNlYxYzAtMC41NTMtMC40NDgtMS0xLTFzLTEsMC40NDctMSwxdjJIOVYxICAgYzAtMC41NTMtMC40NDgtMS0xLTFTNywwLjQ0Nyw3LDF2MkgyLjY2N0MxLjE5NCwzLDAsNC4xOTMsMCw1LjY2NnYyMy42NjdDMCwzMC44MDYsMS4xOTQsMzIsMi42NjcsMzJoMjYuNjY3ICAgQzMwLjgwNywzMiwzMiwzMC44MDYsMzIsMjkuMzMzVjUuNjY2QzMyLDQuMTkzLDMwLjgwNywzLDI5LjMzNCwzeiBNMzAsMjkuMzMzQzMwLDI5LjcwMSwyOS43MDEsMzAsMjkuMzM0LDMwSDIuNjY3ICAgQzIuMjk5LDMwLDIsMjkuNzAxLDIsMjkuMzMzVjUuNjY2QzIsNS4yOTksMi4yOTksNSwyLjY2Nyw1SDd2MmMwLDAuNTUzLDAuNDQ4LDEsMSwxczEtMC40NDcsMS0xVjVoNnYyYzAsMC41NTMsMC40NDgsMSwxLDEgICBzMS0wLjQ0NywxLTFWNWg2djJjMCwwLjU1MywwLjQ0NywxLDEsMXMxLTAuNDQ3LDEtMVY1aDQuMzM0QzI5LjcwMSw1LDMwLDUuMjk5LDMwLDUuNjY2VjI5LjMzM3oiIGZpbGw9IiMzMzMzMzIiLz48cmVjdCBmaWxsPSIjMzMzMzMyIiBoZWlnaHQ9IjMiIHdpZHRoPSI0IiB4PSI3IiB5PSIxMiIvPjxyZWN0IGZpbGw9IiMzMzMzMzIiIGhlaWdodD0iMyIgd2lkdGg9IjQiIHg9IjciIHk9IjE3Ii8+PHJlY3QgZmlsbD0iIzMzMzMzMiIgaGVpZ2h0PSIzIiB3aWR0aD0iNCIgeD0iNyIgeT0iMjIiLz48cmVjdCBmaWxsPSIjMzMzMzMyIiBoZWlnaHQ9IjMiIHdpZHRoPSI0IiB4PSIxNCIgeT0iMjIiLz48cmVjdCBmaWxsPSIjMzMzMzMyIiBoZWlnaHQ9IjMiIHdpZHRoPSI0IiB4PSIxNCIgeT0iMTciLz48cmVjdCBmaWxsPSIjMzMzMzMyIiBoZWlnaHQ9IjMiIHdpZHRoPSI0IiB4PSIxNCIgeT0iMTIiLz48cmVjdCBmaWxsPSIjMzMzMzMyIiBoZWlnaHQ9IjMiIHdpZHRoPSI0IiB4PSIyMSIgeT0iMjIiLz48cmVjdCBmaWxsPSIjMzMzMzMyIiBoZWlnaHQ9IjMiIHdpZHRoPSI0IiB4PSIyMSIgeT0iMTciLz48cmVjdCBmaWxsPSIjMzMzMzMyIiBoZWlnaHQ9IjMiIHdpZHRoPSI0IiB4PSIyMSIgeT0iMTIiLz48L2c+PC9zdmc+);
  background-origin: content-box;
  background-size: contain;
  height: 24px;
  margin-inline-start: 24px;
  opacity: 1;
  padding-bottom: 2px;
  padding-inline-start: 3px;
  padding-inline-end: 3px;
  padding-top: 5px;
  width: 1.2em;
  background-repeat: no-repeat;
  outline: none;
  cursor: pointer;

  background-color: #fff;
  color: #000;
  margin-left: 0;
`

export const DTPClockIndicatorIcon = styled('div')`
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2NCA2NDsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDY0IDY0IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxMzQ1NjM7fQo8L3N0eWxlPjxnPjxnIGlkPSJJY29uLUNsb2NrIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzguMDAwMDAwLCA0MjguMDAwMDAwKSI+PHBhdGggY2xhc3M9InN0MCIgZD0iTS0zNDYuMS0zNzMuMWMtMTIuNiwwLTIyLjktMTAuMy0yMi45LTIyLjljMC0xMi42LDEwLjMtMjIuOSwyMi45LTIyLjkgICAgIGMxMi42LDAsMjIuOSwxMC4zLDIyLjksMjIuOUMtMzIzLjEtMzgzLjQtMzMzLjQtMzczLjEtMzQ2LjEtMzczLjFMLTM0Ni4xLTM3My4xeiBNLTM0Ni4xLTQxNi41Yy0xMS4zLDAtMjAuNCw5LjItMjAuNCwyMC40ICAgICBzOS4yLDIwLjQsMjAuNCwyMC40czIwLjQtOS4yLDIwLjQtMjAuNFMtMzM0LjgtNDE2LjUtMzQ2LjEtNDE2LjVMLTM0Ni4xLTQxNi41eiIgaWQ9IkZpbGwtMTMxIi8+PHBvbHlsaW5lIGNsYXNzPSJzdDAiIGlkPSJGaWxsLTEzMiIgcG9pbnRzPSItMzM4LjksLTM4NC4zIC0zNDcuNCwtMzkyLjggLTM0Ny40LC00MDguMyAtMzQ0LjcsLTQwOC4zIC0zNDQuNywtMzkzLjkgICAgICAtMzM3LC0zODYuMiAtMzM4LjksLTM4NC4zICAgICIvPjwvZz48L2c+PC9zdmc+);
  background-origin: content-box;
  background-size: contain;
  height: 1.2em;
  margin-inline-start: 24px;
  opacity: 1;
  padding-bottom: 2px;
  padding-inline-start: 3px;
  padding-inline-end: 3px;
  padding-top: 2px;
  width: 1.2em;
  background-repeat: no-repeat;
  outline: none;
  cursor: pointer;

  background-color: #fff;
  color: #000;
`

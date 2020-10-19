import React, { FC, useEffect } from 'react'
import { DefaultLayout } from 'Layout'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { increment, decrement, reset } from 'Redux/Clock/Clock.action'
import { IStoreState } from 'Redux/rootReducer'

const Button = styled.button`
  color: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  ${(props) => props.theme.respondTo.sm`
    margin: 2em;
  `}
`

const HomePage: FC = () => {
  // const count = useSelector((state) => state.clock.count)
  const count = useSelector((state: IStoreState) => state.clock.count)

  const dispatch = useDispatch()

  return (
    <DefaultLayout>
      <div className="home-page">Home page</div>
      <Button>Theme button</Button>

      <div>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </DefaultLayout>
  )
}

export default HomePage

import React, { FC, createRef } from 'react'
import { DefaultLayout } from 'layouts'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { IStoreState, RootState } from 'redux/rootReducer'
import { increment, decrement, reset } from 'redux/Clock/Clock.action'
import { addCount, minusCount } from 'redux/Counter'
import { actionTypes as CounterActionTypes } from 'redux/Counter/actionTypes'

import { CLickCounterWrap } from './Home.styled'
import Button from 'components/Button'

export const incrementAsync = () => ({
  type: CounterActionTypes.INCREMENT_ASYNC,
})

const HomePage: FC = () => {
  const count = useSelector((state: IStoreState) => state.clock.count)

  const dispatch = useDispatch()

  const { clicks } = useSelector((state: RootState) => state.counter)

  const onCounterIncrement = () => {
    dispatch(addCount(1))
  }

  const onCounterDecrement = () => {
    dispatch(minusCount(1))
  }

  const onCounterIncrementAsync = () => dispatch(incrementAsync())

  const buttonRef = createRef()
  const handleClick = () => {
    console.log('handle click btn:', buttonRef.current)
  }

  // i18n
  const { t, i18n } = useTranslation()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <DefaultLayout>
      <div className="home-page">Home page</div>
      <hr />
      <br />

      <div> i18n: </div>
      <span>{t('Welcome to React')}</span>
      <div style={{ display: 'flex' }}>
        <div>CHange language: </div>
        <button onClick={() => changeLanguage('en')}>en</button>
        <button onClick={() => changeLanguage('vi')}>vi</button>
      </div>
      <hr />
      <br />

      <Button disabled>Disable button</Button>

      <Button
        ref={buttonRef}
        onClick={handleClick}
        size="large"
        width={[1, 1 / 2, 1 / 4]}
        theme={{ kind: 'darker' }}
        mt={12}
        m={[0, 1, 2]}
        variant="large"
      >
        Theme button
      </Button>

      <Button theme={{ kind: 'darkest' }}>darker</Button>

      <div>
        <h2>
          Clock Count: <span>{count}</span>
        </h2>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>

      <CLickCounterWrap>
        <h2>Click counter:</h2>
        <button onClick={onCounterIncrementAsync} className="button">
          Increment after 1 second
        </button>{' '}
        <button onClick={onCounterIncrement} className="button">
          + Increment
        </button>{' '}
        <button onClick={onCounterDecrement} className="button">
          - Decrement
        </button>
        <hr />
        <div>Clicked: {clicks} times</div>
      </CLickCounterWrap>
    </DefaultLayout>
  )
}

export default HomePage

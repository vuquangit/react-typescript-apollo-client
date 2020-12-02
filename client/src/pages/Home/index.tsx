import React, { FC, createRef, useState } from 'react'
import { DefaultLayout } from '@/layouts'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { RootState } from '@/stores/rootReducer'
import { increment, decrement, reset } from '@/stores/Clock/Clock.action'
import { addCount, minusCount } from '@/stores/Counter'
import { actionTypes as CounterActionTypes } from '@/stores/Counter/actionTypes'

import { CLickCounterWrap } from './Home.styled'
import Button from '@/components/Button'
import Container from '@/components/Container'
import mockData from './mockData.json'
import imageHome from '@/assets/images/img_1.jpg'
import Modal from '@/components/Modal'

export const incrementAsync = () => ({
  type: CounterActionTypes.INCREMENT_ASYNC,
})

const HomePage: FC = () => {
  const count = useSelector((state: RootState) => state.clock.count)

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

  // console.log(mockData)

  // open modal
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    <DefaultLayout>
      <Container>
        <div className="home-page">Home page: {mockData.text}</div>
        <hr />
        <br />

        <Button onClick={handleOpenModal}>Open modal</Button>
        <Modal show={openModal} onClose={handleCloseModal}>
          <h2>Modal title</h2>
          <div>
            <p>Content....</p>
            <img src="assets/images/img_1.jpg" alt="image alt" />
          </div>
        </Modal>

        <img src={imageHome} alt="image alt" />

        <div> i18n: </div>
        <span>{t('Welcome to React')}</span>
        <div style={{ display: 'flex' }}>
          <div>CHange language: </div>
          <Button onClick={() => changeLanguage('en')}>en</Button>
          <Button onClick={() => changeLanguage('vi')}>vi</Button>
        </div>
        <hr />
        <br />

        <Button disabled>Disable button</Button>

        <Button
          ref={buttonRef}
          onClick={handleClick}
          width={[1, 1 / 2, 1 / 4]}
          mt={12}
          m={[0, 1, 2]}
          variant="large"
        >
          Large button
        </Button>

        <Button themeMode={'light'}>Dark mode</Button>

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
      </Container>
    </DefaultLayout>
  )
}

export default HomePage

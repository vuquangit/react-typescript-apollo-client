import React, { FC, createRef, useState } from 'react'
import { DefaultLayout } from '@/layouts'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { CLickCounterWrap } from './Home.styled'
import Button from '@/components/Button'
import Container from '@/components/Container'
import mockData from './mockData.json'
import imageHome from '@/assets/images/img_1.jpg'
import Modal from '@/components/Modal'

const HomePage: FC = () => {
  const buttonRef = createRef()
  const handleClick = () => {
    console.log('handle click btn:', buttonRef.current)
  }

  // i18n
  const { t, i18n } = useTranslation()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

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
      </Container>
    </DefaultLayout>
  )
}

export default HomePage

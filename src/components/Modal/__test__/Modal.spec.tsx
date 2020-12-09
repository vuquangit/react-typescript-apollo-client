/**
 *
 * Tests for Modal
 *
 */

import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import Wrapper from '@/test/supports/Wrapper'
import Modal from '..'
import { applyTheme } from '@/graphql/config/apollo-local-cache'

type FakeProps = {
  children: React.ReactNode
}
const WrapperOfModal: React.FC<FakeProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    <Modal show={openModal} onClose={handleCloseModal}>
      {children}
    </Modal>
  )
}

describe('App SwitchTheme', () => {
  it('Test SwitchTheme with light mode', () => {
    applyTheme('light')

    const { container, getByTestId } = render(
      <Wrapper themeMode="light">
        <WrapperOfModal>Children of modal</WrapperOfModal>
      </Wrapper>
    )

    expect(container).toMatchSnapshot()
    expect(getByTestId('modal-wrapper')).toHaveStyleRule('display', 'flex')
    expect(getByTestId('modal-content')).toHaveStyleRule(
      'background-color',
      '#fff'
    )

    fireEvent.click(getByTestId('close-modal'))
    expect(getByTestId('modal-wrapper')).toHaveStyleRule('display', 'none')
  })

  it('Test SwitchTheme with dark mode', () => {
    applyTheme('dark')

    const { container, getByTestId } = render(
      <Wrapper themeMode="dark">
        <WrapperOfModal>Children of modal</WrapperOfModal>
      </Wrapper>
    )

    expect(container).toMatchSnapshot()
    expect(getByTestId('modal-wrapper')).toHaveStyleRule('display', 'flex')
    expect(getByTestId('modal-content')).toHaveStyleRule(
      'background-color',
      '#1e1e1e'
    )

    fireEvent.click(getByTestId('close-modal'))
    expect(getByTestId('modal-wrapper')).toHaveStyleRule('display', 'none')
  })
})

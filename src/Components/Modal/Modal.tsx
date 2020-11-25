import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/rootReducer'

import { BaseModalProps } from './Modal.types'
import Button from '@/components/Button'
import { ModalWrapper, ModalContent, ModalClose } from './Modal.styled'

const Modal: FC<BaseModalProps> = ({ show, onClose, children }) => {
  const themeMode = useSelector((state: RootState) => state.theme.themeMode)

  const ref = useRef(null)

  const escapeListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (
        ref !== null &&
        ref.current !== null &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        !ref.current.contains(e.target)
      ) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('click', clickListener, true)
    document.addEventListener('keyup', escapeListener)

    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keyup', escapeListener, true)
    }
  }, [clickListener, escapeListener])

  return (
    <ModalWrapper show={show} data-testid="modal-wrapper">
      <ModalContent ref={ref} themeMode={themeMode} data-testid="modal-content">
        {children}
        <ModalClose>
          <Button
            cursor="pointer"
            bg="transparent"
            border={0}
            onClick={onClose}
            data-testid="close-modal"
          >
            X
          </Button>
        </ModalClose>
      </ModalContent>
    </ModalWrapper>
  )
}

export default Modal

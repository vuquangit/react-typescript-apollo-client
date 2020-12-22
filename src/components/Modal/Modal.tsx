import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'

import { BaseModalProps } from './Modal.types'
import Button from '@/components/Button'
import { ModalWrapper, ModalContent, ModalClose } from './Modal.styled'
import { GET_THEME_CURRENT } from '@/graphql/queries/getThemeCurrent'

const Modal: FC<BaseModalProps> = ({
  show,
  onClose,
  children,
  widthContent,
  position,
  isShowCloseIcon = true,
  ...restProps
}) => {
  const {
    data: { themeMode = 'light' },
  } = useQuery(GET_THEME_CURRENT)

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
    <ModalWrapper show={show} position={position} data-testid="modal-wrapper">
      <ModalContent
        ref={ref}
        themeMode={themeMode}
        widthContent={widthContent}
        position={position}
        data-testid="modal-content"
        {...restProps}
      >
        {children}
        {isShowCloseIcon && (
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
        )}
      </ModalContent>
    </ModalWrapper>
  )
}

export default Modal

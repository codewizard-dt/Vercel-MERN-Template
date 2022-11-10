import { ReactNode, useEffect, useState } from 'react'
import { Button, Modal as ModalUI, ModalProps } from 'semantic-ui-react'
import './Modal.sass'
import { v4 as uuid } from 'uuid';

interface AppModalProps extends ModalProps {
  trigger: ReactNode
  onOpen?: () => void
  onClose?: () => void
  scrolling?: boolean
}

const Modal = ({ onClose, onOpen, scrolling = true, className, children, ...modalProps }: AppModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const modalId = uuid()

  const handleOpen = () => {
    setOpen(true)
    if (onOpen) onOpen()
  }
  const handleClose = () => {
    setOpen(false)
    if (onClose) onClose()
  }
  const fadeOut = () => {
    let el = document.getElementById(modalId)
    el?.classList.add('fade-out')
    el?.closest('.ui.dimmer')?.classList.add('fade-out')
    setTimeout(handleClose, 400)
  }

  useEffect(() => {
    if (open && onOpen) onOpen()
  }, [open])

  return (
    <ModalUI id={modalId} onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      {...modalProps}
    >
      <ModalUI.Content scrolling={scrolling}>
        {children}
      </ModalUI.Content>
      <ModalUI.Actions>
        <Button onClick={fadeOut}>
          Close
        </Button>
      </ModalUI.Actions>
    </ModalUI>
  )
}

export default Modal
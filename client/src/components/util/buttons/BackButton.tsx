import { useNavigate } from 'react-router-dom'
import { Button, ButtonProps } from 'semantic-ui-react'

export interface BackButtonProps extends ButtonProps { }

const BackButton = ({ content = "Go Back", ...buttonProps }: BackButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button onClick={() => navigate(-1)} content={content} {...buttonProps} />
  )
}

export default BackButton
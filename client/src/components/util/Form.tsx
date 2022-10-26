import React, { PropsWithChildren } from 'react'

export interface FormProps extends PropsWithChildren {
  onSubmit: () => void
}

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit}>

    </form>
  )
}

Form.defaultProps = {
}

export default Form
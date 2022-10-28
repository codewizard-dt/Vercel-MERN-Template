import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { Container } from "semantic-ui-react"
import { useRegister } from "../../util/AuthContext"

const RegisterForm = () => {
  const register = useRegister()
  const Form = useForm()
  const submit = async (credentials: any) => {
    return register(credentials)
  }
  return (
    <Container>
      <FormProvider>
        <Form submitBtnText='Register' submit={submit} fields={[
          { name: 'username' },
          { name: 'email' },
          { name: 'password', type: 'password' },
          { name: 'confirm_password', type: 'password' }
        ]} />
      </FormProvider>
    </Container>
  )

}

export default RegisterForm
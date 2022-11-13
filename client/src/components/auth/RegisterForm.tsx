import { useForm, useFormContext } from "@codewizard-dt/use-form-hook"
import { Container } from "semantic-ui-react"
import { AuthResponse, useAuthMethods } from "../../util/AuthContext"

const RegisterForm = () => {
  const auth = useAuthMethods()
  const Form = useForm<AuthResponse>()
  const { getData } = useFormContext()
  const submit = async (credentials: any) => {
    return auth.register(credentials)
  }
  return (
    <Container>
      <Form submitBtnText='Register' onSubmit={submit} fields={[
        { name: 'username' },
        { name: 'email' },
        { name: 'password', type: 'password' },
        {
          name: 'confirm_password', type: 'password', validators: [(value) => {
            return value === getData('password')
          }, 'Does not match password']
        }
      ]} />
    </Container>
  )

}

export default RegisterForm
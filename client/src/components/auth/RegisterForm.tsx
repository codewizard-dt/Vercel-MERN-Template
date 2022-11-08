import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { Container } from "semantic-ui-react"
import { useAuthMethods } from "../../util/AuthContext"
// import { useRegister } from "../../util/AuthContext"

const RegisterForm = () => {
  const auth = useAuthMethods()
  const Form = useForm()
  const submit = async (credentials: any) => {
    return auth.register(credentials)
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
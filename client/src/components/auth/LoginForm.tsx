import { FormProvider, useForm } from '@codewizard-dt/use-form-hook';
import { useNavigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { useLogin } from '../../util/AuthContext';

const LoginForm = () => {
  const login = useLogin()
  const Form = useForm()
  const navigate = useNavigate()

  const submit = async (credentials: any) => {
    return login(credentials)
  }

  return <Container>
    <FormProvider>
      <Form submitBtnText='Login' submit={submit} fields={[
        { name: 'username' },
        { name: 'password', type: 'password' }
      ]}
        buttons={[{ content: 'Register', onClick: () => navigate('/register') }]} />
    </FormProvider>
  </Container>
}

export default LoginForm
import { FormProvider, useForm } from '@codewizard-dt/use-form-hook';
import { useNavigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AuthResponse, useAuthMethods } from '../../util/AuthContext';
import { H1 } from '../basic-html/Headers';


const LoginForm = () => {
  const auth = useAuthMethods()
  const Form = useForm<AuthResponse>()
  const navigate = useNavigate()

  const submit = async (credentials: any) => auth.login(credentials)

  return <Container text>
    <H1>Vercel MERN Stack</H1>
    <FormProvider>
      <Form submitBtnText='Login' onSubmit={submit} fields={[
        { name: 'username' },
        { name: 'password', type: 'password' }
      ]}
        buttons={[{ content: 'Register', onClick: () => navigate('/register') }]} />
    </FormProvider>
  </Container>
}

export default LoginForm
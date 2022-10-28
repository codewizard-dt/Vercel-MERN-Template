import { FormProvider } from "@codewizard-dt/use-form-hook"
import { Route } from 'react-router-dom';
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const AuthRoutes = () => {
  return (
    <FormProvider>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
    </FormProvider>
  )
}

export default AuthRoutes
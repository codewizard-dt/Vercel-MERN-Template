import { Segment } from "semantic-ui-react"
import { H2, H3 } from "../components/basic-html/Headers"
import Code from "../components/helpers/code/Code"
import FunctionDoc from "./FunctionDoc"

const Forms = () => {
  return (
    <Segment>
      <H2>Forms and Form Handling</H2>
      <H3 italic>Hook</H3>
      <FunctionDoc name="useForm" type="Hook" filePath="import { useForm } from '@codewizard-dt/use-form-hook" returns="Component<FormProps>">
        <div className="description">Returns a component with simple event handling. Define the properties below and the rest will be automatically handled.</div>
        <Code language="tsx" stringLiteral={`import { ButtonProps, FormProps as FormPropsUI } from "semantic-ui-react"
import { Field, FieldGroup } from '../../context/form'; // @codewizard-dt/use-form-hook
import { FormResponseHandler, FormSubmitHandler } from '../types' // @codewizard-dt/use-form-hook

export interface FormProps extends FormPropsUI {
  fields: (Field & FieldGroup)[],
  buttons?: ButtonProps[]
  submit?: FormSubmitHandler
  respond?: FormResponseHandler<any>
  submitBtnText?: string
  display?: 'disabled' | 'edit' | 'toggle'
  successMessage?: string
}

const FormEl: React.FC<FormProps> = (props: FormProps) => 
  <Form 
    // onSubmit defined by \`props.submit\`
    // Auto generated form fields with state and error management
    // Submit button plus user-defined buttons via \`props.buttons\`
  />

export const useForm = (): React.FC<FormProps> => {
  const context = React.useContext(FormContext)

  useEffect(() => {
    context.clearData();
    context.clearErrors();
  }, [])

  return FormEl
}
`} />
      </FunctionDoc>
      <FunctionDoc name="useFormContext" type="Hook" filePath="import { useForm } from '@codewizard-dt/use-form-hook" returns="Component<FormProps>">

      </FunctionDoc>
    </Segment>
  )
}

export default Forms
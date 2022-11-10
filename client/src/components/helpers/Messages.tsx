import { Message } from "semantic-ui-react"
import { useMessages } from "../../util/MessageContext"
import './Messages.sass'

const Messages = () => {
  const messages = useMessages()
  return (
    <div id="Messages" style={{ zIndex: messages.length > 0 ? 0 : -1 }}>
      {messages.map((props) => <Message key={props.id} {...props} />)}
    </div>
  )
}

export default Messages
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'
import { MessageProps } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import ApiService from './ApiService'

// interface AppMessageProps extends MessageProps {
//   onClick?: (ev: { stopPropagation: () => void }) => void
// }
interface Message extends MessageProps {
  id: string
}

class MessageService {
  constructor() {
    ApiService.interceptors.response.use(res => {
      let { error } = res.data
      if (error) this.addErrorMessage(error)
      return res
    })
  }
  messages = new BehaviorSubject<Message[]>([])
  setMessages(messages: Message[]) {
    this.messages.next(messages)
  }
  private appendMessage(message: Message) {
    this.messages.next([message, ...this.list])
  }
  addMessage(message: string, options: MessageProps = {}) {
    let id = uuid()
    this.appendMessage({
      id,
      content: message,
      onDismiss: (ev, data) => {
        ev.stopPropagation()
        this.removeMessage(id)
      },
      ...options
    })
  }
  addErrorMessage(message: string) {
    this.addMessage(message, { error: true })
  }
  removeMessage(id: string) {
    document.getElementById(id)?.classList.add('fade-out')
    setTimeout(() => {
      this.setMessages(this.list.filter(({ id: id0 }) => id0 !== id))
    }, 800)
  }
  get list(): Message[] {
    return this.messages.getValue()
  }
}

interface MessageContextI {
  messages: Message[]
  service: MessageService
}

let MsgMethods = new MessageService()
const MessageContext = createContext<MessageContextI>({
  messages: [],
  service: MsgMethods
})

export const useMessages = () => useContext(MessageContext).messages
export const useMessageMethods = () => useContext(MessageContext).service

const MessageProvider = ({ children }: PropsWithChildren) => {
  const [messages, setMessages] = useState<Message[]>(MsgMethods.list)
  useEffect(() => {
    MsgMethods.messages.subscribe(value => setMessages(value))
  }, [])
  return (
    <MessageContext.Provider value={{ messages, service: MsgMethods }}>{children}</MessageContext.Provider>
  )
}

export default MessageProvider
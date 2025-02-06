import { Component, PropsWithChildren, createRef } from 'react'
import { View, Text, ScrollView, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: string
}

interface IState {
  messages: Message[]
  inputValue: string
  isTyping: boolean
  isSending: boolean
}

export default class Index extends Component<PropsWithChildren, IState> {
  private scrollViewRef = createRef()
  private inputRef = createRef()

  config = {
    navigationBarTitleText: 'Chat',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f8f9fa'
  }

  getTimestamp = () => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  }

  state: IState = {
    messages: [
      { 
        id: 1, 
        text: 'Olá! Como posso ajudar?', 
        isBot: true,
        timestamp: this.getTimestamp()
      }
    ],
    inputValue: '',
    isTyping: false,
    isSending: false
  }

  scrollToBottom = () => {
    if (this.scrollViewRef.current) {
      const query = Taro.createSelectorQuery()
      query.select('.messages-container').boundingClientRect()
      query.exec(res => {
        if (res[0]) {
          Taro.pageScrollTo({
            scrollTop: res[0].height,
            duration: 300
          })
        }
      })
    }
  }

  componentDidMount() {
    this.scrollToBottom()
    Taro.setNavigationBarTitle({
      title: 'Chat'
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length !== this.state.messages.length) {
      this.scrollToBottom()
    }
  }

  handleInput = (e) => {
    this.setState({
      inputValue: e.detail.value
    })
  }

  handleFocus = () => {
    setTimeout(this.scrollToBottom, 300)
  }

  simulateBotResponse = () => {
    this.setState({ isTyping: true })

    setTimeout(() => {
      const botMessage = {
        id: this.state.messages.length + 2,
        text: 'Entendi! Como posso ajudar com isso?',
        isBot: true,
        timestamp: this.getTimestamp()
      }

      this.setState(prevState => ({
        messages: [...prevState.messages, botMessage],
        isTyping: false
      }))
    }, 1500)
  }

  handleSend = async () => {
    if (!this.state.inputValue.trim() || this.state.isSending) return

    this.setState({ isSending: true })

    const newMessage = {
      id: this.state.messages.length + 1,
      text: this.state.inputValue,
      isBot: false,
      timestamp: this.getTimestamp()
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 150))
      this.setState(prevState => ({
        messages: [...prevState.messages, newMessage],
        inputValue: '',
        isSending: false
      }), () => {
        this.simulateBotResponse()
      })
    } catch (error) {
      this.setState({ isSending: false })
      Taro.showToast({
        title: 'Erro ao enviar mensagem',
        icon: 'none'
      })
    }
  }

  render() {
    const { messages, inputValue, isTyping, isSending } = this.state

    return (
      <View className='chat-container'>
        <ScrollView
          className='messages-container'
          scrollY
          scrollWithAnimation
          ref={this.scrollViewRef}
          enhanced
          showScrollbar={false}
          bounces={false}
        >
          {messages.map(message => (
            <View 
              key={message.id} 
              className={`message ${message.isBot ? 'bot' : 'user'}`}
            >
              <Text>{message.text}</Text>
              <Text className='timestamp'>{message.timestamp}</Text>
            </View>
          ))}
          {isTyping && (
            <View className='message bot typing-indicator'>
              <Text>Digitando...</Text>
            </View>
          )}
        </ScrollView>

        <View className='input-container'>
          <Input
            className='message-input'
            type='text'
            value={inputValue}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            placeholder='Digite sua mensagem...'
            ref={this.inputRef}
            disabled={isSending}
            confirmType='send'
            confirmHold
          />
          <Button 
            className='send-button'
            onClick={this.handleSend}
            disabled={!inputValue.trim() || isSending}
          >
            <View className='send-icon'>
              <Text>→</Text>
            </View>
          </Button>
        </View>
      </View>
    )
  }
}

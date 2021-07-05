import React, { useState, useEffect, useRef } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr'
import MinimizeIcon from '@material-ui/icons/Minimize'
import { Chat } from '@progress/kendo-react-conversational-ui'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  chatContainer: {
    position: 'fixed',
    bottom: '0',
    // width: '100%',
    zIndex: '9999',
  },
  chatHeader: {
    height: '2em',
    backgroundColor: '#3f51b5',
    textAlign: 'right',
    color: 'white',
    paddingRight: '1em',
  },
  hideChat: {
    height: '0',
  },
}))

const ChatWrapper = props => {
  const [chat, setChat] = useState([])
  const [hideChat, setHideChat] = useState(true)
  const latestChat = useRef(null)

  latestChat.current = chat
  const classes = useStyles()

  useEffect(() => {
    if (props.user && props.user.token) {
      const connection = new HubConnectionBuilder()
        // .withUrl('http://10.13.104.2:81/hubs/chat')
        .withUrl('https://www.itcompany.website.com/hubs/chat')
        // .withUrl('https://localhost:44374/hubs/chat')
        // .withAutomaticReconnect()
        .build()

      connection
        .start()
        .then(result => {
          connection.on('ReceiveMessage', message => {
            const updatedChat = [...latestChat.current]
            if (!updatedChat.some(m => m.id === message.id)) {
              updatedChat.push(message)
            }
            setChat(updatedChat)
          })
        })
        .then(
          async () =>
            await fetch(
              `https://www.itcompany.website.com/api/chat/initialize?client=${connection.connectionId}&username=${props.user.username}`,
              // `https://localhost:44374/api/chat/initialize?client=${connection.connectionId}&username=${props.user.username}`,
              { method: 'GET' },
            ),
        )
        .catch(e => console.log('Connection failed: ', e))
    }
  }, [props.user])

  const addNewMessage = async event => {
    const chatMessage = {
      user: event.message.author.username,
      message: event.message.text,
    }

    try {
      // await fetch('http://10.13.104.2:81/api/chat/messages', {
      await fetch('https://www.itcompany.website.com/api/chat/messages', {
      // await fetch('https://localhost:44374/api/chat/messages', {
        method: 'POST',
        body: JSON.stringify(chatMessage),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {}
  }

  const renderContent = () => {
    if (props.user && props.user.token) {
      return (
        <div className={classes.chatContainer}>
          <div className={classes.chatHeader}>
            <MinimizeIcon
              onClick={() => {
                setHideChat(!hideChat)
              }}
            />
          </div>
          <Chat
            className={hideChat && classes.hideChat}
            user={props.user}
            messages={chat.map(m => {
              return { author: { id: m.id, name: m.user }, text: m.message }
            })}
            onMessageSend={addNewMessage}
            placeholder={'Type a message...'}
            width={400}
          />
        </div>
      )
    } else {
      return <div></div>
    }
  }

  return renderContent()
}
export default connect(({ user }) => ({ user }), null)(ChatWrapper)

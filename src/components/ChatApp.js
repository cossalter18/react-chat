require('../styles/ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';

// This is where the main logic of the app will be. Here is where we will
// communicate with the chat server (send and receive messages). We will
// then pass the data received from the server to other components to be
// displayed
class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    //set initial state
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);

    //connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    //listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    })
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject)
  }

  addMessage(message){
    const messages = this.state.messages;
    messages.push(message);
    this.setState({messages})
  }

  render() {
    return (
      <div className='container'>
        <h3>React Chat App</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler}/>
      </div>
    )
    // Here we want to render the main chat application components
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;

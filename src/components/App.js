require('../styles/App.css');
require('../styles/Login.css');

import React from 'react';
import ChatApp from './ChatApp';

// This is the first screen seen by the user. We should display some way for
// them to enter their name and enter the chat room
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: ''};

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this)
  }

  usernameChangeHandler(event) {
    this.setState({username: event.target.value})
  }

  usernameSubmitHandler(event){
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username})
  }
  
  render() {
    if (this.state.submitted) {
      //form was submitted, show the main App
      return (
        <ChatApp username={this.state.username} />
      )
    }
    // Display a simple login screen with a username field and a submit button
    return (
      <form onSubmit={this.usernameSubmitHandler}
        className='username-container'>
        <h1>React Instant Chat</h1>
        <div>
          <input
        type='text'
        onChange={this.usernameChangeHandler}
        placeholder="Enter a username..."
        required />
        </div>
        <input type="submit" value="Submit" />
      </form>
    )
  }

}
App.defaultProps = {
        };

export default App;

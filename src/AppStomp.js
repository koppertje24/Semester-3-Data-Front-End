import React from 'react';
import { Client } from '@stomp/stompjs';

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class AppStomp extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: 'You server message here.',
    };
  };

  sendMessage = (destination, body) => {
    if(this.client.connected)
    {
      console.log('Send message to websocket',body);
      this.client.publish({ destination, headers: {}, body: JSON.stringify(body) });
    }
  };

  componentDidMount() {
    let currentComponent = this;

    let onConnected = () => {
      console.log("Connected!!")
      currentComponent.client.subscribe('/topic/message', function (msg) {
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          var newMessage = '';

          console.log("Raw data Message", jsonBody)

          if (jsonBody.time) {
            newMessage += 'time: ' + jsonBody.time;
          }

          if (jsonBody.message) {
            newMessage += 'Message: ' + jsonBody.message;
          }
          if (jsonBody.logs) {
            newMessage += ' Logs: ' + jsonBody.logs;
          }

          console.log("Message received", newMessage)
          currentComponent.setState({ messages: newMessage });
        }
      });
    }

    let onDisconnected = () => {
      console.log("Disconnected!!")
    }

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected
    });

    this.client = client;
    client.activate();
  };

  render() {
    return (
      <div>
        <div>{this.state.messages}</div>
        <button onClick={() => this.sendMessage('/app/sendMessage', { message: 'Hello, server!' })}>
          Send Message
        </button>
      </div>
    );
  }
}

export default AppStomp;

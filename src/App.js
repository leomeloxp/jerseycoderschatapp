import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';
console.disableYellowBox = true;

const url = 'http://localhost:3000'; // change accordingly

export default class App extends React.Component {
  state = {
    user: '',
    userEntered: false,
    message: '',
    messages: []
  };

  componentDidMount = () => {
    this.refreshMessages();
    setInterval(this.refreshMessages, 1000);
  };

  refreshMessages = () => {
    fetch(url)
      .then(resp => resp.json())
      .then(messages => {
        this.setState({ messages });
      })
      .catch(err => console.log(err));
  };

  postMessage = () => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        user: this.state.user,
        message: this.state.message
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(messages => this.setState({ messages }))
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.userEntered) {
      return (
        <SafeAreaView
          style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
        >
          <View>
            <Text style={{ alignContent: 'center' }}>Enter your name</Text>
          </View>
          <View>
            <TextInput
              style={{ backgroundColor: 'lightgrey', fontSize: 30 }}
              value={this.state.user}
              onChangeText={user => this.setState({ user })}
            />
          </View>
          <View>
            <Button
              title="Confirm"
              onPress={() => this.setState({ userEntered: true })}
            />
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView
        style={{ flex: 1, alignContent: 'center', justifyContent: 'flex-end' }}
      >
        <View>
          {this.state.messages.map(message => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start'
              }}
            >
              <Text style={{ fontWeight: '800', flex: 1 }}>
                {message.user}:{' '}
              </Text>
              <Text style={{ flex: 1 }}>{message.message}</Text>
            </View>
          ))}
        </View>
        <View>
          <TextInput
            multiline
            style={{ backgroundColor: 'lightgrey' }}
            value={this.state.message}
            onChangeText={message => this.setState({ message })}
          />
        </View>
        <View>
          <Button title="Submit" onPress={this.postMessage} />
        </View>
      </SafeAreaView>
    );
  }
}

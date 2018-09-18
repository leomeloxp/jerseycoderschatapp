import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import {SafeAreaView, View, Text, TextInput, Button} from 'react-native';
console.disableYellowBox = true;

const url = 'http://localhost:3000/'

export default class App extends React.Component {
    state = {
        user: null,
        userEntered: false,
        messages: [],
    }

    getMessage() {
        fetch(url)
            .then(resp => resp.json())
            .then(data => this.processMessages(data))
            .catch(err => console.log(err))
    }

    processMessages(data) {
        var messages = []
        for (var i in data) {
            var msg = data[i]
            var message = {
                _id: i,
                    text: msg['message'],
                user: {
                _id: msg['user'],
                name: msg['user'],
            },
            }
            messages.push(message)
        }
        console.log(messages)
        this.setState({messages: messages})
    }

    componentWillMount() {
        this.getMessage()
        this.countdown = setInterval(this.getMessage.bind(this), 5000);
    }

    onSend(messages = []) {
        for (var i in messages) {
            var message = messages[i]
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({user: this.state.user, message: message.text}),
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
                .then(resp => resp.json())
                .then(data => this.processMessages(data))
                .catch(err => console.log(err))
        }
    }

    render() {

        if(this.state.userEntered == false) {
            return (
            <SafeAreaView style={{flex:1, alignContent: 'center', justifyContent: 'center'}}>
                <View>
                <Text style={{alignContent:'center'}}>Enter your name</Text>
                </View>
                <View>
                <TextInput style={{backgroundColor: 'lightgrey', fontSize: 30}} value={this.state.user} onChangeText={(user) => this.setState({user})}/>
                </View>
                <View>
                <Button title='Confirm' onPress={() => this.setState({userEntered: true})}/>
                </View>

            </SafeAreaView>)}


        return (
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />

        )
    }
}
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
console.disableYellowBox = true;
console.disableRedBox = true;

export default class App extends React.Component {
  handleButtonClick = () => {
    alert('Message');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>First.</Text>
        <Text>Second.</Text>
        <Text>Third.</Text>
        <Button
          title="Learn More"
          color="rebeccapurple"
          onPress={this.handleButtonClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

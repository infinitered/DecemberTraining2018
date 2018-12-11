import React, { Component } from "react"
import { StyleSheet, Text, View } from "react-native"

export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings"
  })

  render() {
    return (
      <View style={styles.container}>
        <Text>Account</Text>
        <Text>Notifications</Text>
        <Text>Log Out</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    paddingTop: 100
  }
})

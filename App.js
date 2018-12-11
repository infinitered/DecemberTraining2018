import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native"

const Button = props => {
  const { onButtonPress, text, styleOverride } = props
  return (
    <TouchableOpacity style={[styles.button, styleOverride]} onPress={() => onButtonPress()}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const ListInput = props => {
  const { value, onChangeText, onAddItem, onClearItems } = props
  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={val => onChangeText(val)}
        autoFocus
      />
      <Button text="ADD" onButtonPress={() => onAddItem()} />
      <Button
        text="Clear"
        onButtonPress={() => onClearItems()}
        styleOverride={{ backgroundColor: "gray" }}
      />
    </View>
  )
}

export default class App extends Component {
  state = { inputValue: "", items: [] }

  addItem = () => {
    const { inputValue, items } = this.state
    if (inputValue) {
      const newItems = [...items, inputValue]
      this.setState({ items: newItems, inputValue: "" }) // Clear the inputValue (& TextField) on add item as well
    }
  }

  clearItems = () => this.setState({ inputValue: "", items: [] })

  render() {
    const { items, inputValue } = this.state
    return (
      <View style={styles.container}>
        <ListInput
          value={inputValue}
          onAddItem={this.addItem}
          onClearItems={this.clearItems}
          onChangeText={value => this.setState({ inputValue: value })}
        />
        {items.map((item, i) => (
          <Text style={styles.theValue} key={i}>
            {item}
          </Text>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5
  },
  theValue: {
    margin: 10,
    fontSize: 18
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 5,
    fontSize: 12
  },
  inputRow: {
    flexDirection: "row"
  },
  button: {
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "green"
  },
  buttonText: {
    margin: 5,
    color: "white",
    fontSize: 11
  }
})

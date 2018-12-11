import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native"

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
        onSubmitEditing={onAddItem}
        autoFocus
      />
      <Button text="ADD" onButtonPress={onAddItem} />
      <Button
        text="Clear"
        onButtonPress={onClearItems}
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
      // const newItems = [...items, inputValue]
      // this.setState({ items: newItems, inputValue: "" }) // Clear the inputValue (& TextField) on add item as well

      // TODO: add this to check item
      const newItems = [...items, { name: inputValue, checked: false }] // ADD:
      this.setState({ items: newItems, inputValue: "" }) // ADD:
    }
  }

  clearItems = () => this.setState({ inputValue: "", items: [] })

  checkItem = selectedItem => {
    const selectedName = selectedItem.name
    const newItems = this.state.items.map(item => {
      const { name, checked } = item
      return name === selectedName ? { name: name, checked: !checked } : item
    })
    this.setState({ items: newItems })
  }

  listItems(item, index) {
    const backgroundColor = item.checked ? "dodgerblue" : "indigo"
    return (
      <TouchableOpacity
        onPress={() => this.checkItem(item)}
        style={[styles.itemWrapper, { backgroundColor }]}
        key={index}
      >
        <Text style={styles.item}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { items, inputValue } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ListInput
            value={inputValue}
            onAddItem={this.addItem}
            onClearItems={this.clearItems}
            onChangeText={value => this.setState({ inputValue: value })}
          />
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={items}
            extraData={{ data: items.length }}
            keyExtractor={item => item}
            renderItem={({ item, index }) => this.listItems(item, index)}
            contentContainerStyle={styles.listContainer}
            style={styles.list}
            numColumns={3}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF" // ADD:
  },
  topContainer: {
    // ADD:
    flex: 1, // ADD:
    justifyContent: "center", // ADD:
    alignItems: "center", // ADD:
    borderBottomWidth: 1, // ADD:
    borderBottomColor: "black" // ADD:
  }, // ADD:
  bottomContainer: {
    // ADD:
    flex: 1, // ADD:
    padding: 20 // ADD:
  }, // ADD:
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
  },
  // Add this for FlatList
  topContainer: {
    // ADD:
    flex: 1, // ADD:
    justifyContent: "center", // ADD:
    alignItems: "center", // ADD:
    borderBottomWidth: 1, // ADD:
    borderBottomColor: "black" // ADD:
  }, // ADD:
  bottomContainer: {
    // ADD:
    flex: 1, // ADD:
    padding: 20 // ADD:
  }, // ADD:
  list: {
    // ADD:
    width: "95%", // ADD:
    minHeight: 40, // ADD:
    alignSelf: "center" // ADD:
  }, // ADD:
  listContainer: {
    // ADD:
    flex: 1, // ADD:
    borderWidth: 1, // ADD:
    borderColor: "lightgray", // ADD:
    backgroundColor: "white" // ADD:
  }, // ADD:
  item: {
    // ADD:
    margin: 5, // ADD:
    fontSize: 18, // ADD:
    color: "white", // ADD:
    fontWeight: "bold", // ADD:
    alignSelf: "center" // ADD:
  }, // ADD:
  itemWrapper: {
    // ADD:
    margin: 2, // ADD:
    flex: 1, // ADD:
    justifyContent: "center" // ADD:
  } // ADD:
})

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

export default class BusinessList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Business List",
    headerRight: (
      <Text onPress={() => navigation.navigate("Personal")} style={{ marginRight: 10 }}>
        Personal
      </Text>
    )
    // drawerLabel: "Business",
    // drawerIcon: <Text>🥳</Text>
  })
  state = { inputValue: "", items: [] }

  addItem = () => {
    const { inputValue, items } = this.state
    if (inputValue) {
      const newItems = [...items, { name: inputValue, checked: false }]
      this.setState({ items: newItems, inputValue: "" })
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
    backgroundColor: "#F5FCFF"
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  bottomContainer: {
    flex: 1,
    padding: 20
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
  },
  // Add this for FlatList
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  bottomContainer: {
    flex: 1,
    padding: 20
  },
  list: {
    width: "95%",
    minHeight: 40,
    alignSelf: "center"
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "white"
  },
  item: {
    margin: 5,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center"
  },
  itemWrapper: {
    margin: 2,
    flex: 1,
    justifyContent: "center"
  }
})

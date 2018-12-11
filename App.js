import React, { Component } from "react"
import BusinessList from "./BusinessList"
import PersonalList from "./PersonalList"
import SettingsScreen from "./SettingsScreen"
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation"

import { Text, View } from "react-native"

// const RootStack = createBottomTabNavigator({
//   Home: createStackNavigator({
//     screen: BusinessList,
//     navigationOptions: () => ({
//       title: "Packing List"
//     })
//   }),
//   Input: createStackNavigator(
//     { PersonalList },
//     {
//       navigationOptions: () => ({
//         title: "ADD ITEM"
//       })
//     }
//   )
// })

// const RootStack = createBottomTabNavigator({
//   Business: createStackNavigator({ BusinessList }),
//   Personal: createStackNavigator({ PersonalList })
// })

// TODO: for adding drawer v v v
const DrawerStack = createDrawerNavigator(
  {
    Business: BusinessList,
    Personal: PersonalList,
    Settings: SettingsScreen
  },
  {
    contentOptions: {
      onItemPress: ({ navigation }, route) => navigation.navigate(route)
    }
  }
)

// ADD: v v v
const RootStack = createStackNavigator({
  Business: BusinessList,
  Personal: PersonalList
  // Settings: SettingsScreen
})

const PersonalStack = createStackNavigator({
  Personal: PersonalList
})

// TODO: For adding Tabs
const TabNavigator = createBottomTabNavigator(
  {
    Business: RootStack,
    Personal: PersonalStack
  },
  {
    defaultNavigationOptions: () => ({
      tabBarIcon: ({ focused, tintColor }) => {
        return <Text>🧳</Text>
      },
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }
    })
  }
)

export default createAppContainer(RootStack)

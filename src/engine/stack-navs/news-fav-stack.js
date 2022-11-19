import React, { useState, useEffect, useContext } from "react"
import { Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TransitionPresets } from "@react-navigation/stack"
import NewsScreen from "../../screens/news"
import FavScreen from "../../screens/fav"
import AppContext from "../../contexts/app-context"
import NewsDetailsScreen from "../../screens/news-details"


const NewsFavStackScreen = function ({ display }) {


  const NewsFavStackNavigator = createNativeStackNavigator()

  const {theme} = useContext(AppContext)

  if (!display) return

  return (
    <NavigationContainer>

      <NewsFavStackNavigator.Navigator initialRouteName="News" screenOptions={{headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid, contentStyle: {backgroundColor: theme}}}>

        <NewsFavStackNavigator.Screen component={NewsScreen} name="News">

        </NewsFavStackNavigator.Screen>

        <NewsFavStackNavigator.Screen component={FavScreen} name="Saved">

        </NewsFavStackNavigator.Screen>

        <NewsFavStackNavigator.Screen component={NewsDetailsScreen} name="Details">

        </NewsFavStackNavigator.Screen>

      </NewsFavStackNavigator.Navigator>

    </NavigationContainer>
  )
}


export default NewsFavStackScreen
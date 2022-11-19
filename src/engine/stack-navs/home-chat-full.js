import React, { useEffect, useState } from "react";
import ChatScreen from "../../screens/chat";
import HomeScreen from "../../screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



const HomeChatStack = function ({ display }) {


  const HomeStackNavigator = createNativeStackNavigator()

  if (!display) return

  return (
    <NavigationContainer>

      <HomeStackNavigator.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS
      }}>

        <HomeStackNavigator.Screen component={HomeScreen} name="Home"></HomeStackNavigator.Screen>

        <HomeStackNavigator.Screen component={ChatScreen} name="Chat"></HomeStackNavigator.Screen>

      </HomeStackNavigator.Navigator>

    </NavigationContainer>

  )
}


export default HomeChatStack
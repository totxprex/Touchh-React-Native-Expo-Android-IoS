import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import LoginScreen from "../../screens/auth/login";
import SignupScreen from "../../screens/auth/signup";
import AuthContext from "../../contexts/login-signup-context";




const LoginSignupStack = function ({ renderPopUp, backendServer, setLoggedIn, setUsersData, loggedIn, setToken, setTheme, setDyColor, setSocket, updateUsersData }) {


  const AuthStack = createNativeStackNavigator()



  return (
    <AuthContext.Provider value={{ renderPopUp, backendServer, setLoggedIn, setUsersData, loggedIn, setToken, setTheme, setDyColor, setSocket, updateUsersData }}>
      <NavigationContainer>

        <AuthStack.Navigator screenOptions={{
          ...TransitionPresets.BottomSheetAndroid,
          headerShown: false
        }} initialRouteName="Login">

          <AuthStack.Screen component={LoginScreen} name="Login">

          </AuthStack.Screen>

          <AuthStack.Screen component={SignupScreen} name="Signup">

          </AuthStack.Screen>

        </AuthStack.Navigator>

      </NavigationContainer>
    </AuthContext.Provider>

  )
}



export default LoginSignupStack
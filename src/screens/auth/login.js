import React, { useState, useEffect, useRef, useContext } from "react"
import { View, ImageBackground, Text, Image, Animated, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import styles from "../../styles/styles"
import bg from "../../../assets/loginBg.png"
import threeD from "../../../assets/3d.png"
import { TextInput, Button } from "react-native-paper"
import AuthContext from "../../contexts/login-signup-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LoadingLarge from "../../components/loading-Large"
import { initiateSocket } from "../../../socket"


function LoginScreen({ navigation }) {

  const startOpaValue = useRef(new Animated.Value(-30)).current
  const [loading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [whatToDo, setWhatToDo] = useState(null)

  const { renderPopUp, backendServer, setLoggedIn, setUsersData, setToken, setTheme, setDyColor, setSocket, updateUsersData } = useContext(AuthContext)



  useEffect(() => {
    Animated.timing(startOpaValue, {
      duration: 3000,
      toValue: 30,
      useNativeDriver: false,
      isInteraction: true
    }).start()

  }, [startOpaValue])


  async function check() {
    try {
      const token = await AsyncStorage.getItem("touchh-token")
      const username = await AsyncStorage.getItem("touchh-username")

      if (!username || !token) return setWhatToDo("stay")

      const userInfo = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get/${username}`)).json()

      if (!userInfo.data) setWhatToDo("stay")

      setToken(token)

      setUsersData(userInfo.data)

      setSocket(initiateSocket(userInfo.data.username))


      const theme = await AsyncStorage.getItem("touchh-theme")

      const dyColor = await AsyncStorage.getItem("touchh-dyColor")

      setTheme(theme)

      setDyColor(dyColor)

      setLoggedIn(true)


    }
    catch {
      setWhatToDo("stay")
    }
  }

  useEffect(() => {
    check()
  }, [])



  async function logIn() {

    if (!username || !password) return

    setIsLoading(true)

    try {
      const user = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/login/${username}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ loginPassword: password })
      })).json()

      if (user.status === "Internal Server Error") throw new Error("Username or password incorrect")

      await AsyncStorage.setItem("touchh-token", user.data.token)
      await AsyncStorage.setItem("touchh-username", user.data.username)

      await AsyncStorage.setItem("touchh-theme", "white")
      await AsyncStorage.setItem("touchh-dyColor", "On")

      const tokenn = await AsyncStorage.getItem("touchh-token")
      const usernamee = await AsyncStorage.getItem("touchh-username")

      const userInfo = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${tokenn}/user/get/${usernamee}`)).json()

      if (!userInfo.data.username) throw new Error("Internal server error")

      const theme = await AsyncStorage.getItem("touchh-theme")

      const dyColor = await AsyncStorage.getItem("touchh-dyColor")

      setTheme(theme || "white")

      setDyColor(dyColor || "On")

      setSocket(initiateSocket(userInfo.data.username))

      setToken(tokenn)

      setUsersData(userInfo.data)

      setLoggedIn(true)

      setIsLoading(false)
    }

    catch (err) {
      renderPopUp(`An error occured; it's not you...`)
      setIsLoading(false)
    }


  }















  if (!whatToDo) return (
    <LoadingLarge isLoading={true} />
  )

  else if (whatToDo === "stay") return (
    <ImageBackground resizeMode="cover" imageStyle={{ opacity: 1 }} source={bg} style={styles.loginCont}>

      <View style={{ flexDirection: "row", justifyContent: "center", height: 100, marginBottom: 30 }}>
        <Animated.Image style={{ width: 100, height: 100, position: "absolute", marginTop: startOpaValue }} source={threeD} resizeMode="cover" />
      </View>




      <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%" }}>

        <Text style={{ fontSize: 30, marginBottom: 30 }}>Log In</Text>

        <TextInput onChangeText={(text) => setUsername(text)} mode="flat" label="username" placeholder="@username" style={styles.loginInput}></TextInput>

        <TextInput onChangeText={(text) => setPassword(text)} mode="flat" label="password" placeholder="******" style={styles.loginInput}></TextInput>


        <TouchableOpacity activeOpacity={0.6} onPress={logIn} >
          <Button loading={loading} color="white" style={{ paddingLeft: 70, paddingRight: 70, backgroundColor: "blue" }} size={20} name="login">Log In</Button>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={{ marginTop: 30, marginBottom: 35 }}>
          <Text style={{ color: "blue", fontSize: 15 }}>Signup?</Text>
        </TouchableOpacity>


        <Text style={{ fontSize: 10 }}>Copyright ©️ 2022, Touchh Inc. by Tolulope Mumuney.</Text>


      </ScrollView>


    </ImageBackground>
  )




}



export default LoginScreen
import React, { useState, useEffect, useRef, useContext } from "react"
import { View, ImageBackground, Text, Image, Animated, TouchableOpacity, ScrollView } from "react-native"
import styles from "../../styles/styles"
import bg from "../../../assets/loginBg.png"
import threeD from "../../../assets/3d.png"
import { TextInput, Button } from "react-native-paper"
import { Checkbox } from "react-native-paper"
import AuthContext from "../../contexts/login-signup-context"


function SignupScreen({ navigation }) {

  const startOpaValue = useRef(new Animated.Value(-30)).current

  const [checkedMale, setCheckedMale] = useState(false);
  const [checkedFemale, setCheckedFemale] = useState(false);
  const [checkedOther, setCheckedOther] = useState(false);

  const [loading, setIsLoading] = useState(false);

  const [fullnameImput, setFullNameInput] = useState("")
  const [usernameImput, setUserNameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [emailInput, setEmailInput] = useState("")

  const { renderPopUp, backendServer } = useContext(AuthContext)


  useEffect(() => {
    Animated.timing(startOpaValue, {
      duration: 3000,
      toValue: 30,
      useNativeDriver: false,
      isInteraction: true
    }).start()

  }, [startOpaValue])


  async function signup() {
    if (!fullnameImput || !usernameImput || !passwordInput || !emailInput) return renderPopUp("Incomplete details found in form. Please verify...")

    if (fullnameImput.length > 40 || usernameImput.length > 40 || passwordInput.length > 40) return renderPopUp("One of your fields appear to be too long...")

    let gender

    if (checkedFemale) gender = "female"
    if (checkedMale) gender = "male"
    if (checkedOther) gender = "undisclosed"
    if (!checkedFemale && !checkedMale && !checkedOther) gender = "undisclosed"

    const obj = {
      name: fullnameImput,
      gender: gender,
      username: usernameImput,
      email: emailInput,
      password: passwordInput
    }


    try {
      setIsLoading(true)

      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(obj)
      })

      renderPopUp("Thank you for signing up, you can now log in!")

      setTimeout(() => {
        navigation.navigate("Login")
      }, 1500)

      setIsLoading(false)
    }

    catch {
      renderPopUp("A server error occured. It's not you!")
      setIsLoading(false)
    }


  }





  return (

    <ImageBackground resizeMode="cover" imageStyle={{ opacity: 1 }} source={bg} style={styles.signupCont}>

      <View style={{ flexDirection: "row", justifyContent: "center", height: 100, marginBottom: 20 }}>
        <Animated.Image style={{ width: 100, height: 100, position: "absolute", marginTop: startOpaValue }} source={threeD} resizeMode="cover" />
      </View>




      <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%" }}>

        <Text style={{ fontSize: 30, marginBottom: 15 }}>Sign Up</Text>

        <TextInput onChangeText={(text) => setFullNameInput(text)} mode="flat" label="full name" placeholder="name" style={[styles.loginInput, { marginBottom: 15 }]}></TextInput>

        <TextInput onChangeText={(text) => setUserNameInput(text)} mode="flat" label="username" placeholder="@username" style={[styles.loginInput, { marginBottom: 15 }]}></TextInput>

        <TextInput onChangeText={(text) => setPasswordInput(text)} mode="flat" label="password" placeholder="******" style={[styles.loginInput, { marginBottom: 15 }]}></TextInput>

        <TextInput onChangeText={(text) => setEmailInput(text)} mode="flat" label="email address" placeholder="you@example.com" style={[styles.loginInput, { marginBottom: 15 }]}></TextInput>

        <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>

          <Text>Male</Text>
          <Checkbox
            color="blue"
            status={checkedMale ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedMale(true);
              setCheckedFemale(false);
              setCheckedOther(false);
            }}
          />

          <Text>Female</Text>

          <Checkbox
            color="blue"
            status={checkedFemale ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedFemale(true);
              setCheckedOther(false);
              setCheckedMale(false);
            }}
          />

          <Text>
            Other
          </Text>

          <Checkbox
            color="blue"
            status={checkedOther ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedOther(true);
              setCheckedMale(false);
              setCheckedFemale(false);
            }}
          />

        </View>

        <TouchableOpacity activeOpacity={0.6} onPress={() => { }} >
          <Button onPress={signup} loading={loading} color="white" style={{ paddingLeft: 70, paddingRight: 70, backgroundColor: "blue" }} size={20} name="login">Sign Up</Button>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 30, marginBottom: 35 }}>
          <Text style={{ color: "blue", fontSize: 15 }}>Log In?</Text>
        </TouchableOpacity>


        <Text style={{ fontSize: 10 }}>Copyright ©️ 2022, Touchh Inc. by Tolulope Mumuney.</Text>


      </ScrollView>


    </ImageBackground>

  )
}



export default SignupScreen
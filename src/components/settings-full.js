import React, { useState, useEffect, useContext, useRef } from "react"
import { Text, View, TouchableOpacity, Alert } from "react-native"
import styles from "../styles/styles"
import Icon from "react-native-vector-icons/AntDesign"
import AppContext from "../contexts/app-context"
import { Switch } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"
import DeleteDialogue from "./delete-account-dialogue"



const Settings = function ({ display }) {

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [darkModeOn, setDarkModeOn] = useState(false)

  const [dyColorOnOff, setDyColorOnOff] = useState("")

  const [deletModalFunc, setDeleteModalFunct] = useState(null)

  const { setIsLoading, updateUsersData, setTheme, setDyColor, bottomNavFunctions, topNavFunctions, sideNavFunct, backendServer, token, usersData } = useContext(AppContext)

  const deleteModal = useRef(null)



  useEffect(() => {

    (async function () {
      const theme = await AsyncStorage.getItem("touchh-theme")

      if (theme === "white") setDarkModeOn(false)
      else setDarkModeOn(true)

      const dy = await AsyncStorage.getItem("touchh-dyColor")

      if (dy === "On") setDyColorOnOff("On")
      else setDyColorOnOff("Off")

      setDeleteModalFunct(deleteModal.current)

    })()

  }, [display])



  const onDarkModeToggleSwitch = async () => {

    if (darkModeOn) {
      await AsyncStorage.setItem("touchh-theme", "white")
      setTheme("white")
    }

    else {
      await AsyncStorage.setItem("touchh-theme", "grey")
      setTheme("grey")
    }

    setDarkModeOn(!darkModeOn);
  }


  const onDyColorModeToggleSwitch = async () => {

    if (dyColorOnOff === "On") {
      await AsyncStorage.setItem("touchh-dyColor", "Off")
      setDyColor("Off")
      setDyColorOnOff("Off");
      bottomNavFunctions?.setBottomColorBackToDefault()
      topNavFunctions?.setTopNavColorBackToDefalt()
      sideNavFunct?.setSideNavColorBackToDefault()
    }

    else {
      await AsyncStorage.setItem("touchh-dyColor", "On")
      setDyColor("On")
      setDyColorOnOff("On");
    }


  }


  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)



  async function deActivateAccount() {
    try {
      if (setIsLoading) setIsLoading(true)

      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/delete/${usersData._id}`,
        { method: "DELETE" })

      sideNavFunct.logoutFromSideNav()
    }
    catch (err) {
      Alert.alert("Server Error", "An error occured. It's not you, it's us.")

      if (setIsLoading) setIsLoading(false)
    }

  }







  if (!display) return




  return (
    <View>
      <View style={styles.paramsSettingsListEach}>
        <Text style={{ fontSize: 15, opacity: 0.6, paddingTop: 13 }}>Dark Mode <Text>({darkModeOn ? "On" : "Off"})</Text></Text>
        <Switch color="rgb(223, 130, 130)" value={darkModeOn} onValueChange={onDarkModeToggleSwitch} />
      </View>

      <View style={styles.paramsSettingsListEach}>
        <Text style={{ fontSize: 15, opacity: 0.6, paddingTop: 13 }}>Notifications <Text>(On)</Text></Text>
        <Switch color="rgb(223, 130, 130)" value={true} onValueChange={onToggleSwitch} />
      </View>

      <View style={styles.paramsSettingsListEach}>
        <Text style={{ fontSize: 15, opacity: 0.6, paddingTop: 13 }}>Vibrations <Text>(On)</Text></Text>
        <Switch color="rgb(223, 130, 130)" value={true} onValueChange={onToggleSwitch} />
      </View>


      <View style={styles.paramsSettingsListEach}>
        <Text style={{ fontSize: 15, opacity: 0.6, paddingTop: 13 }}>Dynamic Colors <Text>({dyColorOnOff})</Text></Text>
        <Switch color="rgb(223, 130, 130)" value={dyColorOnOff === "On" ? true : false} onValueChange={onDyColorModeToggleSwitch} />
      </View>

      <Icon.Button onPress={() => Alert.alert("Contact Developer", "Tolulope Mumuney: totxprex@gmail.com")} backgroundColor="blue" name="infocirlceo" size={25}>Help</Icon.Button>

      <Text></Text>

      <Icon.Button onPress={deletModalFunc?.showModal} name="delete" size={25} backgroundColor="red">Delete Account</Icon.Button>

      <DeleteDialogue deleteAccountFunction={deActivateAccount} ref={(ref) => deleteModal.current = ref} />
    </View>
  );

}


export default Settings
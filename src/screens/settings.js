import React, { useState, useEffect, useContext } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import styles from "../styles/styles"
import Profile from "../components/profile-full"
import Settings from "../components/settings-full"



function SettingsScreen({ display }) {

  const [onView, setOnView] = useState("profile")



  const renderProfile = function () {
    setOnView('profile')
  }

  const renderSettings = function () {
    setOnView('settings')
  }







  if (!display) return






  return (
    <View style={styles.settingCont}>
      <View style={styles.settingsNav}>

        <TouchableOpacity onPress={renderProfile} style={onView === "profile" ? styles.inSettingsNavActive : styles.inSettingsNav}>
          <Text style={{ fontSize: 20, opacity: 0.7 }}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={renderSettings} style={onView === "settings" ? styles.inSettingsNavActive : styles.inSettingsNav}>
          <Text style={{ fontSize: 20, opacity: 0.7 }}>Settings</Text>
        </TouchableOpacity>
      </View>

      <Profile display={onView === "profile" ? true : false} />

      <Settings display={onView === "settings" ? true : false} />

    </View>
  )
}



export default SettingsScreen
import React, { useEffect, useState, forwardRef, useImperativeHandle, useContext } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import styles from "../styles/styles"
import Icon from "react-native-vector-icons/AntDesign"
import { messagesColor, settingsColor, newsColor, contactsColor } from "../styles/colors"
import AppContext from "../contexts/app-context"



const BottomNav = forwardRef(function ({ engineNavigations, topBarNav, sideBarNav }, ref) {

  const [onShow, setOnShow] = useState("chat")
  const [navContColor, setNavContColor] = useState(messagesColor)
  const [screenNavFunctions, setScreenNavFunctions] = useState({})
  const [topNavFunctions, setTopNavFunctions] = useState(null)
  const [sideBarNavFunctions, setSideBarNavFunctions] = useState(null)
  const [display, setDisplay] = useState(true)

  const { dyColor } = useContext(AppContext)


  useEffect(() => {
    setScreenNavFunctions(engineNavigations.current)
    setTopNavFunctions(topBarNav.current)
    setSideBarNavFunctions(sideBarNav.current)
  }, [])

  useImperativeHandle(ref, function () {
    return {
      hideBottomNav() {
        setDisplay(false)
      },
      showBottomNav() {
        setDisplay(true)
      },
      setBottomColorBackToDefault() {
        setNavContColor(messagesColor)
      },
      thirdPartyMoveToChatPage() {
        setOnShow("chat")
        if (dyColor === "On") setNavContColor(messagesColor)
        engineNavigations.current.showChat()
        topBarNav.current.setOnViewScreen("home")
        sideBarNav.current.setsideNavScreenn("chat")
      }
    }
  })

  if (!display) return


  return (
    <View style={[styles.navCont, { backgroundColor: navContColor }]}>

      <TouchableOpacity onPress={() => {
        setOnShow("chat")
        if (dyColor === "On") setNavContColor(messagesColor)
        screenNavFunctions.showChat()
        topNavFunctions.setOnViewScreen("home")
        sideBarNavFunctions.setsideNavScreenn("chat")
      }} style={styles.navCard}>

        <Icon color={onShow === "chat" ? "#274B9F" : "black"} name="message1" size={20} />

        <Text style={{ color: `${onShow === "chat" ? "#274B9F" : "black"}` }}>Home</Text>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setOnShow("contact")
        if (dyColor === "On") setNavContColor(contactsColor)
        screenNavFunctions.showContact()
        topNavFunctions.setOnViewScreen("contact")
        sideBarNavFunctions.setsideNavScreenn("contact")
      }} style={styles.navCard}>

        <Icon color={onShow === "contact" ? "#274B9F" : "black"} name="contacts" size={20} />

        <Text style={{ color: `${onShow === "contact" ? "#274B9F" : "black"}` }}>Contacts</Text>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setOnShow("news")
        if (dyColor === "On") setNavContColor(newsColor)
        screenNavFunctions.showNews()
        topNavFunctions.setOnViewScreen("news")
        sideBarNavFunctions.setsideNavScreenn("news")
      }} style={styles.navCard}>

        <Icon color={onShow === "news" ? "#274B9F" : "black"} name="antdesign" size={20} />

        <Text style={{ color: `${onShow === "news" ? "#274B9F" : "black"}` }}>News</Text>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setOnShow("settings")
        if (dyColor === "On") setNavContColor(settingsColor)
        screenNavFunctions.showSettings()
        topNavFunctions.setOnViewScreen("settings")
        sideBarNavFunctions.setsideNavScreenn("settings")
      }} style={styles.navCard}>

        <Icon color={onShow === "settings" ? "#274B9F" : "black"} name="setting" size={20} />

        <Text style={{ color: `${onShow === "settings" ? "#274B9F" : "black"}` }}>Settings</Text>

      </TouchableOpacity>

    </View>
  )
})


export default BottomNav
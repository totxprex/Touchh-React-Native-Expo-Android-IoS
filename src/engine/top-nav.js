import React, { useState, useEffect, forwardRef, useImperativeHandle, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native"
import styles from "../styles/styles"
import Icon from "react-native-vector-icons/Entypo";
import Loading from "../components/loading";
import {
  messagesColor, contactsColor, settingsColor, newsColor, profileColor, notfifcationsColor, searchColor, helpColor
} from "../styles/colors"
import AppContext from "../contexts/app-context";

const TopNav = forwardRef(function ({ sideBarNav }, ref) {

  const [topNavOnviewScreen, settopNavOnviewScreen] = useState("home")
  const [color, setColor] = useState(null)
  const [loading, setLoading] = useState(false)

  const { dyColor } = useContext(AppContext)



  useImperativeHandle(ref, function () {
    return {
      setOnViewScreen(screen) {
        settopNavOnviewScreen(screen)
      },
      setIsLoadingTopNav(boolean) {
        setLoading(boolean)
      },
      setTopNavColorBackToDefalt(){
        setColor(messagesColor)
      }
    }
  })

  useEffect(() => {
    if (dyColor === "Off") return setColor(messagesColor)

    if (topNavOnviewScreen === "home") {
      setColor(messagesColor)
    }

    if (topNavOnviewScreen === "settings") {
      setColor(settingsColor)
    }

    if (topNavOnviewScreen === "news") {
      setColor(newsColor)
    }

    if (topNavOnviewScreen === "contact") {
      setColor(contactsColor)
    }

    if (topNavOnviewScreen === "profile") {
      setColor(profileColor)
    }

    if (topNavOnviewScreen === "help") {
      setColor(helpColor)
    }

    if (topNavOnviewScreen === "notifications") {
      setColor(notfifcationsColor)
    }

    if (topNavOnviewScreen === "search") {
      setColor(searchColor)
    }

  }, [topNavOnviewScreen])



  return (
    <View style={[styles.topNavCont, { backgroundColor: color }]}>
      <TouchableOpacity onPress={() => {
        sideBarNav.current.toggleSideNav()
      }}>
        <Icon name="menu" size={25} style={{ opacity: 0.6 }} />
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Loading isLoading={loading} />
        <Text style={{ elevation: 2 }}>{topNavOnviewScreen.toUpperCase()}{`${topNavOnviewScreen === "contact" ? "S" : ""}`}</Text>
      </View>
    </View>
  )
}
)

export default TopNav
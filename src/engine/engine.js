import React, { useState, forwardRef, useImperativeHandle, useEffect, useContext } from "react"
import { Text, View } from "react-native"
import SettingsScreen from "../screens/settings"
import ContactScreen from "../screens/contact"
import styles from "../styles/styles"
import HomeChatStack from "./stack-navs/home-chat-full"
import NewsFavStackScreen from "./stack-navs/news-fav-stack"
import SearchScreen from "../screens/search"
import NotificationsScreen from "../screens/notifications"

const Engine = forwardRef(function ({ }, ref) {

  const [onShow, setOnShow] = useState("")


  useEffect(() => {
    setOnShow("chat")
  }, [])


  useImperativeHandle(ref, function () {
    return {
      showContact() {
        setOnShow("contact")
      },
      showChat() {
        setOnShow("chat")
      },

      showSettings() {
        setOnShow("settings")
      },

      showNews() {
        setOnShow("news")
      },
      showSearch() {
        setOnShow("search")
      },
      showNotifications() {
        setOnShow("notifications")
      },
    }
  })


  return (
    <View style={styles.engineCont}>
      <SettingsScreen display={onShow === "settings" ? true : false} />
      <HomeChatStack display={onShow === "chat" ? true : false} />
      <ContactScreen display={onShow === "contact" ? true : false} />
      <NewsFavStackScreen display={onShow === "news" ? true : false} />
      <SearchScreen display={onShow === "search" ? true : false} />
      <NotificationsScreen display={onShow === "notifications" ? true : false} />
    </View>
  )
}
)



export default Engine
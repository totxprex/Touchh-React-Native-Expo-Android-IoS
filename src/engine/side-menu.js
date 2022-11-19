import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect, useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, Alert } from "react-native"
import styles from '../styles/styles';
import placeholer from "../../assets/user.png"
import Icon from "react-native-vector-icons/AntDesign"
import {
  messagesColor, contactsColor, settingsColor, newsColor, profileColor, notfifcationsColor, searchColor, helpColor
} from "../styles/colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../contexts/app-context';







const SideMenu = forwardRef(({ engineNavigations, topBarNav }, ref) => {

  const [active, setActive] = useState(false);
  const [currAnimatedValue, setCurrentAnimatedValue] = useState(-260)
  const [opacity, setOpactity] = useState(0)

  const [color, setColor] = useState(null)
  const [sideNavOnViewScreen, setsideNavOnViewScreen] = useState("chat")

  const animatedStartValue = useRef(new Animated.Value(currAnimatedValue)).current

  const [userImage, setUserImage] = useState(placeholer)

  const { setLoggedIn, renderPopUp, setUsersData, setIsLoading, usersData, getAWSUrl, dyColor } = useContext(AppContext)


  useEffect(() => {
    (async function () {
      try {
        if (usersData.photo === "No User Image") {
          setUserImage(placeholer)
        }
        else {
          const imageUrl = await getAWSUrl(usersData.photo)
          setUserImage({ uri: imageUrl.data })

        }
      }
      catch (err) {
        console.log(err)
      }

    })()
  }, [])




  useEffect(() => {

    if (active) {
      Animated.timing(animatedStartValue, {
        duration: 500,
        useNativeDriver: false,
        toValue: 0
      }).start()

      setCurrentAnimatedValue(0)
      setOpactity(1)
    }

    else {
      Animated.timing(animatedStartValue, {
        duration: 500,
        useNativeDriver: false,
        toValue: -260
      }).start()

      setCurrentAnimatedValue(-220)
      setTimeout(() => {
        setOpactity(0)
      }, 500)
    }


  }, [animatedStartValue, active])


  useImperativeHandle(ref, () => {
    return {
      toggleSideNav() {
        setActive(!active)
      },
      setsideNavScreenn(screen) {
        setsideNavOnViewScreen(screen)
      },
      setSideNavColorBackToDefault() {
        setColor(messagesColor)
      },
      logoutFromSideNav() {
        logOut()
      }
    }
  })


  useEffect(() => {
    if (dyColor === "Off") return setColor(messagesColor)

    if (sideNavOnViewScreen === "chat") {
      setColor(messagesColor)
    }

    if (sideNavOnViewScreen === "settings") {
      setColor(settingsColor)
    }

    if (sideNavOnViewScreen === "news") {
      setColor(newsColor)
    }

    if (sideNavOnViewScreen === "contact") {
      setColor(contactsColor)
    }

    if (sideNavOnViewScreen === "profile") {
      setColor(profileColor)
    }

    if (sideNavOnViewScreen === "help") {
      setColor(helpColor)
    }

    if (sideNavOnViewScreen === "notifications") {
      setColor(notfifcationsColor)
    }

    if (sideNavOnViewScreen === "search") {
      setColor(searchColor)
    }

  }, [sideNavOnViewScreen])




  async function logOut() {
    try {
      if (setIsLoading) setIsLoading(true)
      await AsyncStorage.removeItem("touchh-token")
      await AsyncStorage.removeItem("touchh-username")

      setLoggedIn(false)
      if (setIsLoading) setIsLoading(false)
    }
    catch (err) {
      console.log(err)
      renderPopUp("Error logging you out, sorry...")
      if (setIsLoading) setIsLoading(false)
    }
  }


  return (
    <Animated.View style={[styles.sideMenuNavCont, { left: animatedStartValue, backgroundColor: color, opacity: opacity }]}>

      <View style={styles.sideNavIntro}>
        <Image style={styles.sideMenuImage} resizeMode="cover" source={userImage} />

        <Text style={styles.normalText}>{usersData.name}</Text>

        <Text style={[styles.normalText, { fontSize: 15, color: "#373B44" }]}>@{usersData.username}</Text>
      </View>



      <View style={styles.sideNavBtnCont}>


        <TouchableOpacity onPress={() => {
          engineNavigations.showSearch()
          topBarNav.setOnViewScreen("search")
          setsideNavOnViewScreen("search")
          setActive(false)
        }} activeOpacity={1} style={styles.eachSideBtn}>

          <Icon.Button onPress={() => {
            engineNavigations.showSearch()
            topBarNav.setOnViewScreen("search")
            setsideNavOnViewScreen("search")
            setActive(false)
          }} style={{ backgroundColor: "#2c3e50" }} name="search1">Search</Icon.Button>

          <Icon style={{ marginTop: 0.2 }} color="#bdc3c7" name="infocirlceo" />

        </TouchableOpacity>




        <TouchableOpacity onPress={() => {
          engineNavigations.showNotifications()
          topBarNav.setOnViewScreen("notifications")
          setsideNavOnViewScreen("notifications")
          setActive(false)
        }} activeOpacity={1} style={styles.eachSideBtn}>

          <Icon.Button onPress={() => {
            engineNavigations.showNotifications()
            topBarNav.setOnViewScreen("notifications")
            setsideNavOnViewScreen("notifications")
            setActive(false)
          }} style={{ backgroundColor: "#2c3e50" }} name="notification">Notifications</Icon.Button>

          <Icon style={{ marginTop: 0.2 }} color="#bdc3c7" name="infocirlceo" />

        </TouchableOpacity>





        <TouchableOpacity onPress={() => {
          Alert.alert("Contact Developer", "Tolulope Mumuney: totxprex@gmail.com")
          setActive(false)
        }} activeOpacity={1} style={styles.eachSideBtn}>
          <Icon.Button onPress={() => {
            Alert.alert("Contact Developer", "Tolulope Mumuney: totxprex@gmail.com")
            setActive(false)
          }} style={{ backgroundColor: "#2c3e50" }} name="question">Help</Icon.Button>

          <Icon style={{ marginTop: 0.2 }} color="#bdc3c7" name="infocirlceo" />

        </TouchableOpacity>




        <TouchableOpacity onPress={logOut} activeOpacity={1} style={styles.eachSideBtn}>
          <Icon.Button onPress={logOut} style={{ backgroundColor: "#2c3e50" }} name="logout">Log out</Icon.Button>

          <Icon style={{ marginTop: 0.2 }} color="#bdc3c7" name="infocirlceo" />

        </TouchableOpacity>

      </View>


      <View style={{ marginTop: 50 }}>
        <Text style={{ color: "#2c3e50", fontSize: 10 }}>Copyright ©️ 2022, Touchh Inc.</Text>
      </View>

    </Animated.View>
  )
}
)


export default SideMenu;
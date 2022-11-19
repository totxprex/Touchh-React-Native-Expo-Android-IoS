import React, { useRef, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import styles from './src/styles/styles';
import Engine from './src/engine/engine';
import BottomNav from './src/engine/bottom-nav';
import TopNav from './src/engine/top-nav';
import SideMenu from './src/engine/side-menu';
import AppContext from './src/contexts/app-context';
import { mainAppPaddingInitial } from "./src/styles/custom-styles";
import LoginSignupStack from "./src/engine/stack-navs/login-signup-stack"
import Popupp from './src/components/popup';
import { Provider as PaperProvider } from "react-native-paper"
import { initiateSocket } from './socket';

const thirdPatyRenderChatFromHomeScreenObj = {}

let onViewInChat = { user: "" }

const messageCompsOnviewObj = { messagesCompOnView: [] }







export default function App() {
  const engineNavigations = useRef(null)
  const sideBarNav = useRef(null)
  const topBarNav = useRef(null)
  const bottomNav = useRef(null)
  const [bottomNavFunctions, setBottomNavFunctions] = useState({})
  const [topNavFunctions, setTopNavFunctions] = useState({})
  const [mainAppPaddingTop, setMainAppPaddingTop] = useState(mainAppPaddingInitial)
  const [loggedIn, setLoggedIn] = useState(false)
  const backendServer = "https://touch-mobile-chat-heroku-node.herokuapp.com"

  const [popupText, setPopUpText] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [usersData, setUsersData] = useState({})
  const [token, setToken] = useState("")

  const [theme, setTheme] = useState("")
  const [dyColor, setDyColor] = useState("")

  const [socket, setSocket] = useState(null)

  const [appendMessageFun, setAppendMessageFunc] = useState(null)


  function renderPopUp(text) {
    setPopUpText(text)
    setShowPopup(true)

    setTimeout(() => {
      setPopUpText("")
      setShowPopup(false)
    }, 2500)
  }


  async function getAWSUrl(filename) {
    const url = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/aws/url/${filename}`)).json()
    return url
  }


  async function updateUsersData() {
    try {
      const userInfo = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get/${usersData.username}`)).json()

      if (!userInfo.data) return

      setUsersData(userInfo.data)
    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    setBottomNavFunctions(bottomNav.current)
    setTopNavFunctions(topBarNav?.current)

  }, [loggedIn])









  if (!loggedIn) return (
    <SafeAreaView style={styles.container}>

      <Popupp display={showPopup} text={popupText} />

      <LoginSignupStack updateUsersData={updateUsersData} setSocket={setSocket} setDyColor={setDyColor} setTheme={setTheme} setToken={setToken} loggedIn={loggedIn} setUsersData={setUsersData} renderPopUp={renderPopUp} backendServer={backendServer} setLoggedIn={setLoggedIn} />

    </SafeAreaView>
  )

  return (
    <PaperProvider>

      <AppContext.Provider value={{ bottomNavFunctions, setMainAppPaddingTop, setIsLoading: topNavFunctions?.setIsLoadingTopNav, backendServer, renderPopUp, setLoggedIn, usersData, setUsersData, token, getAWSUrl, updateUsersData, theme, setTheme, dyColor, setDyColor, topNavFunctions, sideNavFunct: sideBarNav.current, thirdPatyRenderChatFromHomeScreenObj, socket, onViewInChat, setAppendMessageFunc, appendMessageFun, messageCompsOnviewObj }}>

        <SafeAreaView style={[styles.container, { backgroundColor: theme }]}>

          <Popupp display={showPopup} text={popupText} />

          <SideMenu topBarNav={topBarNav.current} engineNavigations={engineNavigations.current} ref={(ref) => sideBarNav.current = ref} />

          <TopNav ref={(ref) => topBarNav.current = ref} sideBarNav={sideBarNav} />

          <View style={[styles.mainAppCont, { paddingTop: mainAppPaddingTop }]}>

            <Engine ref={(ref) => engineNavigations.current = ref} />

          </View>

          <BottomNav ref={(ref) => bottomNav.current = ref} topBarNav={topBarNav} engineNavigations={engineNavigations} sideBarNav={sideBarNav} />

          <StatusBar style="auto" />

        </SafeAreaView>


      </AppContext.Provider>

    </PaperProvider>

  );
}
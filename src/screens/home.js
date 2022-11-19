import React, { useState, useEffect, useContext, useLayoutEffect } from "react"
import { Text, View, Image, TouchableOpacity, FlatList, Pressable } from "react-native"
import styles from "../styles/styles"
import placeholer from "../../assets/user.png"
import Icon from "react-native-vector-icons/AntDesign"
import ChatHistoryCard from "../components/chat-history-card"
import AppContext from "../contexts/app-context"
import threeD from "../../assets/3d.png"
import callNotifications from "../logic/Notifications"


function HomeScreen({ navigation, route }) {

  const [userImage, setUserImage] = useState(placeholer)
  const [chatHistoryCompArr, setChatHistoryCompArr] = useState([])
  const [notificationsCount, setNotificationsCount] = useState(0)
  const [saveNewsCount, setSavedNewsCount] = useState(0)
  const [unReadCount, setUnreadCount] = useState(0)
  const { token, getAWSUrl, usersData, setIsLoading, renderPopUp, backendServer, theme, thirdPatyRenderChatFromHomeScreenObj, updateUsersData, socket, appendMessageFun, messageCompsOnviewObj, onViewInChat } = useContext(AppContext)
  const [refreshing, setResfreshing] = useState(false)

  useLayoutEffect(() => {
    (async function () {
      try {
        setIsLoading(true)
        if (usersData.photo === "No User Image") {
          setUserImage(placeholer)
          setIsLoading(false)
        }
        else {
          const imageUrl = await getAWSUrl(usersData.photo)
          setUserImage({ uri: imageUrl.data })
          setIsLoading(false)
        }
      }
      catch (err) {
        console.log(err)
      }

    })()
  }, [])

  useLayoutEffect(() => {
    const initArr = usersData.rooms.sort((a, b) => {
      if (a.messages[a.messages.length - 1].createdAt > b.messages[b.messages.length - 1].createdAt) return -1
      else return 1
    })

    const arr = initArr.map((e) => {
      return <ChatHistoryCard setResfreshing={setResfreshing} setIsLoading={setIsLoading} navigation={navigation} data={e} roomID={e._id} />
    })

    setChatHistoryCompArr(arr)

    const pendingRequestArr = usersData.addRequests.filter((e) => {
      return e.status === "pending"
    })

    setNotificationsCount(pendingRequestArr.length)
    setSavedNewsCount(usersData.savedNews.length)
    setUnreadCount(usersData.unReadRooms.length)

  }, [usersData])


  useEffect(() => {
    thirdPatyRenderChatFromHomeScreenObj.thirdPartyRenderChatPage = thirdPartyRenderChatPage

    thirdPatyRenderChatFromHomeScreenObj.thirdPartyRenderHomePage = thirdPartyRenderHomePage

  }, [])


  useEffect(() => {
    socket.on("newSmartNotification", (message, type) => {
      callNotifications(type, message)
      updateUsersData()
    })
  }, [])



  useEffect(() => {
    socket?.on("newMessage", (messageObj) => {
      if (onViewInChat.user === messageObj?.senderUsername) {
        appendMessageFun?.appendNewMessage(messageObj, messageCompsOnviewObj.messagesCompOnView)
        updateUsersData()
      }

      else {
        callNotifications("New Message", `You have a new message from ${messageObj.senderUsername}`)
        updateUsersData()
      }
    })
  }, [appendMessageFun])


  function thirdPartyRenderChatPage(params) {
    navigation.navigate("Chat", params)
  }

  function thirdPartyRenderHomePage() {
    navigation.navigate("Home")
  }





  async function refreshAllData() {
    try {
      setResfreshing(true)

      const userInfo = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get/${usersData.username}`)).json()

      if (!userInfo.data) throw new Error("Internal server error")

      const initArr = userInfo.data.rooms.sort((a, b) => {
        if (a.messages[a.messages.length - 1].createdAt > b.messages[b.messages.length - 1].createdAt) return 1
        else return -1
      })

      const arr = initArr.map((e) => {
        return <ChatHistoryCard setResfreshing={setResfreshing} setIsLoading={setIsLoading} navigation={navigation} data={e} roomID={e._id} />
      })

      setChatHistoryCompArr(arr)

      const pendingRequestArr = userInfo.data.addRequests.filter((e) => {
        return e.status === "pending"
      })

      setNotificationsCount(pendingRequestArr.length)
      setSavedNewsCount(userInfo.data.savedNews.length)
      setUnreadCount(userInfo.data.unReadRooms.length)
      updateUsersData()

      if (userInfo.data.photo === "No User Image") {
        setUserImage(placeholer)
        setResfreshing(false)
      }
      else {
        const imageUrl = await getAWSUrl(userInfo.data.photo)
        setUserImage({ uri: imageUrl.data })
        setResfreshing(false)
      }

    }
    catch (err) {
      console.log(err)
      renderPopUp(`${err || "Internal server error"}`)
      setResfreshing(false)
    }
  }

















  return (
    <View style={styles.homeCont}>

      <View style={styles.introHomeCont}>

        <View style={styles.introHomeContInner}>

          <View style={{ flexDirection: "row" }}>

            <Image style={styles.sideMenuImage} resizeMode="contain" source={userImage} />

            <View>
              <Text style={[styles.normalText, { fontSize: 17, paddingTop: 10, paddingLeft: 10 }]}>Welcome back, {`${usersData.name.split(" ")[0].slice(0, 15)}...`}</Text>

              <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 8 }}>


                <TouchableOpacity style={{ alignItems: 'center', marginRight: 20, marginLeft: 10 }}>

                  <View style={styles.statCardCircle}>
                    <Icon name="message1" color="#274B9F" size={15} />

                    <Text style={{ marginTop: -6, marginLeft: 15, color: "#274B9F" }}>{unReadCount}</Text>

                  </View>


                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>

                  <View style={styles.statCardCircle}>
                    <Icon name="notification" color="#274B9F" size={15} />

                    <Text style={{ marginTop: -6, marginLeft: 15, color: "#274B9F" }}>{notificationsCount}</Text>

                  </View>


                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>

                  <View style={styles.statCardCircle}>
                    <Icon name="antdesign" color="#274B9F" size={15} />

                    <Text style={{ marginTop: -6, marginLeft: 15, color: "#274B9F" }}>{saveNewsCount}</Text>

                  </View>


                </TouchableOpacity>

              </View>

            </View>

          </View>

          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 10, marginTop: -20 }}>
            <Icon onPress={refreshAllData} name="reload1" color="#274B9F" size={15} />
          </TouchableOpacity>

        </View>

      </View>

      <View style={[styles.chatHistoryCont, { backgroundColor: theme }]}>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Chat History</Text>

          <Pressable>
            <Text style={{ fontSize: 15, color: "blue" }}>
              {chatHistoryCompArr.length}
            </Text>
          </Pressable>
        </View>

        {chatHistoryCompArr.length === 0
          ?
          <View style={{ width: "100%", flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: "100%" }}>

            <Image style={{ width: 70, height: 70, marginTop: -20, marginBottom: 10 }} source={threeD} resizeMode="cover" />

            <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>Your chat history appears here...</Text>
          </View>
          :
          <FlatList contentContainerStyle={styles.chatHistoryFlatListCont} data={chatHistoryCompArr} renderItem={({ item }) => item} refreshing={refreshing} onRefresh={refreshAllData} />}

      </View>

    </View>
  )
}



export default HomeScreen
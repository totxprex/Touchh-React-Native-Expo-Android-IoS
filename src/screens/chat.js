import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react"
import { Text, View, Image, TouchableOpacity, FlatList, TextInput } from "react-native"
import styles from "../styles/styles"
import placeholer from "../../assets/user.png"
import Icon from "react-native-vector-icons/Feather"
import AppContext from "../contexts/app-context"
import { mainAppPaddingInitial } from "../styles/custom-styles"
import AMessage from "../components/a-message"
import OtherProfileModal from "../components/profile-modal"
import { getDocumentAsync } from "expo-document-picker"



function ChatScreen({ navigation, route }) {

  const { bottomNavFunctions, setMainAppPaddingTop, setIsLoading, getAWSUrl, renderPopUp, theme, backendServer, token, usersData, updateUsersData, socket, onViewInChat, setAppendMessageFunc, messageCompsOnviewObj } = useContext(AppContext)
  const [whereMessagesArePadding, setWhereMsgsArePaddingTop] = useState(-40)
  const [userOnline, setOnline] = useState(false)

  const [userImage, setUserImage] = useState(placeholer)

  const [messagesComp, setMessagesComp] = useState([])

  const [typedMessage, setTypedMessage] = useState("")

  const [dataToShowModal, setDataToShowModal] = useState(null)

  const [extraDataComp, setExtraDataComp] = useState([])

  const messagesList = useRef(null)
  const inputFieldRef = useRef(null)

  const modal = useRef(null)

  const {
    senderData,
    messages,
    roomID
  } = route.params


  useLayoutEffect(() => {
    onViewInChat.user = senderData.username
    setAppendMessageFunc({ appendNewMessage })

    return () => onViewInChat.user = ""
  }, [])

  if (!senderData) return


  function appendNewMessage(messageObj, currMessagesComp) {
    const mm = { ...messageObj }

    const newMessageComp = <AMessage data={mm} />

    setMessagesComp([...currMessagesComp, newMessageComp])

    messageCompsOnviewObj.messagesCompOnView.push(newMessageComp)

    setTimeout(() => {
      messagesList?.current?.scrollToEnd({ animated: true })
    }, 1000)

  }



  async function sendMessage() {
    if (!typedMessage) return
    let genereatedRoomID

    try {
      const messageObj = {
        date: JSON.stringify(new Date(Date.now())),
        messsage: typedMessage,
        image: "",
        senderName: usersData.name,
        senderUsername: usersData.username
      }

      const messageObjServer = {
        createdAt: new Date(Date.now()),
        messsage: typedMessage,
        image: "",
        senderName: usersData.name,
        senderUsername: usersData.username
      }


      if (!roomID) {
        if (setIsLoading) setIsLoading(true)
        genereatedRoomID = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/chat/create/${usersData._id}/${senderData._id}`)).json()
      }


      const newMessageComp = <AMessage data={messageObj} />

      setMessagesComp([...messagesComp, newMessageComp])

      messageCompsOnviewObj.messagesCompOnView.push(newMessageComp)

      inputFieldRef.current.clear()

      setTimeout(() => {
        messagesList?.current?.scrollToEnd({ animated: true })
      }, 500)

      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/chat/send/message/${roomID || genereatedRoomID.data}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(messageObjServer)
      })
      updateUsersData()
      if (setIsLoading) setIsLoading(false)


      socket.emit("sendMessageToSomeone", messageObjServer, senderData.username)
    }

    catch (err) {
      console.log(err)
      renderPopUp("Network error. Messages may not be delivered. ")
      if (setIsLoading) setIsLoading(false)
    }

  }




  async function sendAPic() {
    try {

      const file = await getDocumentAsync({ type: "image/jpeg" })

      if (file.type === "cancel") return

      const fileToSend = { type: file.mimeType, uri: file.uri, name: file.name }

      const form = new FormData()

      form.append("createdAt", JSON.stringify(new Date(Date.now())))
      form.append("messsage", "")
      form.append("image", fileToSend)
      form.append("senderName", usersData.name)
      form.append("senderUsername", usersData.username)

      let genereatedRoomID

      if (!roomID) {
        if (setIsLoading) setIsLoading(true)
        genereatedRoomID = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/chat/create/${usersData._id}/${senderData._id}`)).json()
      }



      const messageObj = {
        date: JSON.stringify(new Date(Date.now())),
        messsage: "",
        fileUploaded: { uri: file.uri },
        senderName: usersData.name,
        senderUsername: usersData.username
      }


      const newMessageComp = <AMessage data={messageObj} />

      setMessagesComp([...messagesComp, newMessageComp])

      messageCompsOnviewObj.messagesCompOnView.push(newMessageComp)

      inputFieldRef.current.clear()

      setTimeout(() => {
        messagesList?.current?.scrollToEnd({ animated: true })
      }, 500)

      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/chat/send/message/${roomID || genereatedRoomID}`, {
        method: "POST",
        headers: {
          "enctype": "multipart/form-data"
        },
        body: form
      })
      updateUsersData()
      if (setIsLoading) setIsLoading(false)

      socket.emit("sendMessageToSomeone", messageObj, senderData.username)
    }

    catch (err) {
      console.log(err)
      renderPopUp("Network error. Messages may not be delivered. ")
      if (setIsLoading) setIsLoading(false)
    }

  }


  useEffect(() => {
    checkOnLineStatus()

    const onlineInterval = setInterval(() => {
      checkOnLineStatus()
    }, 60000)

    async function checkOnLineStatus() {
      socket.emit("checkOnlineStatus", senderData.username)

      socket.on("yesOnline", () => setOnline(true))
      socket.on("noOnline", () => setOnline(false))
    }

    return () => clearInterval(onlineInterval)
  }, [])







  useEffect(() => {
    (async function () {
      if (roomID) {
        await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/chat/read/room/${roomID}/${usersData._id}`)
        updateUsersData()
      }
    })()
  }, [])





  useEffect(() => {
    bottomNavFunctions.hideBottomNav()
    setMainAppPaddingTop(10)
    setDataToShowModal({ ...senderData })

    return function () {
      bottomNavFunctions.showBottomNav()
      setMainAppPaddingTop(mainAppPaddingInitial)
    }
  }, [])





  useLayoutEffect(() => {
    const arr = messages.map((e) => {
      return <AMessage roomID={roomID} data={e} messageID={e._id} />
    })

    setMessagesComp(arr)

    messageCompsOnviewObj.messagesCompOnView = arr

  }, [messages])


  useLayoutEffect(() => {
    (async function () {
      setIsLoading(true)
      try {
        if (senderData.photo === "No User Image") {
          setUserImage(placeholer)
          setIsLoading(false)

        }
        else {
          const imageUrl = await getAWSUrl(senderData.photo)
          setUserImage({ uri: imageUrl.data })
          setIsLoading(false)

        }
      }
      catch (err) {
        console.log(err)
        setIsLoading(false)
        renderPopUp("Error: Failed to fetch user image")
      }
    })()
  }, [dataToShowModal])














  return (
    <View style={[styles.chatCont]}>

      <View style={styles.chatIntroParentCont}>

        <TouchableOpacity onPress={() => { modal?.current?.setModalVisibility(true) }} style={[styles.chatInnertContIntro]}>

          <View style={{ flex: 0.5, flexDirection: "row", alignItems: 'center' }}>
            <Image style={[styles.chatIntroContImage]} resizeMode="cover" source={userImage} />

            <View style={{ paddingLeft: 10 }}>

              <Text>
                {senderData.name}
              </Text>

              <Text style={{ color: "grey" }}>
                @{senderData.username}
              </Text>
            </View>
          </View>

          <View style={{ flex: 0.25, flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>

            <Icon style={{ opacity: userOnline ? 1 : 0.5 }} name="rss" color={userOnline ? "red" : "grey"} size={15} />


            <TouchableOpacity onPress={sendAPic}>
              <Icon color="#274B9F" name="file" size={15} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => messagesList.current.scrollToEnd({ animated: true })}>
              <Icon color="#274B9F" name="chevrons-down" size={20} />
            </TouchableOpacity>

          </View>

        </TouchableOpacity>

      </View>

      <View style={[styles.whereChatMessagesAre, { marginTop: whereMessagesArePadding, backgroundColor: theme }]}>

        <FlatList initialNumToRender={messagesComp.length} ref={(ref) => messagesList.current = ref} data={messagesComp} renderItem={({ item, index }) => {
          if (index === messagesComp.length - 1) messagesList?.current?.scrollToEnd({ animated: false })
          return item
        }} />

      </View>


      <View style={[styles.chatInputCont, { backgroundColor: theme }]}>

        <TextInput onSubmitEditing={sendMessage} ref={(ref) => inputFieldRef.current = ref} onChangeText={(text) => setTypedMessage(text)} onPressOut={() => messagesList.current.scrollToEnd({ animated: false })} onFocus={() => {
          setWhereMsgsArePaddingTop(-30)
        }} onBlur={() => {
          setWhereMsgsArePaddingTop(-40)
        }} style={styles.inpuTStyle} placeholder="Say hiii"></TextInput>

        <TouchableOpacity onPress={sendMessage} style={styles.sendBtnAndOther}>
          <Icon name="send" size={25} color="#274B9F" />
        </TouchableOpacity>
      </View>

      <OtherProfileModal data={dataToShowModal} ref={(ref) => modal.current = ref} />

    </View >

  )
}



export default ChatScreen
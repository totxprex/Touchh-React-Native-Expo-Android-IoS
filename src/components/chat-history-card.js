import React, { useState, useEffect, useContext, useLayoutEffect } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import styles from "../styles/styles"
import placeholer from "../../assets/user.png"
import Icon from "react-native-vector-icons/Feather"
import { readColor, unReadColor } from "../styles/colors"
import AppContext from "../contexts/app-context"

const ChatHistoryCard = function ({ data, navigation, roomID, setIsLoading, setResfreshing }) {

  if (!data) return

  const { token, getAWSUrl, usersData, backendServer, renderPopUp, theme, updateUsersData } = useContext(AppContext)

  const [dataOfSender, setDataofSender] = useState({})
  const [senderImage, setSenderImage] = useState(placeholer)
  const [read, setRead] = useState(null)
  const [date, setDate] = useState("")
  const [dataForChatPage, setDataForChatPage] = useState({})

  const [historyName, setHistoryName] = useState("**********")
  const [historyUsername, setHistoryUsername] = useState("**********")
  const [historyLastMesssage, setHistoryLastMessage] = useState("**********")




  const history = { ...data }




  async function sortData() {
    setIsLoading(true)
    try {
      let idofSender

      if (history.firstUser !== usersData._id) idofSender = history.firstUser

      if (history.secondUser !== usersData._id) idofSender = history.secondUser

      if (!idofSender) return

      const senderData = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get?id=${idofSender}`)).json()

      if (senderData.data.photo === "No User Image") {
        setSenderImage(placeholer)
      }
      else {
        const imageUrl = await getAWSUrl(senderData.data.photo)
        setSenderImage({ uri: imageUrl.data })
      }


      setDataofSender(senderData.data)

      setHistoryName(senderData.data.name)
      setHistoryUsername(senderData.data.username)
      setHistoryLastMessage(`${history.messages[history.messages.length - 1].messsage.slice(0, 20)}...`)


      const checkIfRead = usersData.unReadRooms.find((e) => {
        return String(e) === history._id
      })

      if (checkIfRead) setRead(false)
      else setRead(true)


      const dateString = history.messages[history.messages.length - 1].createdAt.split(":").splice(0, 2).join(":")

      setDate(dateString)

      const dataForChat = {
        senderData: { ...senderData.data },
        messages: [...history.messages],
        senderphoto: senderImage,
        roomID: history._id
      }

      setDataForChatPage(dataForChat)
      setIsLoading(false)
    }

    catch (err) {
      renderPopUp("Error: Failed to retrieve some data...")
      setIsLoading(false)
    }
  }








  useLayoutEffect(() => {
    sortData()
  }, [data])









  return (
    <TouchableOpacity onPress={async () => {
      setRead(true)
      navigation.navigate("Chat", dataForChatPage)
    }
    } style={[styles.eachChatHistoryCardCont, { backgroundColor: read ? readColor : unReadColor }]}>

      <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 0.5 }}>

        <Image style={styles.chatHistoryCardImage} resizeMode="cover" source={senderImage} />

        <View style={{ paddingLeft: 10, paddingTop: 5 }}>

          <Text>
            {historyName}
          </Text>

          <Text style={{ color: "grey" }}>
            @{historyUsername}
          </Text>

          <Text style={{ color: "grey" }}>
            {historyLastMesssage}
          </Text>
        </View>
      </View>

      <View View style={{ flexDirection: "column", alignItems: "flex-end", flex: 0.5, height: "100%", justifyContent: "space-between" }}>

        <Text style={{ color: "grey" }}>{date}</Text>

        <Icon name={read ? "" : "message-square"} size={20} color="#274B9F" />

      </View>

    </TouchableOpacity>
  )
}

export default ChatHistoryCard
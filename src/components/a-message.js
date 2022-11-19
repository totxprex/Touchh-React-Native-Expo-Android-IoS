import React, { useState, useEffect, useContext, useRef, memo } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import styles from "../styles/styles"
import AppContext from "../contexts/app-context"
import ShowFullImageModal from "./show-full-image-modal"
import DeleteMessageDialogue from "./delete-message"



const AMessage = function ({ data, roomID, messageID }) {

  const { usersData, setIsLoading, getAWSUrl, token, backendServer, renderPopUp, updateUsersData } = useContext(AppContext)

  const [msgImage, setMsgImage] = useState("")

  const [status, setStatus] = useState("")

  const fullImageModalRef = useRef(null)
  const deleteMessageModalRef = useRef(null)

  const [killComp, setKillComp] = useState(false)

  const message = { ...data }


  useEffect(() => {

    if (message.senderUsername !== usersData.username) {
      setStatus("recieved")
    }
    else { setStatus("sent") }

    (async function () {
      try {
        if (message.image !== "") {
          if (setIsLoading) setIsLoading(true)

          const imageUrl = await getAWSUrl(data.image)
          setMsgImage({ uri: imageUrl.data })

          if (setIsLoading) setIsLoading(false)
        }

        if (message.fileUploaded) setMsgImage(message.fileUploaded)
      }
      catch (err) {
        console.log(err)
        if (setIsLoading) setIsLoading(false)
      }
    })()
  }, [])





  function showFullImage() {
    if (!msgImage && !message.fileUploaded) return
    fullImageModalRef.current.setModalVisibility(true)
  }




  async function deleteMessage() {
    if (!roomID || !messageID) return
    if (status === "recieved") return

    if (setIsLoading) setIsLoading(true)

    await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/chat/delete/message/${roomID}/${messageID}`,
      { method: "DELETE" })

    await updateUsersData()

    setKillComp(true)

    renderPopUp("Message deleted")

    deleteMessageModalRef.current.hideModal()

    if (setIsLoading) setIsLoading(false)

  }





  return (
    <TouchableOpacity onLongPress={() => deleteMessageModalRef.current.showModal()} onPress={showFullImage} style={[status === "recieved" ? styles.eachMessageContRecieved : styles.eachMessageContSent, { display: `${killComp ? "none" : "flex"}` }]}>
      <Text>{data.messsage}</Text>

      {msgImage ? <Image style={{ width: "100%", height: 100, marginBottom: 10 }} source={msgImage} /> : ""}

      <Text style={{ color: "grey", fontSize: 10, paddingLeft: "45%" }}>{message.date ? message.date.split(":").splice(0, 2).join(":") : message.createdAt.split(":").splice(0, 2).join(":")
      }</Text>

      <ShowFullImageModal ref={(ref) => fullImageModalRef.current = ref} data={msgImage} />

      <DeleteMessageDialogue status={status} deleteMessage={deleteMessage} ref={(ref) => deleteMessageModalRef.current = ref} />

    </TouchableOpacity>
  )
}

export default memo(AMessage)
import React, { useState, useEffect, useRef, useContext } from "react"
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native"
import styles from "../styles/styles"
import placeholer from "../../assets/user.png"
import OtherProfileModal from "./profile-modal"
import AppContext from "../contexts/app-context"



const ContactCard = function ({ data }) {


  const [userImage, setUserImage] = useState(placeholer)

  const { getAWSUrl, theme } = useContext(AppContext)

  const contact = { ...data }

  const modal = useRef(null)



  useEffect(() => {
    (async function () {
      if (contact.photo === "No User Image") {
        setUserImage(placeholer)
      }
      else {
        const imageUrl = await getAWSUrl(contact.photo)
        setUserImage({ uri: imageUrl.data })
      }
    })()

  }, [modal, data])

  if (!data) return

  return (
    <TouchableOpacity onPress={() => modal.current.setModalVisibility(true)}>
      <ImageBackground imageStyle={styles.contactCardImage} style={styles.contactCardCont} source={userImage} resizeMode="cover">

        <Image style={styles.chatHistoryCardImage} resizeMode="cover" source={userImage} />

        <View>
          <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>{contact.name}</Text>

          <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>
            @{contact.username}
          </Text>
        </View>

      </ImageBackground>

      <OtherProfileModal data={contact} ref={(ref) => modal.current = ref} />

    </TouchableOpacity>
  )
}

export default ContactCard
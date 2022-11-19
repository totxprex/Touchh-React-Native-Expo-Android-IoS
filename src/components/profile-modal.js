import React, { useState, forwardRef, useImperativeHandle, useEffect, useContext } from "react";
import { Modal, Text, ImageBackground, View, Image } from "react-native";
import styles from "../styles/styles"
import placeholer from "../../assets/user.png"
import Icon from "react-native-vector-icons/FontAwesome5"
import AppContext from "../contexts/app-context";





const OtherProfileModal = forwardRef(({ data }, ref) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState("")
  const [userImage, setUserImage] = useState(null)
  const [inContact, setInContact] = useState(false)
  const [me, setMe] = useState(false)

  const { getAWSUrl, renderPopUp, theme, usersData, updateUsersData, backendServer, token, setIsLoading, bottomNavFunctions, thirdPatyRenderChatFromHomeScreenObj, socket } = useContext(AppContext)



  useImperativeHandle(ref, function () {
    return {
      setModalVisibility(boolean) {
        setModalVisible(boolean)
      }
    }
  })


  useEffect(() => {
    if (!data) return

    (async function () {
      try {

        if (data.gender === "male") setGender("male")
        if (data.gender === "female") setGender("female")

        if (data.photo === "No User Image") {
          setUserImage(placeholer)
        }
        else {
          const imageUrl = await getAWSUrl(data.photo)
          setUserImage({ uri: imageUrl.data })

        }
      }
      catch (err) {
        console.log(err)
        renderPopUp("Sorry, some data failed to load")
      }
    })()

  }, [modalVisible])



  useEffect(() => {
    if (!data) return

    if (usersData.contactList.find((e) => e.username === data.username)) setInContact(true)
    else setInContact(false)

    if (usersData.username === data.username) setMe(true)

    return () => {
      setInContact(false)
      setMe(false)
    }

  }, [modalVisible])




  async function sendAddRequest() {
    if (usersData.contactList.find((e) => e.username === data.username)) return

    try {
      if (setIsLoading) setIsLoading(true)


      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/contact/request/${data._id}/${usersData._id}`, {
        method: "PATCH"
      })


      renderPopUp(`Your request has been sent to @${data.username}`)

      socket.emit("sendSmartNotification", `@${usersData.username} is requesting to add You!`, data.username, "Contact Request")

      if (setIsLoading) setIsLoading(false)
    }
    catch (err) {
      console.log(err)
      renderPopUp("Error adding this user to your List")
      if (setIsLoading) setIsLoading(false)
    }
  }



  async function goToChat() {
    const onViewUser = { ...data }

    if (setIsLoading) setIsLoading(true)

    //find if you and the user have a room in common

    let idofSender

    const yes = usersData.rooms.find((e) => {
      if (e.firstUser === onViewUser._id) {
        idofSender = e.firstUser
        return true
      }

      else if (e.secondUser === onViewUser._id) {
        idofSender = e.secondUser
        return true
      }

      else return false
    })

    try {

      if (yes) {
        const senderData = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get?id=${idofSender}`)).json()

        const dataForChat = {
          senderData: { ...senderData.data },
          messages: [...yes.messages],
          roomID: yes._id
        }


        bottomNavFunctions.thirdPartyMoveToChatPage()

        thirdPatyRenderChatFromHomeScreenObj.thirdPartyRenderChatPage(dataForChat)

        if (setIsLoading) setIsLoading(false)
      }

      else {

        const senderData = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get/${onViewUser.username}`)).json()

        const dataForChat = {
          senderData: { ...senderData.data },
          messages: [],
        }

        bottomNavFunctions.thirdPartyMoveToChatPage()

        thirdPatyRenderChatFromHomeScreenObj.thirdPartyRenderChatPage(dataForChat)


        if (setIsLoading) setIsLoading(false)
      }
    }

    catch (err) {
      console.log(err)
      if (setIsLoading) setIsLoading(false)
      return renderPopUp("Error loading messages")
    }

  }


  async function deleteContact() {

    if (!usersData.contactList.find((e) => e.username === data.username)) return

    try {

      if (setIsLoading) setIsLoading(true)


      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/contact/remove/contact/${usersData._id}/${data._id}`, {
        method: "PATCH"
      })

      await updateUsersData()

      renderPopUp("User removed from your List")

      socket.emit("sendSmartNotification", `@${usersData.username} removed You!`, data.username, "Contact Removal")

      setModalVisible(false)

      bottomNavFunctions.thirdPartyMoveToChatPage()

      thirdPatyRenderChatFromHomeScreenObj.thirdPartyRenderHomePage()

      if (setIsLoading) setIsLoading(false)

    }
    catch (err) {
      console.log(err)
      renderPopUp("Error removing this user from your List")
      if (setIsLoading) setIsLoading(false)
    }
  }







  if (!data) return


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <ImageBackground imageStyle={{ width: "100%", opacity: 0.3 }} resizeMode="cover" source={userImage === placeholer ? "" : userImage} style={[styles.modalView, { backgroundColor: theme }]}>
            <Image source={userImage} style={styles.sideMenuImage} />

            <View style={[styles.insideProfileModalCont]}>

              <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 0.5 }}>


                <View style={{ paddingLeft: 10, paddingTop: 5 }}>

                  <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>
                    {data.name}
                  </Text>

                  <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>
                    @{data.username}
                  </Text>

                  <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>
                    {data.email}
                  </Text>

                  <Icon name={gender} size={20} color={`${theme === "white" ? "black" : "white"}`} />
                </View>
              </View>

              < View style={{ flexDirection: "column", alignItems: "flex-end", flex: 0.5, height: "100%", justifyContent: "space-between" }}>

                <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>{data.createdAt.split(":").splice(0, 2).join(":")}</Text>


                <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>

                  <Icon.Button onPress={goToChat} style={{ display: `${me ? "none" : "flex"}` }} name="paper-plane" size={10}>Chat</Icon.Button>

                  <Icon.Button onPress={sendAddRequest} style={{ display: `${!inContact && !me ? "flex" : "none"}` }} name="portrait" size={10}>Add</Icon.Button>

                  <Icon.Button onPress={deleteContact} backgroundColor="red" style={{ display: `${inContact && !me ? "flex" : "none"}` }} name="portrait" size={10}>Remove</Icon.Button>

                </View>


              </View>

            </View>


            <View style={[styles.bioProfileModal, { opacity: Number(`${data.about === "" ? 0 : 1}`) }]}>
              <Text style={{ color: "grey" }}>
                <Text style={{ fontWeight: "bold" }}>Bio: </Text>{data.about}
              </Text>
            </View>

            <Icon size={30} color={`${theme === "white" ? "black" : "white"}`} onPress={() => setModalVisible(!modalVisible)} name="window-close" />
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
})



export default OtherProfileModal;
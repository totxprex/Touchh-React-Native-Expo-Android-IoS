import React, { useState, forwardRef, useImperativeHandle, useContext } from "react";
import { Modal, Text, View } from "react-native";
import styles from "../styles/styles"
import Icon from "react-native-vector-icons/Entypo"
import AppContext from "../contexts/app-context";

const RequestModal = forwardRef(({ updateNotCont }, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataOfUser, setDataOfUser] = useState(null)


  const { usersData, renderPopUp, backendServer, setIsLoading, token, updateUsersData, theme, socket } = useContext(AppContext)


  useImperativeHandle(ref, function () {
    return {
      setRequestModalVisibility(boolean, data) {
        setModalVisible(boolean)
        setDataOfUser(data)
      }
    }
  })


  if (!dataOfUser) return


  async function acceptRequest() {
    if (!dataOfUser) return

    try {
      if (setIsLoading) setIsLoading(true)


      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/contact/add/${usersData._id}/${dataOfUser.fromID}`, {
        method: "PATCH"
      })

      updateUsersData()
      renderPopUp(`${dataOfUser.fromUsername} is now added to your contact list!`)
      setModalVisible(false)

      socket.emit("sendSmartNotification", `@${usersData.username} just accepted your request!`, dataOfUser.fromUsername, "New Contact")

      if (setIsLoading) setIsLoading(false)
      updateNotCont()

    }
    catch (err) {
      console.log(err)
      renderPopUp("Error adding this user to your List")
      if (setIsLoading) setIsLoading(false)
    }
  }


  async function rejectRequest() {
    if (!dataOfUser) return

    try {
      if (setIsLoading) setIsLoading(true)


      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/contact/delete/${usersData._id}/${dataOfUser._id}`, {
        method: "DELETE"
      })

      updateUsersData()
      renderPopUp(`${dataOfUser.fromUsername} will not be added to your contact list!`)
      setModalVisible(false)

      socket.emit("sendSmartNotification", `Ooops, @${usersData.username} rejected your request!`, dataOfUser.fromUsername, "Contact")

      if (setIsLoading) setIsLoading(false)
      updateNotCont()

    }
    catch (err) {
      console.log(err)
      renderPopUp("Error making this request. Try again in a few minutes.")
      if (setIsLoading) setIsLoading(false)
    }
  }






  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>

          <View style={[styles.modalViewRequest, { backgroundColor: theme }]}>

            <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>Reply @{dataOfUser.fromUsername} request</Text>

            <Icon.Button onPress={acceptRequest} name="check" size={10} color="black" backgroundColor="rgb(115, 228, 121)">Accept</Icon.Button>

            <Icon.Button onPress={rejectRequest} name="cross" size={10} color="black" backgroundColor="rgb(228, 115, 115)">Reject</Icon.Button>


            <Icon size={30} onPress={() => setModalVisible(!modalVisible)} name="circle-with-cross" color="rgb(228, 115, 115)" />

          </View>

        </View>
      </Modal>
    </View>
  );
})



export default RequestModal;
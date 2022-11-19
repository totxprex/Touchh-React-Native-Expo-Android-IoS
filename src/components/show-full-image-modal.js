import React, { useState, forwardRef, useImperativeHandle, useEffect, useContext } from "react";
import { Modal, Text, ImageBackground, View, Image } from "react-native";
import styles from "../styles/styles"
import im from "../../assets/news.jpg"
import Icon from "react-native-vector-icons/FontAwesome5"
import AppContext from "../contexts/app-context";





const ShowFullImageModal = forwardRef(({ data }, ref) => {

  const [modalVisible, setModalVisible] = useState(false);


  const { getAWSUrl, renderPopUp, theme, usersData } = useContext(AppContext)



  useImperativeHandle(ref, function () {
    return {
      setModalVisibility(boolean) {
        setModalVisible(boolean)
      }
    }
  })



  return (
    <View style={[styles.centeredView, { height: "100%" }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={[styles.centeredView, { height: "40%", padding: 0 }]}>

          <View style={[styles.modalView, { backgroundColor: theme, padding: 0, paddingTop: -10, paddingBottom: -10 }]}>

            <Image resizeMode="cover" source={data} style={{ width: "100%", height: "100%" }} />

            <Icon style={{ position: "absolute", top: "80%" }} size={30} color={`${theme === "white" ? "black" : "white"}`} onPress={() => setModalVisible(!modalVisible)} name="window-close" />
          </View>
        </View>
      </Modal>
    </View>
  );
})



export default ShowFullImageModal;
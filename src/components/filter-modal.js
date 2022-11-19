import React, { useState, forwardRef, useImperativeHandle, useContext } from "react";
import { Modal, Text, View } from "react-native";
import styles from "../styles/styles"
import Icon from "react-native-vector-icons/Fontisto"
import AppContext from "../contexts/app-context";
import { newsColor } from "../styles/colors";



const FilterModal = forwardRef(({ setQuery, seRefreshing }, ref) => {
  const [modalVisible, setModalVisible] = useState(false);


  const { theme, setIsLoading } = useContext(AppContext)


  useImperativeHandle(ref, function () {
    return {
      setRequestModalVisibility(boolean) {
        setModalVisible(boolean)
      }
    }
  })



  function loadFilter() {
    if (setIsLoading) setIsLoading(true)
    seRefreshing(true)
    setQuery(this)
    setModalVisible(false)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={[styles.centeredView, { height: "70%" }]}>

          <View style={[styles.modalViewRequest, { backgroundColor: theme, height: "100%", width: "70%" }]}>

            <Text style={{ color: `${theme === "white" ? "black" : "white"}`, fontSize: 20, fontWeight: "bold" }}>News Filters</Text>

            <Icon.Button onPress={loadFilter.bind("world")} name="world-o" size={10} color="black" backgroundColor={newsColor}>World News</Icon.Button>

            <Icon.Button onPress={loadFilter.bind("sport")} name="world-o" size={10} color="black" backgroundColor={newsColor}>Sport News</Icon.Button>

            <Icon.Button onPress={loadFilter.bind("entertainment")} name="world-o" size={10} color="black" backgroundColor={newsColor}>Entertainment News</Icon.Button>

            <Icon.Button onPress={loadFilter.bind("tech")} name="world-o" size={10} color="black" backgroundColor={newsColor}>Tech News</Icon.Button>

            <Icon.Button onPress={loadFilter.bind("food")} name="world-o" size={10} color="black" backgroundColor={newsColor}>Food</Icon.Button>

            <Icon.Button onPress={loadFilter.bind("beauty")} name="world-o" size={10} color="black" backgroundColor={newsColor}>Beauty</Icon.Button>

            <Icon size={30} onPress={() => setModalVisible(!modalVisible)} name="close" color="rgb(228, 115, 115)" />

          </View>

        </View>
      </Modal>
    </View>
  );
})



export default FilterModal;
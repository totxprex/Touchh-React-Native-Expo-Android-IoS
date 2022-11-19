import React, { useState, useEffect, useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "../styles/styles"
import Icon from "react-native-vector-icons/Entypo"
import AppContext from "../contexts/app-context"


const NotificationCard = function ({ data, status, requestModal, setRefreshing }) {

  const notification = data

  const { theme } = useContext(AppContext)

  function determineIcon() {
    let icon
    if (status === "rejected") {
      icon = "cross"
    }
    if (status === "accepted") {
      icon = "check"
    }
    if (status === "pending") {
      icon = "help"
    }
    return icon
  }



  function determineColor() {
    let color
    if (status === "rejected") {
      color = "rgb(228, 115, 115)"
    }
    if (status === "accepted") {
      color = "rgb(115, 228, 121)"
    }
    if (status === "pending") {
      color = "rgb(228, 115, 115)"
    }
    return color
  }





  const openToDoDialogue = function () {
    if (status === "accepted" || status === "rejected") return

    requestModal.setRequestModalVisibility(true, data)
  }







  return (
    <TouchableOpacity onLongPress={openToDoDialogue} style={[styles.eachNotCardCont, { borderLeftColor: `${determineColor()}`, backgroundColor: theme }]}>

      <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 0.9 }}>

        <View style={{ paddingLeft: 10, }}>

          <Text style={{ color: `${theme === "white" ? "grey" : "white"}` }}>
            {notification.fromName}
          </Text>

          <Text style={{ color: `${theme === "white" ? "grey" : "white"}`, paddingBottom: 10 }}>
            @{notification.fromUsername} sent you a connect request
          </Text>

        </View>
      </View>

      <View View style={{ flexDirection: "column", alignItems: "flex-end", flex: 0.5, height: "100%", justifyContent: "space-between" }}>

        <Icon name="bell" />

        <Icon.Button name={determineIcon()} size={10} color="black" backgroundColor={`${determineColor()}`}>{`${status}`}</Icon.Button>

      </View>

    </TouchableOpacity>
  )
}

export default NotificationCard
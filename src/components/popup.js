import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, StatusBar, Platform, Animated } from "react-native";


const Popupp = function ({ display, text }) {

  const startValue = useRef(new Animated.Value(0)).current


  useEffect(() => {
    Animated.timing(startValue, {
      duration: 2000,
      toValue: 1,
      useNativeDriver: false
    }).start()

  }, [display])




  if (!display) return

  return (
    <Animated.View style={[styles.popupCont, { opacity: startValue }]}>
      <Text>{text}</Text>
    </Animated.View>
  )
}


const styles = StyleSheet.create({
  popupCont: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    flexDirection: 'row',
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgb(150, 226, 142)",
    padding: 10,
    zIndex: 4000
  }
})


export default Popupp
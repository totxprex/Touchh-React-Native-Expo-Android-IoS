import React, { useState, useEffect, useContext } from "react"
import { Text, ScrollView, View, Image, StyleSheet, Linking } from "react-native"
import styles from "../styles/styles"
import AppContext from "../contexts/app-context"
import Icon from "react-native-vector-icons/Fontisto"
import { newsColor } from "../../src/styles/colors"


function NewsDetailsScreen({ navigation, route }) {

  const { theme, renderPopUp } = useContext(AppContext)

  const color = `${theme === "white" ? "black" : "white"}`

  const data = route.params



  function sortSummary(text) {

    const sortedtext = text

    const arr = sortedtext.split(".")


    let number = 4
    let index = 1

    const newArr = arr.map((e, i) => {

      if (index < number) {
        index = index + 1
        if (i === arr.length - 1) return e
        return e + "."
      }

      else {
        number = number + 4
        index = index + 1
        if (i === arr.length - 1) return e + "\n\n"
        return e + ".\n\n"
      }

    })



    return newArr.join(" ")
  }


  return (
    <ScrollView contentContainerStyle={{ width: "100%", padding: 15, backgroundColor: theme }}>

      <Image resizeMode="cover" source={{ uri: data.media }} style={[styles.newsImage, { elevation: 5 }]} />

      <Text style={{ fontSize: 20, textAlign: "center", color: color }}>{data.title}</Text>

      <View style={InternalStyles.intro}>

        <Icon.Button size={10} color="black" backgroundColor={newsColor} name="person">{data.author}</Icon.Button>

        <Icon.Button size={10} color="black" backgroundColor={newsColor} name="info">{`Copyright ${data.rights}`}</Icon.Button>

        <Icon.Button size={10} color="black" backgroundColor={newsColor} name="date">{`${data.published_date}`}</Icon.Button>

        <Icon.Button size={10} color="black" backgroundColor={newsColor} name="fa-american-sign-language-interpreting">{`${data.language}`}</Icon.Button>

      </View>


      <Text style={{ paddingTop: 15, fontSize: 15, textAlign: "justify", color: color }}>
        {sortSummary(data.summary)}
      </Text>

      <Text style={{ paddingTop: 0, fontSize: 12, color: color, textAlign: "center" }}>Note: This extract may not be complete. For the full article, visit the source.</Text>


      <View style={InternalStyles.intro2}>

        <Icon.Button onPress={() => navigation.goBack()} size={10} color="black" backgroundColor={newsColor} name="backward">Back To News</Icon.Button>

        <Icon.Button onPress={async () => {
          try {
            await Linking.openURL(data.link)
          }
          catch {
            renderPopUp("Error accessing the article's source website. Try again later.")
          }
        }} size={10} color="blue" backgroundColor={newsColor} name="info">Visit Source Website</Icon.Button>

      </View>

    </ScrollView>
  )

}


const InternalStyles = StyleSheet.create({
  intro: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    flexWrap: "wrap",
    width: "100%",
  },
  intro2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    flexWrap: "wrap",
    width: "100%",
  }

})


export default NewsDetailsScreen
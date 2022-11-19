import React, { useState, useEffect, useContext, useLayoutEffect } from "react"
import { View, Text, Image, TouchableOpacity, Linking } from "react-native"
import styles from "../styles/styles"
import Icon from "react-native-vector-icons/FontAwesome"
import AppContext from "../contexts/app-context"



const NewsCard = function ({ data, navigation, fav, deletee }) {

  const [likedColor, setLikedColor] = useState("black")

  const news = { ...data }

  const { theme, renderPopUp, setIsLoading, backendServer, token, usersData, updateUsersData } = useContext(AppContext)





  async function addANewsToFav() {
    if (!fav) return
    try {
      if (setIsLoading) setIsLoading(true)

      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/news/save/${usersData._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(news)
      })
      updateUsersData()
      if (setIsLoading) setIsLoading(false)
      renderPopUp("Article Saved")
    }
    catch {
      renderPopUp("Error saving that article...")
      if (setIsLoading) setIsLoading(false)
    }

  }

  async function deleteFav() {
    if (!deletee) return
    try {
      if (setIsLoading) setIsLoading(true)

      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/news/delete/${usersData._id}/${news._id}`, {
        method: "DELETE"
      })

      updateUsersData()

      if (setIsLoading) setIsLoading(false)
      renderPopUp("Article Deleted")

    }
    catch {
      renderPopUp("Error deleting that article...")
      if (setIsLoading) setIsLoading(false)
    }

  }





  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", news)} style={[styles.newsCardCont, { backgroundColor: theme }]}>

      <Image source={{ uri: news.media }} resizeMode="contain" style={styles.newsImage} />

      <Text style={{ fontSize: 18, color: `${theme === "white" ? "black" : "white"}` }}>{news.title}</Text>


      <Text style={{ fontSize: 12, color: `${theme === "white" ? "black" : "white"}` }}>{`${news.summary.split(" ").splice(0, 12).join(" ")}`}...</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 25, width: "100%" }}>

        <View>
          <Text style={{ fontSize: 10, color: `${theme === "white" ? "black" : "white"}` }}>{news.published_date}</Text>
          <Text style={{ fontSize: 10, color: `${theme === "white" ? "black" : "white"}` }}>Copyright {news.rights.slice(0, 50)}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: "space-evenly", width: "20%" }}>

          <Icon onPress={async () => {
            try {
              await Linking.openURL(news.link)
            }
            catch {
              renderPopUp("Failed to load article")
            }
          }} name="external-link" color="black" size={20} />

          <Icon style={{ paddingLeft: 15 }} onPress={addANewsToFav} name={fav ? "save" : ""} color={likedColor} size={20} />

          <Icon onPress={deleteFav} name={deletee ? "remove" : ""} color="black" size={20} />

        </View>

      </View>

    </TouchableOpacity>
  )
}

export default NewsCard
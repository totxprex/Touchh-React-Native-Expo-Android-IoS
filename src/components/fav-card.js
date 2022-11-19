import React from "react"
import { Text, ImageBackground } from "react-native"
import styles from "../styles/styles"




const FavCard = function ({ data }) {

  const fav = data

  if (!fav) return


  return (
    <ImageBackground resizeMode="cover" source={{ uri: fav.media }} imageStyle={{ borderRadius: 5, opacity: 0.7 }} style={styles.eachFavCont}>
      <Text style={{ fontSize: 15, color: "black", fontWeight: "bold" }}>{fav.title.slice(0, 13)}...</Text>
    </ImageBackground>
  )
}

export default FavCard

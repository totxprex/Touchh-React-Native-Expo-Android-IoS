import React, { useState, useEffect, useContext } from "react"
import { Text, FlatList, View } from "react-native"
import NewsCard from "../components/news-card"
import styles from "../styles/styles"
import AppContext from "../contexts/app-context"
import Icon from "react-native-vector-icons/Ionicons"

function FavScreen({ navigation, route }) {

  const [comps, setComps] = useState([])
  const [refreshing, seRefreshing] = useState(false)

  const { theme } = useContext(AppContext)

  const data  = route.params




  useEffect(() => {
    if (data.length === 0) return setComps([<View style={{ width: "100%", alignItems: "center" }}>
      <Icon size={100} color="black" name="newspaper-outline" />
      <Text style={{color: `${theme === "white" ? "black" : "white"}`}}>You have no News saved yet</Text>
    </View>])


    seRefreshing(true)
    const arr = data.map((e) => {
      return <NewsCard deletee={true} navigation={navigation} data={e} />
    })

    setComps(arr)

    seRefreshing(false)
  }, [route.params])



  return (
    <View style={{ backgroundColor: theme, paddingBottom: 40 }}>
      <Text style={{ fontSize: 18, paddingLeft: 10, paddingTop: 15, fontWeight: "bold", paddingBottom: 15, color: `${theme === "white" ? "black" : "white"}` }}>SAVED ARTICLES</Text>

      <FlatList data={comps} contentContainerStyle={[styles.newsCont, { backgroundColor: theme }]} renderItem={({ item }) => item}></FlatList>
    </View>
  )
}



export default FavScreen
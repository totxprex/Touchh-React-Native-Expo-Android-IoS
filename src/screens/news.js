import React, { useState, useEffect, useContext, useRef } from "react"
import { Text, FlatList, ScrollView, TouchableOpacity, View } from "react-native"
import NewsCard from "../components/news-card"
import styles from "../styles/styles"
import FavCard from "../components/fav-card"
import AppContext from "../contexts/app-context"
import FilterModal from "../components/filter-modal"
import Icon from "react-native-vector-icons/Ionicons"
import { newsColor } from "../../src/styles/colors"

function NewsScreen({ navigation }) {

  const [comps, setComps] = useState([])
  const [query, setQuery] = useState("tech")
  const [page, setPage] = useState(1)
  const [refreshing, seRefreshing] = useState(false)
  const [loadingStat, setLoadingStat] = useState("Loading")
  const listRef = useRef(null)



  const [modalFunction, setModalFunction] = useState(null)

  const { theme, renderPopUp, setIsLoading, usersData } = useContext(AppContext)

  const modal = useRef(null)

  useEffect(() => {
    setModalFunction(modal.current)
  }, [])


  useEffect(() => {
    getNewsData()
  }, [query, page])


  async function getNewsData() {
    try {
      if (setIsLoading) setIsLoading(true)
      const options = {
        method: 'GET',
        headers: {
        }
      };

      const { articles } = await (await fetch(`https://newscatcher.p.rapidapi.com/v1/search_enterprise?lang=en&sort_by=relevancy&page=${page}&media=True&topic=${query}&q=news`, options)).json()

      const arr = articles.map((e) => {
        return <NewsCard fav={true} navigation={navigation} data={e} />
      })
      if (setIsLoading) setIsLoading(false)
      seRefreshing(false)
      setComps(arr)
      setLoadingStat("Load More")
      listRef.current.scrollToIndex({ index: 1, animated: true })

    }

    catch {
      if (renderPopUp) renderPopUp("Failed to load feed... Try again later.")
      if (setIsLoading) setIsLoading(false)
      seRefreshing(false)
    }
  }

  if (comps.length === 0) comps.push(<View style={{ width: "100%", alignItems: "center" }}>
    <Icon size={100} color="black" backgroundColor={newsColor} name="newspaper-outline" />
  </View>)



  return (
    <>
      <Text style={{ fontSize: 18, paddingLeft: 10, paddingTop: 10, fontWeight: "bold", color: `${theme === "white" ? "black" : "white"}` }}>Saved</Text>

      <ScrollView showsHorizontalScrollIndicator={false} scrollEnabled={true} horizontal={true} contentContainerStyle={[styles.newFavCont, { backgroundColor: theme }]}>


        <FavCard data={usersData.savedNews[usersData.savedNews.length - 1]} />

        <TouchableOpacity onPress={() => navigation.navigate("Saved", usersData.savedNews)} style={styles.eachFavCont}>

          <Text style={{ fontSize: 15, color: `${theme === "white" ? "black" : "white"}` }}>Show All Saved</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => modalFunction.setRequestModalVisibility(true)} style={styles.eachFavCont}>

          <Text style={{ fontSize: 15, color: `${theme === "white" ? "black" : "white"}` }}>Show Filter</Text>

        </TouchableOpacity>

      </ScrollView>

      <FlatList ref={listRef} data={[

        <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: "bold", color: `${theme === "white" ? "black" : "white"}` }}>Feed</Text>,

        ...comps,

        <Icon.Button onPress={() => {
          seRefreshing(true)
          setIsLoading(true)
          setLoadingStat("Loading")
          setPage(page + 1)
        }} size={17} color="black" backgroundColor={newsColor} name="reload-outline">{loadingStat}</Icon.Button>

      ]} contentContainerStyle={[styles.newsCont, { backgroundColor: theme }]} renderItem={({ item }) => item} refreshing={refreshing} onRefresh={() => {
        seRefreshing(true)
        getNewsData()

      }}></FlatList>


      <FilterModal seRefreshing={seRefreshing} setQuery={setQuery} ref={(ref) => modal.current = ref} />
    </>
  )
}



export default NewsScreen

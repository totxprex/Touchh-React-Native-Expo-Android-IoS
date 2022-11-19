import React, { useState, useEffect, useContext, useRef } from "react"
import { View, FlatList, TextInput } from "react-native"
import styles from "../styles/styles"
import ContactCard from "../components/contact-card"
import Icon from "react-native-vector-icons/EvilIcons"
import AppContext from "../contexts/app-context"
import { searchColor } from "../../src/styles/colors"


function SearchScreen({ display }) {

  const [data, setData] = useState([<View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
    <Icon size={100} color={searchColor} backgroundColor={searchColor} name="search" />
  </View>])

  const [refershing, setRefresing] = useState(false)

  const [query, setQuery] = useState("")

  const inputField = useRef(null)

  const { usersData, renderPopUp, backendServer, setIsLoading, token, updateUsersData, theme } = useContext(AppContext)



  async function search() {
    if (query === "") return

    try {
      if (setIsLoading) setIsLoading(true)

      const userInfo = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get/${query}`)).json()

      if (!userInfo.data.username) throw new Error()

      setData([<ContactCard data={userInfo.data} />])


      if (setIsLoading) setIsLoading(false)
    }
    catch (err) {
      renderPopUp("User Not Found")
      if (setIsLoading) setIsLoading(false)
    }

  }


  if (!display) return


  return (
    <View style={[styles.searchCont, { backgroundColor: theme }]}>

      <View style={styles.inputContSearch}>

        <Icon onPress={() => inputField.current.blur()} name="close-o" size={20} style={{ marginTop: -20, marginRight: -25, zIndex: 50, opacity: 0.5 }} />

        <TextInput ref={(ref) => inputField.current = ref} onSubmitEditing={search} onChangeText={(text) => setQuery(text)} focusable={true} placeholder="Search by username (case-sensitive)" style={styles.searchInpuTStyle} />

        <Icon onPress={search} style={{ marginTop: -20, marginLeft: -25, zIndex: 50, opacity: 0.5 }} name="search" size={20} />

      </View>

      <FlatList data={data} renderItem={({ item }) => item} refreshing={refershing} onRefresh={() => { }} />

    </View>
  )
}



export default SearchScreen
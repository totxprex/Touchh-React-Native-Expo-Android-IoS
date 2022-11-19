import React, { useState, useEffect, useContext } from "react"
import { Text, View, FlatList, Image } from "react-native"
import ContactCard from "../components/contact-card"
import AppContext from "../contexts/app-context"
import threeD from "../../assets/3d.png"



function ContactScreen({ display }) {

  const [comps, setComps] = useState([])

  const { token, getAWSUrl, usersData, backendServer, renderPopUp, theme } = useContext(AppContext)

  const [refreshing, setResfreshing] = useState(false)

  useEffect(() => {
    const arr = usersData.contactList.map((e) => <ContactCard data={e} />)

    setComps(arr)
  }, [display])


  async function refreshContact() {

    try {
      setResfreshing(true)

      const userInfo = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get/${usersData.username}`)).json()

      if (!userInfo.data.username) throw new Error("Internal server error")

      const arr = userInfo.data.contactList.map((e) => <ContactCard data={e} />)

      setComps(arr)

      setResfreshing(false)

      renderPopUp("Done!")

    }
    catch (err) {
      console.log(err)
      setResfreshing(false)
      renderPopUp(`${err || "Internal server error"}`)
      setResfreshing(false)
    }
  }


  if (!display) return


  if (comps.length === 0) return (
    <View style={{ width: "100%", flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: "100%" }}>

      <Image style={{ width: 100, height: 100, marginTop: -50, marginBottom: 10 }} source={threeD} resizeMode="cover" />

      <Text style={{color: `${theme === "white" ? "black" : "white"}`}}>You have no users in your contact list ⛺</Text>
    </View>
  )



  return (
    <View style={{ width: "100%", padding: 15 }}>

      <FlatList data={comps} renderItem={({ item }) => item} refreshing={refreshing} onRefresh={refreshContact} />

    </View>
  )
}



export default ContactScreen
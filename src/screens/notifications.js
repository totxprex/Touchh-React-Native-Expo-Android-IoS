import React, { useState, useEffect, useRef, useContext } from "react"
import { View, FlatList, Image, Text } from "react-native"
import styles from "../styles/styles"
import NotificationCard from "../components/notification-card"
import RequestModal from "../components/request-modal"
import AppContext from "../../src/contexts/app-context"
import threeD from "../../assets/3d.png"


function NotificationsScreen({ display }) {

  const [refreshing, setRefreshing] = useState(false)
  const [comps, setComps] = useState([])

  const requestModal = useRef(null)

  const { usersData, theme, backendServer, token, renderPopUp } = useContext(AppContext)


  async function updateNotCont() {
    try {
      setRefreshing(true)
      const userInfo = await (await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/get/${usersData.username}`)).json()

      if (!userInfo.data.username) throw new Error("Internal server error")


      const arr = userInfo.data.addRequests.map((e, i) => {
        return <NotificationCard key={i} setRefreshing={setRefreshing} data={e} requestModal={requestModal.current} status={e.status} />
      })

      setComps(arr.reverse())
      setRefreshing(false)
      
    }
    catch {
      renderPopUp("Error reloading your notifications")
      setRefreshing(false)
    }
  }


  useEffect(() => {

    const arr = usersData.addRequests.map((e, i) => {
      return <NotificationCard key={i} setRefreshing={setRefreshing} data={e} requestModal={requestModal.current} status={e.status} />
    })

    setComps(arr.reverse())


  }, [display])







  if (!display) return


  if (usersData.addRequests.length === 0) return (<View style={{ width: "100%", flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: "100%" }}>

    <Image style={{ width: 100, height: 100, marginTop: -50, marginBottom: 10 }} source={threeD} resizeMode="cover" />

    <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>You have no new or pending Notifications ⛺</Text>
  </View>)


  return (
    <View style={styles.notCont}>

      <FlatList data={comps} renderItem={({ item }) => item} refreshing={refreshing} onRefresh={updateNotCont} />

      <RequestModal updateNotCont={updateNotCont} ref={(ref) => requestModal.current = ref} />

    </View>
  )
}



export default NotificationsScreen
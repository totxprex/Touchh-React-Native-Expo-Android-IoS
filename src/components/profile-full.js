import React, { useState, useEffect, useContext, useRef } from "react"
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, Alert, Pressable } from "react-native"
import styles from "../styles/styles"
import placeholer from "../../assets/user.png"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AppContext from "../contexts/app-context"
import { TextInput } from "react-native-paper"
import { getDocumentAsync } from "expo-document-picker"



const Profile = function ({ display }) {

  const [userImage, setUserImage] = useState(null)

  const { getAWSUrl, usersData, renderPopUp, backendServer, setIsLoading, token, updateUsersData, theme } = useContext(AppContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [about, setAbout] = useState("")
  const [password, setPassword] = useState("")

  const [bioValue, setBioValue] = useState(usersData.about)

  const [editMode, setToEditMode] = useState(false)

  const nameImput = useRef(null)
  const passInput = useRef(null)
  const emailInput = useRef(null)
  const usernameInput = useRef(null)
  const bioInput = useRef(null)




  useEffect(() => {

    (async function () {
      try {
        if (setIsLoading) setIsLoading(true)

        if (usersData.photo === "No User Image") {
          setUserImage(placeholer)

          if (setIsLoading) setIsLoading(false)
        }
        else {

          const imageUrl = await getAWSUrl(usersData.photo)
          setUserImage({ uri: imageUrl.data })

          if (setIsLoading) setIsLoading(false)
        }



      }
      catch (err) {
        renderPopUp(`${err || "Internal server error"}`)
        if (setIsLoading) setIsLoading(false)
        console.log(err)
      }

    })()

  }, [display])


  useEffect(() => {
    setName(usersData.name)
    setEmail(usersData.email)
    setAbout(usersData.about)
    setUsername(usersData.username)
  }, [usersData])


  async function fileUpload() {
    try {
      const file = await getDocumentAsync({ type: "image/jpeg" })

      if (file.type === "cancel") return

      const form = new FormData()

      form.append("photo", { type: file.mimeType, uri: file.uri, name: file.name })

      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/pic/${usersData.username}`, {
        method: "PATCH",
        headers: {
          "enctype": "multipart/form-data"
        },
        body: form
      })

      setUserImage({ uri: file.uri })

      updateUsersData()

      Alert.alert("Success", "Upload successful")
    }
    catch (err) {
      console.log(err)
      Alert.alert("Error updating picture", "Please try again later")
    }
  }


  async function updateUserFieldsInDatabase() {

    try {

      if (email === usersData.email && password === "") return


      setIsLoading(true)

      const body = {}

      if (email !== usersData.email) body.email = email
      if (password !== "") body.password = password

      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/update/${usersData._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      })

      updateUsersData()

      emailInput.current.clear()
      nameImput.current.clear()
      passInput.current.clear()
      usernameInput.current.clear()

      setPassword("")

      setIsLoading(false)

      Alert.alert("Success", "You account has been updated")

    }
    catch (err) {
      console.log(err)
      setIsLoading(false)
      Alert.alert("Error updating your account")
    }
  }




  function stopEdit() {

    emailInput.current.clear()
    nameImput.current.clear()
    passInput.current.clear()
    usernameInput.current.clear()

    setName(usersData.name)
    setEmail(usersData.email)
    setUsername(usersData.username)
  }


  async function updateAbout() {
    try {
      if (bioValue.length >= 200) return Alert.alert("Error", "Bio must be less than 200 characters")

      if (bioValue === usersData.about) return

      setIsLoading(true)

      const body = {}

      if (bioValue !== usersData.about) body.about = bioValue


      await fetch(`${backendServer}/touchh/mobile/api/v1/1680/${token}/user/update/${usersData._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      })

      updateUsersData()

      setToEditMode(false)

      setIsLoading(false)

      setAbout(bioValue)

      Alert.alert("Success", "You bio has been updated")

    }
    catch (err) {
      console.log(err)
      setIsLoading(false)
      Alert.alert("Error updating your account")
    }
  }





  if (!display) return

  return (
    <ScrollView contentContainerStyle={styles.profileScrollViewInnerCont}>

      <View style={styles.prettyCard}>

        <View style={[styles.designTop, { backgroundColor: "rgb(165, 169, 224)" }]}>

          <Text style={{ color: "white", fontSize: 20, marginTop: - 5 }}>Account Information</Text>

          <Pressable onPress={fileUpload}>
            <ImageBackground resizeMode="cover" imageStyle={{ opacity: 0.4, borderRadius: 50 }} style={styles.settingImage} source={userImage}>

              <Icon style={{ elevation: 10 }} name="update" size={30} color="white" />

            </ImageBackground>
          </Pressable>

        </View>


        <Text style={{ paddingLeft: 10, fontSize: 15, opacity: 0.7 }}>Name</Text>

        <TextInput ref={nameImput} placeholder={`${name}    🔒`} style={styles.settingInputStyles} mode="outlined" />

        <Text style={{ paddingLeft: 10, fontSize: 15, opacity: 0.7 }}>Username</Text>

        <TextInput ref={usernameInput} placeholder={`@${username}    🔒`} style={styles.settingInputStyles} mode="outlined" />

        <Text style={{ paddingLeft: 10, fontSize: 15, opacity: 0.7 }}>Email</Text>

        <TextInput ref={emailInput} onChangeText={(text) => setEmail(text)} placeholder={`${email}`} style={styles.settingInputStyles} mode="outlined" />

        <Text style={{ paddingLeft: 10, fontSize: 15, opacity: 0.7 }}>Password</Text>

        <TextInput ref={passInput} onChangeText={(text) => setPassword(text)} placeholder="********" style={styles.settingInputStyles} mode="outlined" />


        <View style={styles.updateNav}>

          <TouchableOpacity onPress={stopEdit} style={[styles.inUpdateNav, { borderRightWidth: 1, borderRightColor: "rgb(224, 218, 218)" }]}>
            <Text style={{ fontSize: 15, opacity: 0.7, color: `${theme === "white" ? "black" : "white"}` }}>Stop Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={updateUserFieldsInDatabase} style={styles.inUpdateNav}>
            <Text style={{ fontSize: 15, opacity: 0.7, color: `${theme === "white" ? "rgb(111, 118, 221)" : "white"}` }}>Update</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.prettyCard}>
        <View style={[styles.designTop, { backgroundColor: "rgb(172, 224, 165)" }]}>

          <Text style={{ color: "white", fontSize: 20, marginTop: - 5 }}>Bio (Max 200 Characters)</Text>

          <Icon color="white" name="card-text-outline" size={25} style={{ color: "white", marginTop: - 5 }} />

        </View>

        {
          !editMode
            ?
            <View style={styles.settingBioModal}>
              <Text style={{ color: `${theme === "white" ? "black" : "white"}` }}>{about}
              </Text>
            </View>
            :
            <TextInput ref={bioInput} onChangeText={(text) => setBioValue(text)} placeholder={`Edit your bio`} style={[styles.settingInputStyles, { height: 50, width: "90%" }]} mode="outlined" />
        }



        <View style={styles.updateNav}>

          <TouchableOpacity onPress={() => setToEditMode(!editMode)} style={[styles.inUpdateNav, { borderRightWidth: 1, borderRightColor: "rgb(224, 218, 218)" }]}>
            <Text style={{ fontSize: 15, opacity: 0.7, color: `${theme === "white" ? "black" : "white"}` }}>{editMode ? "Stop Edit" : "Edit"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={updateAbout} style={styles.inUpdateNav}>
            <Text style={{ fontSize: 15, opacity: 0.7, color: `${theme === "white" ? "rgb(111, 118, 221)" : "white"}` }}>Update</Text>
          </TouchableOpacity>

        </View>


      </View>

    </ScrollView >
  )
}



export default Profile
import { StyleSheet, Platform, StatusBar } from "react-native"
import { messagesColor, contactsColor, settingsColor, newsColor, profileColor, notfifcationsColor, searchColor, helpColor } from "./colors"


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "flex-end"
  },

  mainAppCont: {
    flex: 0.92,
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 50 : 70,
    zIndex: 500
  },
  engineCont: {
    width: "100%",
    flex: 1,
  },
  navCont: {
    backgroundColor: messagesColor,
    flex: 0.08,
    width: "100%",
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    opacity: 0.7,
    zIndex: 800,
    minHeight: 60,
    maxHeight: 60,
  },
  navCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

  },
  topNavCont: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 30,
    minHeight: 50,
    zIndex: 900,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  sideMenuNavCont: {
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "flex-start",
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 15,
    minHeight: 50,
    zIndex: 900,
    padding: 10,
    backgroundColor: "#F2F2F2",
    paddingTop: 50,
    paddingBottom: 30,
  },
  sideMenuImage: {
    margin: 0,
    padding: 0,
    width: 100,
    height: 100,
    borderRadius: 100
  },
  chatIntroContImage: {
    margin: 0,
    padding: 0,
    width: 30,
    height: 30,
    borderRadius: 30
  },
  settingImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  chatHistoryCardImage: {
    margin: 0,
    padding: 0,
    width: 60,
    height: 60,
    borderRadius: 60
  },
  normalText: {
    color: "#2c3e50",
    fontSize: 20
  },
  sideNavBtnCont: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#bdc3c7"
  },
  eachSideBtn: {
    backgroundColor: "#2c3e50",
    width: "100%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 15,
    marginBottom: 20,
    zIndex: 100
  },
  sideNavIntro: {
    width: "100%",
    alignItems: 'center',
  },
  underNavButton: {
    color: "#2c3e50",
    backgroundColor: "#F2F2F2",
  },
  homeCont: {
    display: "flex",
    flex: 1,
    flexDirection: "column",

  },
  introHomeCont: {
    flex: 0.3,
    backgroundColor: messagesColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
    paddingTop: 10,
  },
  introHomeContInner: {
    flex: 1,
    backgroundColor: "rgb(186, 236, 238)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    padding: 10,
    flexWrap: "wrap"
  },
  statCardCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgb(186, 236, 258)",
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1
  },
  eachChatHistoryCardCont: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    backgroundColor: "#ecf2ff",
    borderRadius: 10,
    marginBottom: 10
  },
  eachNotCardCont: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderLeftWidth: 4.5,
  },
  chatHistoryFlatListCont: {
    paddingTop: 10
  },
  chatCont: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  chatHistoryCont: {
    backgroundColor: "white",
    flex: 0.75,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    marginTop: -40,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  whereChatMessagesAre: {
    backgroundColor: "white",
    flex: 0.8,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    marginTop: -40,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  chatIntroParentCont: {
    flex: 0.2,
    backgroundColor: messagesColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
  chatInnertContIntro: {
    flex: 0.5,
    backgroundColor: "rgb(186, 236, 238)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  chatInputCont: {
    display: "flex",
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 60,
    maxHeight: 60,
    paddingTop: 5,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
  inpuTStyle: {
    flex: 0.85,
    backgroundColor: "rgb(230, 252, 253)",
    elevation: 2,
    height: "100%",
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  sendBtnAndOther: {
    flex: 0.1,
    elevation: 3
  },
  eachMessageContRecieved: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    backgroundColor: "rgb(252, 251, 229)",
    padding: 10,
    borderRadius: 5,
    color: "white",
    marginBottom: 10,
  },
  eachMessageContSent: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    backgroundColor: "rgb(223, 253, 255)",
    padding: 10,
    borderRadius: 5,
    color: "white",
    marginBottom: 10,
    marginLeft: "50%"
  },
  otherUserProfileCont: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
    alignContent: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    zIndex: 1000,
    top: 100
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    width: "85%",
    paddingBottom: 10,
    paddingTop: 10,
  },
  modalViewRequest: {
    margin: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "60%",
    padding: 20,
    justifyContent: "space-between",
    height: 200,
    borderRadius: 20
  },
  button: {
    borderRadius: 10,
    padding: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  insideProfileModalCont: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  bioProfileModal: {
    marginBottom: 20,
    backgroundColor: "rgb(239, 251, 252)",
    padding: 10,
    borderRadius: 9,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20
  },
  settingBioModal: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 9,

    marginLeft: 5,
    marginRight: 5,
  },
  contactCardCont: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: 100,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    marginTop: 15
  },
  contactCardImage: {
    opacity: 0.2,
    borderRadius: 10,
    width: "100%"
  },
  settingCont: {
    padding: 10,
    zIndex: 100,
    paddingBottom: 50
  },
  newsCont: {
    padding: 10,
    backgroundColor: "white"
  },
  settingsNav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20
  },
  updateNav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10
  },
  inSettingsNav: {
    width: "50%",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgb(224, 218, 218)",
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  inUpdateNav: {
    width: "50%",
    borderTopWidth: 1,
    borderTopColor: "rgb(224, 218, 218)",
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  inSettingsNavActive: {
    width: "50%",
    borderBottomWidth: 3,
    borderBottomColor: "rgb(253, 189, 189)",
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  profileScrollViewInnerCont: {
    zIndex: 5
  },
  prettyCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgb(224, 218, 218)",
    borderRadius: 15,
    borderTopWidth: 0,
    marginBottom: 30,
    zIndex: 5
  },
  designTop: {
    width: "100%",
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    marginBottom: 10,
    zIndex: 5
  },
  settingInputStyles: {
    height: 35,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    marginBottom: 10
  },
  paramsSettingsListEach: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "rgb(255, 249, 249)",
    elevation: 2,
    marginBottom: 20
  },
  newsCardCont: {
    width: "100%",
    elevation: 5,
    backgroundColor: "rgb(247, 247, 252)",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  newsImage: {
    borderRadius: 5,
    height: 150,
    width: "100%",
    marginBottom: 10
  },
  newFavCont: {
    marginBottom: 20,
    padding: 10,
    height: 100
  },
  eachFavCont: {
    width: 100,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: 'center'
  },
  searchCont: {
    padding: 10,
  },
  searchInpuTStyle: {
    backgroundColor: "rgb(253, 255, 255)",
    elevation: 5,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 20,
    height: 40,
    flex: 0.95,
    paddingLeft: 40
  },
  inputContSearch: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  notCont: {
    padding: 10,
  },
  loginCont: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  signupCont: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  loginInput: {
    height: 50,
    width: "90%",
    marginBottom: 30,
  }
});


export default styles
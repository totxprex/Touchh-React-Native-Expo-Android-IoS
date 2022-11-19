import { Platform, StatusBar } from "react-native"

const mainAppPaddingInitial = Platform.OS === "android" ? StatusBar.currentHeight + 50 : 70


export { mainAppPaddingInitial }
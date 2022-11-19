import { io } from "socket.io-client"
import callNotifications from "./src/logic/Notifications"



const initiateSocket = function (username) {

  const socketIo = io("https://touchh-mobile-socket.herokuapp.com")

  socketIo.on("error", (message) => {
    console.log(message)
  })

  socketIo.on("connect", async () => {

    console.log("Socket in")

    socketIo.emit("updateMySocketId", username)

  })


  return socketIo
}


export { initiateSocket }
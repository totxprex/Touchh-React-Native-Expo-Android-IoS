import { setNotificationHandler, scheduleNotificationAsync, requestPermissionsAsync } from 'expo-notifications';

async function callNotifications(title, body) {

  // First, set the handler that will cause the notification
  // to show the alert

  const permission = await requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  })

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Second, call the method

  await scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null,
  })
}


export default callNotifications
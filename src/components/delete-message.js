import React, { useImperativeHandle, forwardRef } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import { Text } from 'react-native';


const DeleteMessageDialogue = forwardRef(function ({ deleteMessage, status }, ref) {
  const [visible, setVisible] = React.useState(false);

  useImperativeHandle(ref, function () {
    return {
      showModal() {
        if (status === "recieved") return
        setVisible(true)
      },
      hideModal() {
        setVisible(false)
      }
    }
  })


  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog style={{ padding: 15 }} visible={visible} onDismiss={hideDialog}>
        <Text>Delete Message - Note: This message is also deleted for the other user.</Text>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>No</Button>
          <Button onPress={deleteMessage}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DeleteMessageDialogue;





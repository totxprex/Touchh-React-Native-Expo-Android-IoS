import React, { useImperativeHandle, forwardRef } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import { Text } from 'react-native';


const DeleteDialogue = forwardRef(function ({ deleteAccountFunction }, ref) {
  const [visible, setVisible] = React.useState(false);

  useImperativeHandle(ref, function () {
    return {
      showModal() {
        setVisible(true)
      }
    }
  })


  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog style={{ padding: 15 }} visible={visible} onDismiss={hideDialog}>
        <Text>Are you sure you want to delete this account? Note: You cannot reverse this. </Text>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>No</Button>
          <Button onPress={deleteAccountFunction}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DeleteDialogue;





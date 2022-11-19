import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';




const Loading = ({ isLoading }) => (
  <ActivityIndicator style={{ paddingRight: 10, marginTop: -4, transform: [{scale: 0.6}] }} size="small" animating={isLoading} color="black" />
);

export default Loading;
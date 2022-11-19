import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { View } from "react-native"




const LoadingLarge = ({ isLoading }) => (
  <View style={{ width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", height: '100%', position: "absolute" }}>
    <ActivityIndicator size="large" animating={isLoading} color="black" />
  </View>
);

export default LoadingLarge;
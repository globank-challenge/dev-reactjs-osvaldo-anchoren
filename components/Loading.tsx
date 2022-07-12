import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
        },
     loading: {
        width: 100,
        height: 100,
        marginTop:10
    }
});

export const Loading = () => {
  return (
    <View  style={styles.container}>
      <Image
        style={styles.loading}
        source={require('../images/pikachuLoading.gif')}
      />
      <Text>Cargando...</Text>
    </View>
  );
}
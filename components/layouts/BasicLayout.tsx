import React, {type PropsWithChildren, type FC} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';


export const BasicLayout:FC<PropsWithChildren> = ({children}) => {
    const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
            <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            {children}
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

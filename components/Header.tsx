import React, {type PropsWithChildren, type FC} from 'react';
import {
    ImageBackground,
  StyleSheet,
  Text,
  useColorScheme, 
} from 'react-native';
import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';


export const Header:FC<PropsWithChildren> = ({children}) => {
    const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    paddingBottom: 40,
      paddingTop: 96,
      paddingHorizontal: 32
  };

  return (
    <ImageBackground
    accessibilityRole={"image"}
    source={require("../images/pokemones.jpg")}
    style={backgroundStyle}
    imageStyle={styles.logo}
  >
    <Text style={styles.text}>PokéDex</Text>
    <Text style={styles.textSub}>By Matias Anchoren</Text>
  </ImageBackground>
  )
}

const styles = StyleSheet.create({
    logo: {
      opacity: 0.2,
      overflow: "visible",
      resizeMode: "cover",
      /*
       * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
       *
       * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
       * source image's size.
       */
      marginLeft: -128,
      marginBottom: -192
    },
    text: {
      fontSize: 40,
      fontWeight: "600",
      textAlign: "center",
      color: Colors.black
    },
    textSub: {
        fontSize: 20,
        fontWeight: "300",
        textAlign: "center",
        color: Colors.black
      }
  });

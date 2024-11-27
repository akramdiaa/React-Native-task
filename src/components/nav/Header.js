import { View, ImageBackground, Image, StyleSheet } from "react-native";
import React from "react";

export default function Header() {

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/navbar/backgroundimage.png")}
      />
      <Image 
        style={styles.logoStar}
        source={require("../../../assets/navbar/logo.png")} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  

  },
  logoStar: {
    width: 132,
    position: 'absolute',
    zIndex: 3,
    right: 0,
  },
});
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Image style={styles.backButtonImage} source={require("../../../assets/navbar/backButton.png")} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  backButtonImage: {
    width: 24,
    resizeMode: 'contain', 
  },
});
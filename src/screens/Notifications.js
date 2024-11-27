import { View, StyleSheet } from 'react-native'
import React from 'react'
import CardSlider from '../components/cards/CardSlider'
import Cards from '../components/cards/Cards'

  



const Notifications = () => {
  
  return (
    <View style={styles.container}>
      <CardSlider />
      <Cards/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default Notifications
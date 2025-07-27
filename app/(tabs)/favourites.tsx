import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const favourites = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>all favourite ciites</Text>
    </View>
  )
}

export default favourites

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
})
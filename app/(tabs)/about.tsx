import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const about = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>about screen</Text>
    </View>
  )
}

export default about

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
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const about = () => {
  return (
    <LinearGradient
      colors={["#1f4037", "#455c9bff"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.card}>
        <Text style={styles.subtext}>Crafted with ❤️ by</Text>
        <Text style={styles.name}>Sanjeeb Gochhayat</Text>
      </View>
    </LinearGradient>
  )
}

export default about

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 30,
    width: "100%",
    elevation: 10,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 15,

  },
  subtext: {
    fontSize: 18,
    color: "#f1f1f1",
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffecd2",
    letterSpacing: 1.2,
  },
});
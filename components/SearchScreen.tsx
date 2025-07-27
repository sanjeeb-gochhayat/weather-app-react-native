import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
      <View style={styles.iconContainer}>
      <Ionicons name="search-outline" color={'gray'} size={30}/>
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center', 
    },
  input: {
    height: 50,
    width: 280,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  iconContainer: {
    width: 50,
    height: 55,
    borderColor:'#ffd33d',
    borderWidth:5,
    borderRadius: 10,
    padding:5
  }
})
import React, {useState, useEffect} from 'react';
import { SafeAreaView, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { Button, Text, View, } from 'react-native';

const ProductInfo = ({route, navigation}) => {

  const { paramKey } = route.params;

  useEffect( () => {alert(paramKey)}, [] );

  return (
      <View style = {styles.container}>
          <View style={{flex: 0.3}}>
            <Image style = {styles.image_style} source={require('../assets/adaptive-icon.png')}/>
          </View>
            
          <View style={{flex: 0.3}}>
            <Text style = {{fontSize: 20}}>Coke Can</Text>
          </View>
          
      </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_style:{
    height: 250,
    width: 250
  }
})


export default ProductInfo;



import React, {useState, useEffect} from 'react';
import { Button, Text, View, } from 'react-native';

const ProductInfo = ({route, navigation}) => {

  const { paramKey } = route.params;

  useEffect( () => {alert(paramKey)}, [] );

  return (
      <View>
          <Text>Hello</Text>
      </View>
  )

}

export default ProductInfo;



import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const Home = ({navigation}) => {

    return (

        <View style={styles.container}>
        <Text style = {styles.header} >Recycling Project</Text>
        <View>
          <Pressable onPress={()=>navigation.navigate("ScanBarcode")}>
            <Text>Scan Barcode</Text>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate("Locations")}>
            <Text>Recycling Locations</Text>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate("Information")}>
          <Text>Recycling Information</Text>
          </Pressable>
          
        </View>
      </View>
    );
};
export default Home;
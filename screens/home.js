import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


const textButtons = StyleSheet.create({
  normal: {
    fontSize: 35,
    color: "#fff",
    textAlign:'center',
  },
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: 20,
      margin: 10,
    },
    top: {
      flex: 0.3,
      backgroundColor: "#00CC66",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    }
  });

const Home = ({navigation}) => {

    return (

      <View style={styles.container}>
        <Text style={{textAlign: "center", fontSize: 25}}>Recycling Project</Text>

        <Pressable style={styles.top} onPress={()=>navigation.navigate("ScanBarcode")}>
          <Text style={textButtons.normal}>Scan Barcode</Text> 
        </Pressable>
        <Pressable style = {styles.top} onPress={()=>navigation.navigate("Locations")}>
          <Text style={textButtons.normal}>Recycling Locations</Text>
        </Pressable>
        <Pressable style = {styles.top} onPress={()=>navigation.navigate("Information")}>
          <Text style={textButtons.normal}>Recycling Information</Text>
        </Pressable>

      </View>
    );
};
export default Home;
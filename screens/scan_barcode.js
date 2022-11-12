import { View, SafeAreaView, FlatList, Text, StyleSheet, Button, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';



const ScanBarcode = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);

    //const [product, setProduct] = useState('');
    //const [recycleble, setRecycleble] = useState(false);
    //const [howTo, setHowTo] = useState('');

    const askForCameraPermission = () => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    useEffect( () => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ( {type, data}) => {
        navigation.navigate("ProductInfo", {paramKey: data});
    }

    if(hasPermission === null){
        return(
            <View>
                <Text>
                    Awaiting Camera Permission
                </Text>
            </View>
        )
    }

    if(hasPermission === false){
        return (
            <View>
            <Text style={{margin:10}}>
            No access to Camera.
            <Button title={"Give access"} onPress={() => askForCameraPermission()}/>
            </Text>
            </View>

            )
    }


    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner 
                    onBarCodeScanned={handleBarCodeScanned}
                    style={{height:400, width:400}}
                    />
           </View>
                    

        <View style={styles.container}>

        { 
        //<Text style={{textAlign: "center", fontSize: 25}}>Recycling Project</Text>

        //<View style={styles.top} onPress={()=>navigation.navigate('ScanBarcode')}>
        //<Pressable onPress={()=>navigation.navigate("ProductInfo", {paramKey: text})}>
        //    <Text style={textButtons.normal}>Produjjjjct name: *name*</Text> 
        //</Pressable>
          
        //  <Text style={textButtons.normal}>Co2 Equivalence **</Text>
        //</View>  <Text style={textButtons.normal}>Alternative Option:</Text>
        //<View>
        }

      </View>
        </View>

    )
}

export default ScanBarcode

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  barcodebox:{
    alignItems:'center',
    justifyContent:'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor:'tomato'
  },
  mainText:{
    fontSize: 16,
    margin:20
  },
    top: {
      flex: 1,
      backgroundColor: "#00CC66",

      alignItems: 'center', //Centered vertically
      height:"50%",
      bottom: 35
    }
  });

const textButtons = StyleSheet.create({
  normal: {
    fontSize: 35,
    color: "#fff",
    textAlign:'center'
  },
})
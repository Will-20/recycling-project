import { View, SafeAreaView, FlatList, Text, StyleSheet, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';



const Home = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned,setScanned] = useState(false);
    const[text, setText] = useState('Not Yet Scanned');

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
        setScanned(true);
        setText(data);
    }

    if(hasPermission === null){
        return(
            <View>
            <Text>
            I am requesting for cam position
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
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{height:400, width:400}}
                    />


           </View>
            <Text style = {styles.mainText}>{text}           
            </Text>           

            {scanned &&  <Button title={'scan again?'} onPress={() => {
                setScanned(false)
            }} color='tomato'/>}
        </View>

    )
}

export default Home

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
    width:300,
    overflow: 'hidden',
    borderRaius: 30,
    backgroundColor:'tomato'
  },
  mainText:{
    fontSize: 16,
    margin:20
  }
});

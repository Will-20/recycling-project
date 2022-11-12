import { View, SafeAreaView, FlatList, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';



const Home = (props) => {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned,setScanned] = useState(false);
	const[text, setText] = useState('Not Yet Scanned');

	const askForCameraPermission = () => {
		(async () => {
			console.log("I asked");
			const {status} = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status == 'granted')
			console.log(hasPermission);
			
			console.log('................')
		})()
	}

	useEffect( () => {
		askForCameraPermission();
	}, []);

	const handleBarCodeScanned = ( {type, data}) => {
		setScanned(true);
		setText(data);
		console.log(type + " - " + data);
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


		<SafeAreaView style={{flex:1}}>
		<Text>		
		
		</Text>		
		
		</SafeAreaView>

	)
}

export default Home
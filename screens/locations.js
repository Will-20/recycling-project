import React, { useState, useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker, Callout } from "react-native-maps";
import firestore from '@react-native-firebase/firestore';
import {getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {db} from '../firebase/firebase-config';

import * as Location from 'expo-location';

var t = {
    latitude:10,
};

const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};





const Locations = () => {

    const [location, setLocation] = useState();
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location)
      }



      return (
        <View>
            <MapView 
              style={styles.map}
              initialRegion={location}
            > 

                {location && <Marker coordinate={location.coords}/>}

            
            </MapView>
        </View>
    )

}

    //const GetData = async () => {
    //    const PlaceCollection = collection(db, 'locations');
    //    const snapshot = await getDocs(PlaceCollection);
    //    const placeList = snapshot.docs.map(doc => doc.data());
    //    console.log(placeList);
    //}
    //return (
    //    <View>
    //        <Text>Locations</Text>
    //        <Button title={"wasssup"} onPress={GetData}/>
    //    </View>
    

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default Locations;
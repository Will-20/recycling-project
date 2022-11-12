import React from 'react';
import { Button, Text, View, } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import {db} from '../firebase/firebase-config';
const Locations = () => {
    const GetData = async () => {
        const PlaceCollection = collection(db, 'locations');
        const snapshot = await getDocs(PlaceCollection);
        const placeList = snapshot.docs.map(doc => doc.data());
        console.log(placeList);
    }
    return (
        <View>
            <Text>Locations</Text>
            <Button title={"wasssup"} onPress={GetData}/>
        </View>
    )

}

export default Locations;
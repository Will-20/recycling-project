import { NavigationContainer, StackActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home'
import ScanBarcode from './screens/scan_barcode';
import Locations from './screens/locations';
import Information from './screens/information';
import ProductInfo from './screens/product_info';
import Upload from './screens/upload';
import BinInformation from './screens/bin_data';


import {useFonts, Jost_500Medium, Jost_500Medium_Italic} from "@expo-google-fonts/jost";
import AppLoading from 'expo-app-loading';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    Jost_500Medium,
    Jost_500Medium_Italic
  });

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name='ScanBarcode'
            component={ScanBarcode}
            options={{title: 'Scan Barcode'}}
          />
          <Stack.Screen
            name='Locations'
            component={Locations}
            options={{title: 'Recycling Locations'}}
          />
          <Stack.Screen
            name='Information'
            component={Information}
            options={{title: 'Recycling Information'}}
          />
          <Stack.Screen
            name='ProductInfo'
            component={ProductInfo}
            options={{title: 'Product Information'}}
          />
          <Stack.Screen
            name='Upload'
            component={Upload}
            options={{title: 'Upload Data'}}
          />
          <Stack.Screen
            name='BinInformation'
            component={BinInformation}
            options={{title: 'Bin Information'}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

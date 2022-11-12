import { NavigationContainer, StackActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home'
import ScanBarcode from './screens/scan_barcode';
import Locations from './screens/locations';
import Information from './screens/information';

const Stack = createNativeStackNavigator();




function scanBarcode() {
  alert("HI")
}

function recyclingLocations() {
  alert("Recycling Locations")
}

function recyclingInformation() {
  alert("Recycling Locations")
}

const ScanBarcodePage = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
    </View>

  )
}

export default function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

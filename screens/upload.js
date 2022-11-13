import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { Button, Text, View, } from 'react-native';
import Ripple from 'react-native-material-ripple';

import { BarCodeScanner } from 'expo-barcode-scanner';
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';

const Upload = ({route, navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState("Please Scan Barcode");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [category, setCategory] = useState([
    {label: 'Plastics', value: 'plastic'},
    {label: 'Metal', value: 'metal'},
    {label: 'Paper', value: 'paper'},
    {label: 'Other', value: 'none'},
  ]);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data");
    console.log(barcodeData);
    console.log(data["category"])

    if (barcodeData == "Please Scan Barcode" || data["category"] == "" || (data["category"] == "none" && data["Object"] == "")) {
      alert("No, lol")
    } else {
      // SEND DATA TO DATABASE HERE
      alert("Thanks!")
      navigation.navigate("Home")
    }
  };

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
      setBarcodeData(data)
    }

    if(hasPermission === null){
        return(
            <View>
                <Text style={styles.text_style}>
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
        <View style = {styles.barcode_subcontainer}>
          <View style={styles.barcode_box}>
          <BarCodeScanner 
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.barcode_style}
            />      
          </View>
          <Text style={styles.text_style}>{barcodeData}</Text>
        </View>
        
        <View style={styles.top}>
          
        </View>
        <View style={styles.middle}>

          <Text style={styles.text_style}>Category</Text>
          <Controller
            name="category"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropdownCategory}>
                <DropDownPicker
                  style={styles.dropdown}
                  open={categoryOpen}
                  value={categoryValue} //companyValue
                  items={category}
                  setOpen={setCategoryOpen}
                  setValue={setCategoryValue}
                  setItems={setCategory}
                  placeholder="Select Category"
                  placeholderStyle={styles.placeholderStyles}
                  loading={loading}
                  activityIndicatorColor="#5188E3"
                  searchable={true}
                  dropDownDirection="TOP"
                  searchPlaceholder="Search your category here..."
                  //onOpen={onCategoryOpen}
                  onChangeValue={onChange}
                  zIndex={100}
                  zIndexInverse={3000}
                />
              </View>
            )}
          />
        </View>

        <Text style = {styles.text_style}>Other</Text>

        <View style={styles.middle}>
          <Controller
          name="Other"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              selectionColor={"#5188E3"}
              onChangeText={onChange}
              value={value}
              //zIndex={3000}
              //zIndexInverse={150}
            />
            )}
          />
        </View>
        <View style = {styles.button_view}>
          <Ripple style = {styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={textButtons.normal}>Submit</Text>
          </Ripple>
        </View>
          
      </View>
  )

}

const textButtons = StyleSheet.create({
  normal: {
    fontSize: 30,
    color: "#fff",
    textAlign:'center',
    fontFamily: 'Jost_500Medium'
  },
})

const styles = StyleSheet.create({
  text_style:     {fontFamily: 'Jost_500Medium', marginBottom: 7, marginStart: 10},
  container:      {flex: 1, backgroundColor: '#fff', justifyContent: 'spaced-evenly', alignItems: 'stretch'},
  top:            {flex: 0.1},
  middle:         {flex: 0.3, alignItems: 'stretch'},
  barcode_subcontainer: {alignItems: 'center'},
  barcode_style:  {height:400, width:400},
  barcode_box:    {alignItems:'center',
                   justifyContent:'center',
                   height: 300,
                   width: 300,
                   overflow: 'hidden',
                   borderRadius: 30,
                   backgroundColor:'tomato',
                   margin: 20,
                  },
  input:         {flex: 1,
                  borderStyle: "solid",
                  borderColor: "#B7B7B7",
                  borderRadius: 7,
                  borderWidth: 1,
                  fontSize: 15,
                  height: 50,
                  marginHorizontal: 10,
                  paddingStart: 10,
                  marginBottom: 15,
                  zIndex: 200,
                  zIndexInverse: 2000,
                },
  dropdownCategory: {
                  marginHorizontal: 10,
                  marginBottom: 15,
                },
  placeholderStyles: {
                  color: "grey",
                },
  dropdown: {borderColor: "#B7B7B7",
             height: 50,
             },
  button_view: {flex: 0.5,

  },          
  button: {
              flex: 0.8,
              margin: 20,
              backgroundColor: "#00CC66",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              justifyContent: 'center', //Centered horizontally
              alignItems: 'center', //Centered vertically
            }
})

export default Upload;
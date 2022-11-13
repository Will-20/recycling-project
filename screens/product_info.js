import React, {useState, useEffect} from 'react';
import { SafeAreaView, FlatList, StyleSheet, Pressable, Image, Dimensions, Alert } from 'react-native';
import { Button, Text, View, } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import {getFirestore, collection, getDoc, doc } from 'firebase/firestore/lite';
import {db} from '../firebase/firebase-config';
import Ripple from 'react-native-material-ripple';

const ProductInfo = ({route, navigation}) => {

  const [carbon, setCarbon] = useState('');
  const [prodName, setProdName] = useState('');
  const [recycleable, setRecycleable] = useState('No');
  const [img, setImg] = useState('');
  const [bin, setBin] = useState(3);
  const [disposalText, setDisposalText] = useState('Specialized Disposal');
  const [binDescription, setBinDescription] = useState('Error');

  // 0 - recyclable, 1 - food waste, 2 - black bin, 3 - specialized

  const [dataGraph, setDataGraph] = useState({
    'labels': ["","1 HOUR OF TV", "Product"],
  'datasets': [
    {
      'data': [
      0,
      70,
      70
      ]
    }]
  });
  

  const GetBarcodeData = async (barcodeID) => {
    console.log(barcodeID);
    const docRef = doc(db, "item_info", barcodeID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {  
      const data = docSnap.data();
      setProdName(data['prod_name']);
      setCarbon(data['Co2']);
      setImg(data['url']);
      if(data['recyclable']){
        setRecycleable("Yes");
      }

      setBin(data['bin'])

      setBinDescription(data['bin_description'])

      if (data['bin'] == 'blue') {
        setDisposalText('Normal Recyclable')
      } else if (data['bin'] == 'green') {
        setDisposalText('Food Waste Bin')
      } else if (data['bin'] == 'brown') {
        setDisposalText('General Waste')
      } else {
        setDisposalText('Specialised Disposal')
      }

      console.log(bin)

      setDataGraph({
        'labels': ["","1 HOUR OF TV", "Product"],
        'datasets': [
          {
            'data': [
            0,
            70,
            carbon*1000
            ]
          }]
         
      });
  
      console.log("data is :", data);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const { paramKey } = route.params;

  useEffect( () => {
    GetBarcodeData(paramKey);
}, []);


  function isRecyclable() {
    if (recycleable != 'No') {
      return {backgroundColor: "#00CC66"}
    } else {
      return {backgroundColor: "#CC6633"}
    }
  }

  function disposalColour() {
    if (bin == 'blue') {
      return {backgroundColor: "#0066FF"}
    } else if (bin == 'green') {
      return {backgroundColor: "#339933"}
    } else if (bin == 'brown') {
      return {backgroundColor: "#996633"}
    } else {
      return {backgroundColor: "#rff3333"}
    }
  }

  function explainBins() {
    if (bin == 'brown' || bin == 'green' || bin == 'blue') {
      Alert.alert('Acceptable Bins', binDescription)
    } else {
      alert("This is not recyclable, it will need to be taken to a specialised centre")
      navigation.navigate("Locations")
    }
  }

  return (
      <View style = {styles.container}>

          {
            //---------------------------------------------------------------------------------
          }

          <View style={styles.image_view_style}>
            <Image style = {styles.image_style} defaultSource={require('../assets/adaptive-icon.png')} source={{uri:img}}/>
          </View>
            
          <View style={styles.image_label_style}>
            <Text style = {[{fontSize: 40}, styles.all_text_style]}>{prodName}</Text>
          </View>

          {
            //---------------------------------------------------------------------------------
          }

          <View style={styles.is_recyclable_row_style}>
            <View style = {styles.is_recyclable_text_style}>
              <Text style={styles.all_text_style}>Is Recyclable</Text>
            </View>

            <View style = {[styles.is_recyclable_answer_style, isRecyclable()]}>
              <Text style={styles.all_text_style}>{recycleable}</Text>
            </View>
          </View>

          {
            //---------------------------------------------------------------------------------
          }

          <View style = {styles.graph_row_style}>
            <View>
              <LineChart 
                data={dataGraph}
                width={200} // from react-native
                height={200}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#00CC66",
                  backgroundGradientFrom: "#00CC66",
                  backgroundGradientTo: "#00CC66",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => 'rgba(255, 255, 255, 1)',
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>

            

            <View style = {styles.information_style}>
              <Text style={styles.all_text_style}>Example</Text>
            </View>
          </View>
          
          {
            //---------------------------------------------------------------------------------
          }

          <Ripple style = {[styles.disposal_text_style, disposalColour()]} onPress={()=> explainBins()}>
            <Text style={styles.all_text_style}>{disposalText}</Text>
          </Ripple>

      </View>
  )

}

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const styles = StyleSheet.create({
  container:                 {flex: 1,backgroundColor: '#fff',alignItems: 'center', justifyContent: 'spaced-between'},
  image_view_style:          {flex: 0.5, borderWidth: 1, margin: 5, overflow: 'hidden', borderRadius: 20, justifyContent: 'center'},
  image_style:               {height: 250, width: 250, overflow: 'hidden'},
  image_label_style:         {fontFamily: 'Jost_500Medium',flex: 0.17, justifyContent: 'space-around', alignItems: 'center', margin: 5, width: Dimensions.get("window").width / 1.3, borderRadius: 5, backgroundColor: '#D0FFE5'},
  is_recyclable_row_style:   {flex: 0.1, borderWidth: 1, justifyContent: 'space-around', flexDirection: 'row', margin: 5, borderRadius: 10, overflow:'hidden'},
  is_recyclable_text_style:  {fontFamily: 'Jost_500Medium', flex: 0.5, justifyContent: 'space-around', alignItems: 'center'},
  is_recyclable_answer_style:{flex: 0.3, borderLeftWidth: 1, justifyContent: 'space-around', alignItems: 'center', overflow:'hidden'},
  graph_row_style:           {justifyContent: 'center', flexDirection: 'row', margin: 5},
  information_style:         {fontFamily: 'Jost_500Medium',flex: 0.5, borderWidth: 1, borderRadius: 10, padding: 30, alignItems: 'center', justifyContent: 'space-evenly', margin: 5},
  disposal_text_style:       {fontFamily: 'Jost_500Medium',flex: 0.05, borderWidth: 1, borderRadius: 10, padding: 30, alignItems: 'center', justifyContent: 'space-evenly', margin: 5, width: 300},
  all_text_style:            {fontFamily: 'Jost_500Medium'}
})


export default ProductInfo;



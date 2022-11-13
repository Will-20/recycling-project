import React, {useState, useEffect} from 'react';
import { SafeAreaView, FlatList, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { Button, Text, View, } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";



const ProductInfo = ({route, navigation}) => {

  const GetBarcodeData = async () => {
    const docRef = doc(db, "item_info", "5449000214607" );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {  
      const  data = docSnap.data();
      console.log("data is :", data);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const { paramKey } = route.params;

  useEffect( () => {alert(paramKey)}, [] );

  return (
      <View style = {styles.container}>
          <View style={{flex: 0.4, borderWidth: 1,}}>
            <Image style = {styles.image_style} source={require('../assets/adaptive-icon.png')}/>
          </View>
            
          <View style={{flex: 0.1, borderWidth: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style = {{fontSize: 30}}>Coke Can</Text>
          </View>

          <View style={{justifyContent: 'space-around', flex: 0.1, flexDirection: 'row', borderWidth: 1}}>

            <View style = {{flex: 0.5, borderWidth: 1, justifyContent: 'space-around', alignItems: 'center'}}>
              <Text >Is Recyclable</Text>
            </View>
            <View style = {{flex: 0.3, borderWidth: 1, justifyContent: 'space-around', alignItems: 'center'}}>
              <Text>Yes</Text>
            </View>

           
    
            
          </View>

          <View style = {{justifyContent: 'space-around', flexDirection: 'row'}}>
            <View>
              <LineChart style = {{flex: 0.5}}
                data={{
                  labels: ["","1 HOUR OF TV", "Product"],
                  datasets: [
                    {
                      data: [
                      0,
                      100,
                      150
                      ]
                    }
                  ]
                }}
                width={Dimensions.get("window").width / 2.4} // from react-native
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
            <View style = {{flex: 0.5, padding: 40, alignItems: 'center', justifyContent: 'space-evenly'}}>
              <Text>Example</Text>
            </View>
          </View>
          
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'spaced-between',
  },
  image_style:{
    height: 250,
    width: 250
  },
  image_label_style:{},
  is_recyclable_row_style:{},
  graph_row_style:{},
  information_style:{}
})


export default ProductInfo;



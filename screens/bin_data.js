import React from 'react';
import { Button, Text, View, StyleSheet} from 'react-native';


const BinInformation = () => {
    return (
        <View>
            <Text style={styles.text_style}>Information Page</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    text_style:  {fontFamily: 'Jost_500Medium', },
})

export default BinInformation;
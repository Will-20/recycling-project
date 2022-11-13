import React, { Component } from 'react'
import {Text} from 'react-native'
import {
  useFonts,
  Jost_500Medium,
  Jost_500Medium_Italic
} from "@expo-google-fonts/jost";


class MyAppHeaderText extends Component {
  render() {
    return (
      <MyAppText>
        <Text style={{ fontFamily: 'Jost_500Medium', fontSize: 20 }}>
          {this.props.children}
        </Text>
      </MyAppText>
    );
  }
}

export default MyAppHeaderText;
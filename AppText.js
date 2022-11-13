import React, { Component } from 'react'
import { Text } from "react-native";

export default class AppText extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <Text style={{fontFamily: 'Jost_500Medium'}}>
        {this.props.children}
      </Text>
    );

  }
}
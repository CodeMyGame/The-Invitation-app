import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet,View,Text, Animated, TouchableOpacity,Alert,Image,ImageBackground} from 'react-native';
import Dimensions from 'Dimensions';
import { Constants } from 'expo';
import { Card, ListItem, Button, Icon,SearchBar,Avatar,Input  } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GridView from 'react-native-super-grid';
import Display from 'react-native-display';
import back from '../assets/images/splash_back.jpg';
import Login from './Login';
import { Font } from 'expo';
export default class Profile extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        splash : 1
 }

}
  static navigationOptions = {
    header: null,
  };

   componentDidMount(){
       this.timeoutHandle = setTimeout(()=>{
            this.setState({ splash:0})
       }, 2000);
  }

  componentWillUnmount(){
       clearTimeout(this.timeoutHandle);
  }

  render() {
    if(this.state.splash==0){
      return <Login/>
    }
    return(
        <ImageBackground source={back} style={{flex:1}}>

        </ImageBackground>
    )
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

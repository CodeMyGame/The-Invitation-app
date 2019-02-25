import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet,View,Text, Animated, TouchableOpacity,Alert,Image,ImageBackground,AsyncStorage} from 'react-native';
import Dimensions from 'Dimensions';
import { Constants } from 'expo';
import { Card, ListItem, Button, Icon,SearchBar,Avatar,Input  } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GridView from 'react-native-super-grid';
import Display from 'react-native-display';
import { LinearGradient } from 'expo';
import heart from '../assets/images/heart.png';
import sample from '../assets/images/2.jpg';
import firebase from 'firebase';
import back from '../assets/images/homeback.png';
import cover from '../assets/images/2.jpg';
import { Actions } from 'react-native-router-flux';

export default class Profile extends React.Component {
  constructor(props){
      super(props);
      this.state = {
             name: '',
             mobile:'',
             location:'',
             editable:false,
             icon:'edit',
             type:'entypo'
       };
}
  componentWillMount(){
    AsyncStorage.getItem('session_id').then((result) => {
      this.setState({
        mobile:result
      })
    });
    AsyncStorage.getItem('session_name').then((result) => {
      this.setState({
        name:result
      })
    });
}

  static navigationOptions = {
    header: null,
  };

  editClick(){
    if(this.state.icon==='edit'){
      this.setState({
        editable:true,
        icon:'done',
        type:'Fontawesome'
      })
    }else{
      this.setState({
        editable:false,
        icon:'edit',
        type:'entypo'
      })
    }

  }
onLogoutClick(){
      AsyncStorage.setItem('isLogin', 'no');
      Actions.reset('login');
      AsyncStorage.setItem('wedding_side', 'no');
}
  render() {
    // if(this.state.invitation_data==null){
    //   return <Text>No data</Text>
    // }
    return(
      <ImageBackground source={back} style={{flex:1}}>
      <Image
         style={{width: 100, height: 100,position:'absolute',zIndex:100,marginTop:DEVICE_HEIGHT/2-120,marginLeft:50,borderRadius:40}}
         source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
       />
       <TouchableOpacity
            onPress={this.editClick.bind(this)}
           style={{position:'absolute',zIndex:100,marginTop:DEVICE_HEIGHT/2-50,marginLeft:DEVICE_WIDTH-70}}
       >
       <Icon
           name={this.state.icon}
           type={this.state.type}
         />
       </TouchableOpacity>
      <ImageBackground source={cover} style={{flex:2}}>

      </ImageBackground>
      <View style={{flex:2,alignItems:'center',backgroundColor:'#fff',borderTopLeftRadius:50,borderTopRightRadius:50,overflow:'hidden',marginTop:-100}}>
      <Input
        inputStyle={{marginTop:60}}
        editable={this.state.editable}
        value={this.state.name}
        onChangeText={(text) => this.setState({name:text})}

      />
      <Input
        inputStyle={{marginTop:10}}
        value={this.state.mobile}
        editable={this.state.editable}
        onChangeText={(text) => this.setState({mobile:text})}
      />
      <Input
        inputStyle={{marginTop:10}}
        value={this.state.location}
        editable={this.state.editable}
        onChangeText={(text) => this.setState({location:text})}
      />
      <Button
       onPress={this.onLogoutClick.bind(this)}
      buttonStyle={{width:150+DEVICE_WIDTH/4,marginTop:30}}
          title='Logout'
         ViewComponent={require('expo').LinearGradient}
         linearGradientProps={{
           colors: ['#ED213A', '#93291E'],
           start: [1, 0],
           end: [0.2, 0],
         }}
      />
      </View>
      </ImageBackground>


    );

  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

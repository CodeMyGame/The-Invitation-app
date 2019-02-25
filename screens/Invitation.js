import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet,View,Text, Animated, TouchableOpacity,Alert,Image,ImageBackground} from 'react-native';
import Dimensions from 'Dimensions';
import { Constants } from 'expo';
import { Card, ListItem, Button, Icon,SearchBar,Avatar  } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GridView from 'react-native-super-grid';
import Display from 'react-native-display';
import { LinearGradient } from 'expo';
import heart from '../assets/images/heart.png';
import sample from '../assets/images/2.jpg';
import firebase from 'firebase';
import back from '../assets/images/homeback.png';
import { Header  } from "react-navigation";
import { Platform } from 'react-native';
import dpback from '../assets/images/dpback.png';

const GradientHeader = props => (
<View style={{ backgroundColor: '#eee' }}>
    <LinearGradient
       colors={['#6f29b0', '#952290']}
       start={{ x: 0, y: 1 }}
         end={{ x: 1, y: 1 }}
      style={{ height: Platform.OS == "ios" ? Header.HEIGHT : Header.HEIGHT+25 }}
    >
      <Header {...props} />
    </LinearGradient>
  </View>
)

export default class Invitation extends React.Component {
  constructor(props){
      super(props);

      this.state = {
             invitation_data: {}
           };

   }
     componentWillMount(){
       let event_id = this.props.event_id;
       let event_type = this.props.event_type;
       firebase.database().ref('/'+event_type+'/'+event_id+'/invitation').once('value').then(function(snapshot) {
        data  = snapshot.val();
        this.setState({
          invitation_data:data
        })
       }.bind(this));
     }
   static navigationOptions = {
      title: 'Invitation',
      headerTintColor: '#fff',
      header: props => <GradientHeader {...props} />,
      headerStyle: {
         backgroundColor: 'transparent',
       },
   };
  render() {
    if(this.state.invitation_data==null){
      return <Text>No data</Text>
    }
    return(
      <ImageBackground source={back} style={{flex:1}}>
      <Image source={heart} style={{zIndex:100,marginLeft:(DEVICE_WIDTH/2)-28,position:'absolute',marginTop:(DEVICE_HEIGHT/6)-20}}/>
 <View style={{flex:2,flexDirection:'row'}}>
   <View style={{flex:1,alignItems:'center',padding:20}}>
   <ImageBackground source={dpback}  style={{width:(DEVICE_WIDTH/2)-30,height:(DEVICE_WIDTH/2)-50,alignItems:'center',justifyContent:'center'}}>
   <Avatar
       size={DEVICE_WIDTH/5}
       containerStyle={{marginTop:-20}}
       rounded
       source={{uri:this.props.boy_pic}}
       onPress={() => console.log("Works!")}
       activeOpacity={0.7}
   />
   </ImageBackground>
           <Text style={{fontSize:30,marginTop:DEVICE_HEIGHT/20,color:'#6f29b0'}}>{this.props.boy_name}</Text>
   </View>
   <View style={{flex:1,alignItems:'center',padding:20}}>
     <Text style={{fontSize:30,marginBottom:DEVICE_HEIGHT/15,color:'#952290'}}>{this.props.girl_name}</Text>
     <ImageBackground source={dpback} style={{width:(DEVICE_WIDTH/2)-30,height:(DEVICE_WIDTH/2)-50,alignItems:'center',justifyContent:'center'}}>

     <Avatar
         size={DEVICE_WIDTH/5}
         containerStyle={{marginTop:-20}}
         rounded
         source={{uri:this.props.girl_pic}}
         onPress={() => console.log("Works!")}
         activeOpacity={0.7}
     />
   </ImageBackground>
   </View>
 </View>
      <View style={{flex:3}}>
      <ScrollView>
      <Text style={{margin:20,fontSize:18,textAlign:'center',color:'#97969a'}}>{this.state.invitation_data.first_text}</Text>
      <Text style={{margin:20,fontSize:18,textAlign:'center',color:'#97969a'}}>{this.state.invitation_data.second_text}</Text>
      <Text style={{margin:20,fontSize:18,textAlign:'center',color:'#97969a'}}>{this.state.invitation_data.third_text}</Text>
      </ScrollView>
      </View>
      </ImageBackground>


    );

  }
}
const styles = StyleSheet.create({
  tabBar: {
   flexDirection: 'row',
   paddingTop: 0,
 },
 tabItem: {
   flex: 1,
   alignItems: 'center',
   padding: 16,
 },

});
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

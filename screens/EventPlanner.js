import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet,View,Text, Animated, TouchableOpacity,Alert,Image,ImageBackground} from 'react-native';
import Dimensions from 'Dimensions';
import { Constants } from 'expo';
import { Card, ListItem, Button, Icon,SearchBar,Avatar,SocialIcon   } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GridView from 'react-native-super-grid';
import Display from 'react-native-display';
import { LinearGradient } from 'expo';
import heart from '../assets/images/heart.png';
import firebase from 'firebase';
import back from '../assets/images/homeback.png';
import { Platform } from 'react-native';
import { Header  } from "react-navigation";

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

export default class EventPlanner extends React.Component {
  constructor(props){
      super(props);

      this.state = {
             planner_data: {}
           };

   }
componentWillMount(){
  let event_id = this.props.event_id;
  let event_type = this.props.event_type;
  firebase.database().ref('/'+event_type+'/'+event_id+'/eventPlanner').once('value').then(function(snapshot) {
   data  = snapshot.val();
   this.setState({
     planner_data:data
   })
  }.bind(this));
}
  static navigationOptions = {
    title: 'Event Planner',
    headerTintColor: '#fff',
    header: props => <GradientHeader {...props} />,
    headerStyle: {
       backgroundColor: 'transparent',
     },
  };

  render() {
    if(this.state.planner_data==null){
      return <Text>No data</Text>
    }
    return(
      <ImageBackground source={back} style={{flex:1}}>
      <LinearGradient
                  colors={['#6f29b0', '#952290']}
                  style={{flex:1, alignItems: 'center' ,justifyContent:'center',overflow:'hidden'}}
                  start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                  >
                  <View style={{ alignItems: 'center' ,justifyContent:'center'}}>
                  <Avatar
                      size="xlarge"
                      rounded
                      source={{uri:this.state.planner_data.pic}}
                      activeOpacity={0.7}
                  />
                  <Text style={{fontSize:30,color:'#fff'}}>{this.state.planner_data.name}</Text>
                  <View style={{flexDirection:'row'}}>
                  <SocialIcon
                      type='twitter'
                    />
                    <SocialIcon
                    type='facebook'
                    />
                    <SocialIcon
                    type='instagram'
                    />
                    <SocialIcon
                    type='whatsapp'
                    light
                    />

                  </View>
</View>
      </LinearGradient>

      <View style={{flex:1,padding:30,}}>
        <Text style={{fontSize:30,color:'#6f29b0'}}>About us </Text>
        <Text style={{marginTop:20}}>{this.state.planner_data.about}</Text>
        <Text style={{fontSize:30,color:'#6f29b0',marginTop:20}}>Contact us</Text>
        <Text style={{marginTop:20}}>{this.state.planner_data.contactus}</Text>
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

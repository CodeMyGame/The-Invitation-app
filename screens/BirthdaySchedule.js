import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet,View,Text, Animated, TouchableOpacity,Alert,Image,ImageBackground} from 'react-native';
import Dimensions from 'Dimensions';
import { Constants } from 'expo';
import { Card, ListItem, Button, Icon,SearchBar,Avatar } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GridView from 'react-native-super-grid';
import Display from 'react-native-display';
import { LinearGradient } from 'expo';
import heart from '../assets/images/heart.png';
import sample from '../assets/images/2.jpg';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Header  } from "react-navigation";
import { Platform } from 'react-native';
import back from '../assets/images/homeback.png';
import bday from '../assets/images/bday.jpg';
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

export default class BirthdaySchedule extends React.Component {
  constructor(props){
      super(props);

      this.state = {
            index: 0,
            routes: [
              { key: 'first', title: 'Menu' },
              { key: 'second', title: 'Feeds' },
            ],
             selectedIndex:0,
             enable:true,
             enableVideo:false,
             gallary: [],
             wedding_data: {}
           };

   }
componentWillMount(){
      let event_id = this.props.event_id;
  firebase.database().ref('/wedding/'+event_id).once('value').then(function(snapshot) {
   data  = snapshot.val();
   this.setState({
     wedding_data:data
   })
 }.bind(this));
}
   _handleIndexChange = index => this.setState({ index });

  static navigationOptions = {
     title: 'Birthday schedule',
     headerTintColor: '#fff',
     header: props => <GradientHeader {...props} />,
     headerStyle: {
        backgroundColor: 'transparent',
      },
  };

  handleIndexChange = (index) => {
    let isVisible;
    let isVisibleVideo;
    if(index===0){
      isVisibleVideo = false;
      isVisible = true;
    }else{
      isVisible = false
      isVisibleVideo = true;
    }
     this.setState({
       ...this.state,
       selectedIndex: index,
       enable:isVisible,
       enableVideo:isVisibleVideo
     });

   }
   invitationClick(){
     let boy_name = this.state.wedding_data.boy_name;
     let girl_name = this.state.wedding_data.girl_name;
     let boy_pic = this.state.wedding_data.boy_pic;
     let girl_pic = this.state.wedding_data.girl_pic;
     Actions.invitation(
       {
         event_id:this.props.event_id,
         boy_name:boy_name,
         girl_name:girl_name,
         event_type:'wedding',
         boy_pic:boy_pic,
         girl_pic:girl_pic
       }
     );
   }
   keyMembersClick(){
     Actions.keyMembers(
       {
         event_id:this.props.event_id,
         event_type:'wedding',
       }
     );
   }
   gallaryClick(){
     Actions.gallary(
       {
         event_id:this.props.event_id,
         event_type:'wedding',
       }
     );
   }
   scheduleClick(){
     Actions.schedule(
       {
         event_id:this.props.event_id,
         event_type:'wedding',
       }
     );
   }
   eventPlannerClick(){
     Actions.eventPlanner(
       {
         event_id:this.props.event_id,
         event_type:'wedding',
       }
     );
   }
   programsClick(){
     Actions.programs(
       {
         event_id:this.props.event_id,
         event_type:'wedding',
       }
     );
   }
  render() {
    if(this.state.wedding_data==null){
      return <Text>It seems weeding completed...</Text>
    }
    return(
      <ImageBackground source={back} style={{flex:1,}}>
        <ImageBackground source={bday} style={{flex:2,}}/>
      <View style={{flex:3}}>
      <SegmentedControlTab
                 activeTabStyle = {{backgroundColor:'#6f29b0',}}
                 tabStyle={{borderColor:'#6f29b0'}}
                 tabsContainerStyle={{marginLeft:40+DEVICE_WIDTH/6,marginRight:40+DEVICE_WIDTH/6,borderColor:'#6f29b0'}}
                  values={['Menu', 'Feeds']}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={this.handleIndexChange}
                  />
                  <Display enable={this.state.enable}
                  enterDuration={500}
                   exitDuration={250}
                   exit="fadeOutDown"
                   enter="fadeInUp"
                  >
                  <ScrollView style={{marginBottom:30}}>
                  <View>
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress = {this.invitationClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                            <Image source={sample} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                          <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                            <Text style={{fontSize:25,color:'white'}}>Invitation</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.gallaryClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                          <Image source={sample} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                          <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                            <Text style={{fontSize:25,color:'white'}}>Gallary</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity  onPress = {this.scheduleClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                          <Image source={sample} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                          <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                            <Text style={{fontSize:25,color:'white'}}>Schedule</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.keyMembersClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                          <Image source={sample} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                          <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                            <Text style={{fontSize:25,color:'white'}}>Key Members</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.eventPlannerClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                          <Image source={sample} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                          <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                            <Text style={{fontSize:25,color:'white'}}>Event planner</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.programsClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                          <Image source={sample} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                          <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                            <Text style={{fontSize:25,color:'white'}}>Programs</Text>
                          </View>
                        </TouchableOpacity>


                      </View>
                  </View>
                  </ScrollView>
                </Display>
                 <Display enable={this.state.enableVideo}
                      enterDuration={500}
                      exitDuration={250}
                      exit="fadeOutDown"
                      enter="fadeInUp"
                  >

                  </Display>
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

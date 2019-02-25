import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet,View,TouchableOpacity,Text,Dimensions,ImageBackground } from 'react-native';
import { Button,Avatar,Icon } from 'react-native-elements';
import Popover from 'react-native-popover-view';
import { LinearGradient } from 'expo';
import Dash from 'react-native-dash';
import firebase from 'firebase';
import back from '../assets/images/homeback.png';
import { Header  } from "react-navigation";
import { Platform } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
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
export default class Programs extends React.Component {
  constructor(props){
      super(props);

      this.state = {
           selectedIndex:0,
           enable:true,
           enableVideo:false,
           isVisible: false,
           programs:[],
           venue:'venue',
           time:'time',
           circle_radius:34
     };


   }
      componentWillMount(){
        let event_id = this.props.event_id;
        let event_type = this.props.event_type;
        firebase.database().ref('/'+event_type+'/'+event_id+'/programs').once('value').then(function(snapshot) {
            data  = snapshot.val();
            if(data!=null){
              this.setState({
                programs:data
              });
              if(data.length<=5){
                this.setState({
                  circle_radius:60
                });
              }
              if(data.length>5 && data.length<=11){
                  circle_radius:40
              }
              if(data.length>11){
                  circle_radius:34
              }
            }
        }.bind(this));

      }
   static navigationOptions = {
      title: 'Programs',
      headerTintColor: '#fff',
      header: props => <GradientHeader {...props} />,
      headerStyle: {
         backgroundColor: 'transparent',
       },
   };
  showPopover(title,date,url,venue,time) {
    this.setState({
      isVisible: true,
      title:title,
      date:date,
      pic:url,
      venue:venue,
      time:time
    });
  }

  closePopover() {
    this.setState({
      isVisible: false
    });
  }
  render() {
    return(
      <ImageBackground source={back} style={{flex: 1}}>

      <View style={{flex: 1, flexDirection: 'row'}}>
      <Popover
          isVisible={this.state.isVisible}
          popoverStyle={{borderRadius:20}}
          fromView={this.touchable}
          onClose={() => this.closePopover()}>
          <View  style={{margin:50,width:deviceWidth/2}}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:25,marginBottom:20}}>{this.state.date}</Text>
              <Avatar
                  size={deviceWidth/4}
                  rounded
                  source={{uri:this.state.pic}}
                  activeOpacity={0.7}
              />
              <Text style={{marginTop:20,fontSize:23,color:'#e20e50'}}>{this.state.title}</Text>
            </View>
            <View style={{flexDirection: 'row',marginTop:20}}>
              <Icon
                  name='location-pin'
                  type='entypo'
                />
              <Text style={{marginLeft:10}}>{this.state.venue}</Text>
           </View>
           <View style={{flexDirection: 'row',marginTop:20}}>
             <Icon
                 name='clock'
                 type='entypo'
               />
             <Text style={{marginLeft:10}}>{this.state.time}</Text>
          </View>
          </View>

        </Popover>
         <View style={{flex:1,flexDirection: 'column',height: '100%'}}>
         {
           this.state.programs.map((u, i) => {
              var a = this.touchable;
             return (
               <View key={i} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Dash dashColor='#6f29b0' style={{position:'absolute',width:2, height:'100%', flexDirection:'column',borderRadius: 100, overflow: 'hidden'}}/>
                  <TouchableOpacity onPress={() => this.showPopover(u.title,u.date,u.pic,u.venue,u.time)}
                  ref={ref => a = ref}
                    style={{borderColor:'#6f29b0',borderWidth:2,justifyContent:'center',alignItems:'center',width:this.state.circle_radius,height:this.state.circle_radius,borderRadius:40,backgroundColor:'#fff'}}>
                    <Text style={{fontWeight:'bold',fontSize:15,color:'#6f29b0'}}>{i+1}</Text>
                  </TouchableOpacity>
               </View>
             );
           })
         }
         </View>
         <View style={{flex:2, height: '100%'}}>
         {
           this.state.programs.map((u, i) => {
             return (
                <View key={i} style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize:20,color:'#6f29b0'}}>{u.title}</Text>
                </View>
             );
           })
         }
         </View>
         <View style={{flex:2, height: '100%'}} />
       </View>
       </ImageBackground>
    );
  }
}

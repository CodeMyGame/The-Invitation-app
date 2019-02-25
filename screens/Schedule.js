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
export default class Schedule extends React.Component {
  constructor(props){
      super(props);

      this.state = {
           selectedIndex:0,
           enable:true,
           enableVideo:false,
           isVisible: false,
           schedule:[],
           title:'title',
           date:'date',
           pic:'url',
           food:[],
           touch:[],

     };


   }
     componentWillMount(){
       let event_id = this.props.event_id;
       let event_type = this.props.event_type;

       firebase.database().ref('/'+event_type+'/'+event_id+'/schedule').once('value').then(function(snapshot) {
           data  = snapshot.val();
           this.setState({
             schedule:data
           })
       }.bind(this));


     }
   static navigationOptions = {
      title: 'Schedule',
      headerTintColor: '#fff',
      header: props => <GradientHeader {...props} />,
      headerStyle: {
         backgroundColor: 'transparent',
       },
   };
  showPopover(title,date,url,food) {
    this.setState({
      isVisible: true,
      title:title,
      date:date,
      pic:url,
      food:food
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
          fromView={this.touchable}
          popoverStyle={{borderRadius:20}}
          onClose={() => this.closePopover()}>
          <View style={{margin:50,width:deviceWidth/2,alignItems:'center'}}>
            <Avatar
                size={deviceWidth/4}
                rounded
                source={{uri:this.state.pic}}
                activeOpacity={0.7}
            />
            <Text style={{marginTop:20,fontSize:28,color:'#e20e50'}}>{this.state.title}</Text>
            <ScrollView style={{height:deviceWidth/2}}
             >
            {
              this.state.food.map((u, i) => {
                return (
                  <LinearGradient
                          key={i}
                         colors={['#ff0576', '#ff4008']}
                         style={{marginTop:20,width:deviceWidth/2,height:130,backgroundColor:'#ffa',padding:10,borderRadius:20}}>
                      <Text style={{fontSize:25,color:'#fff'}} >{u.type}</Text>
                      <View style={{margin:10}}>
                      <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        <Icon
                            name='location-pin'
                            type='entypo'
                            color='#fff'
                          />
                        <Text style={{color:'#fff',marginLeft:10}}>{u.venue}</Text>
                     </View>
                     <View style={{flexDirection: 'row',alignItems: 'center'}}>
                       <Icon
                           name='time-slot'
                           type='entypo'
                           color='#fff'
                         />
                       <Text style={{color:'#fff',marginLeft:10}}>{u.time}</Text>
                    </View>
                    </View>
                  </LinearGradient>
                );
              })
            }

            </ScrollView>
          </View>
        </Popover>
         <View style={{flex:1,flexDirection: 'column',height: '100%'}}>
         {
           this.state.schedule.map((u, i) => {
             var a = this.touchable;
             return (

               <View key={i} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Dash dashColor='#6f29b0' style={{position:'absolute',width:2, height:'100%', flexDirection:'column',borderRadius: 100, overflow: 'hidden'}}/>
                  <TouchableOpacity onPress={() => this.showPopover(u.title,u.date,u.pic,u.food)}
                  ref={ref => a = ref}
                    style={{borderColor:'#6f29b0',borderWidth:2,justifyContent:'center',alignItems:'center',width:60,height:60,borderRadius:40,backgroundColor:'#fff'}}>
                    <Text style={{fontWeight:'bold',fontSize:25,color:'#6f29b0'}}>{i+1}</Text>
                  </TouchableOpacity>
               </View>
             );
           })
         }
         </View>
         <View style={{flex:2, height: '100%'}}>
         {
           this.state.schedule.map((u, i) => {
             return (
                <View key={i} style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize:25,color:'#6f29b0'}}>{u.date}</Text>
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

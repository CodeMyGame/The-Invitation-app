import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet,View,Text, Animated, TouchableOpacity,Alert,Image,ImageBackground,TextInput,
KeyboardAvoidingView,ActivityIndicator,AsyncStorage} from 'react-native';
import Dimensions from 'Dimensions';
import { Constants } from 'expo';
import { Card, ListItem, Button, Icon,SearchBar,Avatar } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GridView from 'react-native-super-grid';
import Display from 'react-native-display';
import { LinearGradient,Svg} from 'expo';
import heart from '../assets/images/heart.png';
import sample from '../assets/images/2.jpg';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Header  } from "react-navigation";
import { Platform } from 'react-native';
import back from '../assets/images/homeback.png';
import dpback from '../assets/images/dpback.png';
import gallary from '../assets/images/gallary.jpg';
import invitation from '../assets/images/invitation.jpg';
import keyMembers from '../assets/images/keyMembers.jpg';
import schedule from '../assets/images/schedule.jpg';
import programs from '../assets/images/programs.jpg';
import eventPlanner from '../assets/images/event_planner.jpg';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import send from '../assets/images/send.png';
import DropdownAlert from 'react-native-dropdownalert';
import Popover from 'react-native-popover-view';

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

export default class WeddingSchedule extends React.Component {

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
             wedding_data: {},
             messages: [],
             message:'',
             isData:false,
             session_id:'',
             session_name:'',
             didMount:false,
             isVisible: false,
             isVisible2: false,
             scrollViewMarginBottom:0
           };

   }
   showPopover() {
    this.setState({isVisible: true});
  }

  closePopover() {
    this.setState({isVisible: false});
  }
  showPopover2() {
   this.setState({isVisible2: true});
 }

 closePopover2() {
   this.setState({isVisible2: false});
 }
   componentWillMount(){
       let event_id = this.props.event_id;
       AsyncStorage.getItem('session_id').then((result) => {
         if (result !== null ) {
           this.setState({
             session_id:result
          })
         }else{
            AsyncStorage.setItem('isLogin', 'no');
            Actions.reset("login");
         }
       });
       AsyncStorage.getItem('session_name').then((result) => {
         if (result !== null ) {
           this.setState({
             session_name:result
          })
         }else{
            AsyncStorage.setItem('isLogin', 'no');
            Actions.reset("login");
         }
       });
         firebase.database().ref('/wedding/'+event_id).on('value',(snapshot)=>{
          data  = snapshot.val();
          if(data!=null){
          this.setState({
            wedding_data:data,
            messages:data.messages,
            isData:true
         })

          if(this.dropdown!=null && data.messages[data.messages.length-1].id!==this.state.session_id){
             this.dropdown.alertWithType('success',  'Message from '+data.messages[data.messages.length-1].user.name, data.messages[data.messages.length-1].text);
          }
       }
      });
   }
   componentDidMount(){
     this.setState({
       didMount:true
     });

   }

  static navigationOptions = {
     title: 'Wedding schedule',
     headerTintColor: '#fff',
     header: props => <GradientHeader {...props} />,
     headerStyle: {
        backgroundColor: 'transparent',
      },
  };

  handleIndexChange = (index) => {
    let isVisible;
    let isVisibleVideo;
    let marginBottom;
    if(index===0){
      marginBottom=0;
      this.refs.scrollView.scrollTo(0);
      isVisibleVideo = false;
      isVisible = true;
    }else{
      marginBottom = 60;
      this.refs.scrollView.scrollToEnd({animated: true});
      isVisibleVideo = true;
      isVisible = false;
    }
     this.setState({
       ...this.state,
       scrollViewMarginBottom:marginBottom,
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
   onSendClick(){
      let message = this.state.message;
      if(message.length==0){
          this.dropdown.alertWithType('error', 'Error', 'Enter message');
        return;
      }
      let messages = this.state.messages;
      messages.push({
        id:this.state.session_id,
        messageType:'text',
        text:message,
        user:{
          name:this.state.session_name,
          pic:'url'
        }
      });
 this.refs.scrollView.scrollToEnd({animated: true});
   firebase.database().ref('/wedding/'+this.props.event_id+'/messages').set(messages, function(error) {
    if (error) {
      this.dropdown.alertWithType('error', 'Error', error);
    } else {
      this.setState({
        messages:messages,
        message:''
      })
    }
  }.bind(this));
   }
  render() {
    if(!this.state.isData){
      return (<ActivityIndicator size="large" color="#0000ff"/>);
    }

    return(
      <KeyboardAvoidingView  style={styles.container}
      behavior="padding">
      <Popover
          isVisible={this.state.isVisible}
          popoverStyle={{borderRadius:20}}
          fromView={this.touchable}
          onClose={() => this.closePopover()}>
          <View style={{margin:30,width:DEVICE_WIDTH/2,alignItems:'center'}}>
            <ScrollView>
            <Text style={{margin:10,fontSize:17,color:'#000'}}>{this.state.wedding_data.about_boy}</Text>
            </ScrollView>

          </View>
        </Popover>
        <Popover
            isVisible={this.state.isVisible2}
            popoverStyle={{borderRadius:20}}
            fromView={this.touchable2}
            onClose={() => this.closePopover2()}>
            <View style={{margin:30,width:DEVICE_WIDTH/2}}>
            <ScrollView>
            <Text style={{margin:10,fontSize:17,color:'#000'}}>{this.state.wedding_data.about_girl}</Text>
            </ScrollView>
            </View>
          </Popover>
        <ImageBackground source={back} style={{flex:1}}>
          <DropdownAlert zIndex={100}  ref={ref => this.dropdown = ref} />
          <ScrollView  ref="scrollView"
          style={{marginBottom:this.state.scrollViewMarginBottom}}
          >
             <Image source={heart} style={{zIndex:100,marginLeft:(DEVICE_WIDTH/2)-28,position:'absolute',marginTop:(DEVICE_HEIGHT/6)-20}}/>
        <View style={{flex:2,flexDirection:'row'}}>
          <View style={{flex:1,alignItems:'center',padding:20}}>
          <ImageBackground source={dpback}  style={{width:(DEVICE_WIDTH/2)-30,height:(DEVICE_WIDTH/2)-50,alignItems:'center',justifyContent:'center'}}>
          <Avatar
              ref={ref => this.touchable = ref}
              size={DEVICE_WIDTH/5}
              containerStyle={{marginTop:-20}}
              rounded
              source={{uri:this.state.wedding_data.boy_pic}}
              onPress={() => this.showPopover()}
              activeOpacity={0.7}
          />
          </ImageBackground>
                  <Text style={{fontSize:30,marginTop:DEVICE_HEIGHT/20,color:'#6f29b0'}}>{this.state.wedding_data.boy_name}</Text>
          </View>
          <View style={{flex:1,alignItems:'center',padding:20}}>
            <Text style={{fontSize:30,marginBottom:DEVICE_HEIGHT/15,color:'#952290'}}>{this.state.wedding_data.girl_name}</Text>
            <ImageBackground source={dpback} style={{width:(DEVICE_WIDTH/2)-30,height:(DEVICE_WIDTH/2)-50,alignItems:'center',justifyContent:'center'}}>

            <Avatar
                ref={ref => this.touchable2 = ref}
                size={DEVICE_WIDTH/5}
                containerStyle={{marginTop:-20}}
                rounded
                source={{uri:this.state.wedding_data.girl_pic}}
                onPress={() => this.showPopover2()}
                activeOpacity={0.7}
            />
          </ImageBackground>
          </View>
        </View>
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
                    <View>
                        <View style={{flexDirection:'row'}}>
                          <TouchableOpacity onPress = {this.invitationClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                              <Image source={invitation} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                            <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                              <Text style={{fontSize:20,color:'white'}}>Invitation</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={this.programsClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                            <Image source={programs} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                            <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                              <Text style={{fontSize:20,color:'white'}}>Programs</Text>
                            </View>
                          </TouchableOpacity>

                        </View>
                        <View style={{flexDirection:'row'}}>
                          <TouchableOpacity  onPress = {this.scheduleClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                            <Image source={schedule} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                            <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                              <Text style={{fontSize:20,color:'white'}}>Schedule</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={this.keyMembersClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                            <Image source={keyMembers} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                            <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                              <Text style={{fontSize:20,color:'white'}}>Key Members</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row'}}>

                          <TouchableOpacity onPress = {this.gallaryClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                            <Image source={gallary} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                            <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                              <Text style={{fontSize:20,color:'white'}}>Gallary</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={this.eventPlannerClick.bind(this)} style={{flex:1,height:DEVICE_HEIGHT/3,margin:20}}>
                            <Image source={eventPlanner} style={{flex:4,width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                            <View style={{flex:1,backgroundColor:'#6f29b0',alignItems:'center',justifyContent:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                              <Text style={{fontSize:20,color:'white'}}>Event planner</Text>
                            </View>
                          </TouchableOpacity>

                        </View>
                    </View>

                  </Display>
                   <Display enable={this.state.enableVideo}
                        enterDuration={500}
                        exitDuration={250}
                        exit="fadeOutDown"
                        enter="fadeInUp"
                        style={{marginBottom:60}}
                      >
                        {
                          this.state.messages.map((u, i) => {
                            if(u.id==this.state.session_id){
                              return (
                                  //out
                                  <View key={i} style={[styles.item, styles.itemOut]}>
                                    <View style={[styles.balloon, {backgroundColor: '#6f29b0'}]}>
                                      <Text style={{paddingTop: 5, color: 'white'}}>{u.text}</Text>
                                      <View
                                      style={[
                                        styles.arrowContainer,
                                        styles.arrowRightContainer,
                                      ]}
                                    >
                                       <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
                                            <Svg.Path
                                                d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                                                fill="#6f29b0"
                                                x="0"
                                                y="0"
                                            />
                                        </Svg>
                                    </View>
                                    </View>
                                  </View>

                              );
                            }else{
                              return (
                                  //in
                                  <View style={[styles.item, styles.itemIn]}>
                                    <View style={[styles.balloon, {backgroundColor: '#b1b5bc'}]}>
                                      <Text style={{paddingTop: 5, color: 'white'}}>{u.user.name}:{u.text}</Text>
                                      <View
                                      style={[
                                        styles.arrowContainer,
                                        styles.arrowLeftContainer,
                                      ]}
                                    >

                                   <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5"  enable-background="new 32.485 17.5 15.515 17.5">
                                        <Svg.Path
                                            d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                                            fill="#b1b5bc"
                                            x="0"
                                            y="0"
                                        />
                                    </Svg>
                                      </View>
                                      </View>
                                  </View>
                              );
                            }

                          })
                        }

                    </Display>
        </View>

</ScrollView>
        <Display enable={this.state.enableVideo}
             enterDuration={500}
             exitDuration={250}
             exit="fadeOutDown"
             style={{flex:1,flexDirection:'row',position:'absolute',bottom:0}}
             enter="fadeInUp">

        <TextInput
        placeholder='Type a message'
        placeholderTextColor='#6f29b0'
        onChangeText={(text) => this.setState({
            message:text
        })}
        value={this.state.message}
        style={{paddingHorizontal:20,flex:1,height: 50,borderRadius:30,margin:10,borderWidth:1,borderColor:'#6f29b0'}}
      />
        <TouchableOpacity onPress={this.onSendClick.bind(this)} style={{alignItems:'center',justifyContent:'center',height: 50,width:50, backgroundColor:'#6f29b0',borderRadius:50,margin:10}}>
        <Icon
           name='send'
           type='materialIcons'
           color='white'
         />
        </TouchableOpacity>
        </Display>

        </ImageBackground>
        </KeyboardAvoidingView>
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
 item: {
        marginVertical: moderateScale(7, 2),
        flexDirection: 'row'
     },
     itemIn: {
         marginLeft: 20
     },
     itemOut: {
        alignSelf: 'flex-end',
        marginRight: 20
     },
     balloon: {
        maxWidth: moderateScale(250, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,
     },
     arrowContainer: {
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         zIndex: -1,
         flex: 1
     },
     arrowLeftContainer: {
         justifyContent: 'flex-end',
         alignItems: 'flex-start'
     },

     arrowRightContainer: {
         justifyContent: 'flex-end',
         alignItems: 'flex-end',
     },

     arrowLeft: {
         left: moderateScale(-6, 0.5),
     },

     arrowRight: {
         right:moderateScale(-6, 0.5),
     },
     container: {
        flex: 1
      },
});
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

import React from 'react';
import { Permissions, Notifications } from 'expo';
import { ScrollView, StyleSheet,View,Text,Alert,ProgressBarAndroid,
Platform,ProgressViewIOS,Image,ImageBackground,TouchableOpacity,TextInput,AsyncStorage} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Card, ListItem, Button, Icon,SearchBar,Avatar  } from 'react-native-elements';
import firebase from 'firebase';
import Placeholder from 'rn-placeholder';
import Dimensions from 'Dimensions';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import back from '../assets/images/homeback.png';
import { createFilter } from 'react-native-search-filter';
import { Header  } from "react-navigation";
import Popover from 'react-native-popover-view';

const KEYS_TO_FILTERS = ['event_title'];

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
export default class HomeScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        events: [],
        searchText:'',
        searchEvents:[],
        isVisible:false
       };
       this.showPopover = this.showPopover.bind(this);
  }
  componentWillMount(){

    firebase.database().ref('/events').once('value').then(function(snapshot) {
        data  = snapshot.val();
        this.setState({
          events:data
        })
    }.bind(this));
  }
  static navigationOptions = {
     title: 'Home',
     headerTintColor: '#fff',
     header: props => <GradientHeader {...props} />,
     headerStyle: {
        backgroundColor: 'transparent',
      },
    headerRight: (
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity style={{marginRight:10}}>
       <Icon
          name='notifications-none'
          type='materialIcons'
          color='white'
        />
       </TouchableOpacity>
       <TouchableOpacity style={{marginRight:10}} ref={ref => this.touchable = ref} >
       <Icon
          name='filter'
          type='feather'
          color='white'
        />
        </TouchableOpacity>
        </View>
   ),
  };
    showPopover(){
      this.setState({
        isVisible:true
      })
    }
    onPress(key){
      let data = this.state.events;
      console.log(key);
      let getType = data[key].event_type;
      let getId = data[key].event_id;
      if(getType==='wedding'){
        AsyncStorage.getItem('wedding_side').then((result) => {
          if (result !== null && result=='yess') {
              Actions.weddingSchedule({
                event_id:getId
              });
          }else{

            Actions.eventName(
              {
                event_id:getId,
                boy:data[key].boy,
                girl:data[key].girl,
                event_details:data[key].event_details
              }
            );
          }
        });

      }
      if(getType==='birthday'){
        Actions.birthday(
          {
            event_id:getId
          }
        );
      }
      //many events logics
  }

  render() {
    let filteredEvents = this.state.events.filter(createFilter(this.state.searchText, KEYS_TO_FILTERS))
    if(this.state.events.length==0){
    return(
     <ImageBackground source={back} style={styles.container}>
     <Popover
         isVisible={this.state.isVisible}
         fromView={this.touchable}
         popoverStyle={{borderRadius:20}}
         onClose={() => this.closePopover()}>
         <View style={{margin:50,width:DEVICE_WIDTH/2,alignItems:'center'}}>

         </View>
       </Popover>
      <TextInput
      placeholderTextColor='#6f29b0'
      placeholder='Search'
      value={this.state.searchText}
      style={{paddingHorizontal:20,height:40, backgroundColor:'transparent',borderWidth:1,borderColor:'#6f29b0',borderRadius:30,marginLeft:10,marginRight:10}}
    />
      <ScrollView>
        {
          count.map((u, i) => {
            return (
              <Card   key={i}>
                <Placeholder.ImageContent
                  size={150}
                  animate="fade"
                  lineNumber={4}
                  lineSpacing={5}
                  lastLineWidth="30%"
                  onReady={this.state.isReady}
                >
                </Placeholder.ImageContent>
                </Card>
            );
          })
        }
  </ScrollView>
  </ImageBackground>
    );
}
    return (
     <ImageBackground source={back} style={styles.container}>
     <TextInput
     placeholder='Search'
     placeholderTextColor='#6f29b0'
     onChangeText={(text) => {
           this.setState({
             searchText:text
           });

         }
       }
     value={this.state.searchText}
     style={{paddingHorizontal:20, height:40, backgroundColor:'transparent',borderWidth:1,borderColor:'#6f29b0',borderRadius:30,marginLeft:10,marginRight:10}}
   />
      <ScrollView>
        {
          filteredEvents.map((u, i) => {
            console.log(i);
            return (
            <TouchableOpacity style={styles.cardStyle} key={i} onPress={this.onPress.bind(this,u.index)}>
              <View style={{flex:3,flexDirection:'row'}}>
                <View style={{flex:3,justifyContent:'center'}}>
                  <Image  style={{width: (DEVICE_HEIGHT/5), height: (DEVICE_HEIGHT/5),
                  }} source={{uri: u.event_photo}}/>
                </View>
                <View style={{flex:4,justifyContent:'center'}}>
                  <Text style={{fontSize:27}}>{u.event_title}</Text>
                  <Text style={{fontSize:20,color:'#8a8a8a'}}>{u.event_place}</Text>
                  <Text style={{fontSize:18,color:'#8a8a8a'}}>{u.event_date}</Text>
                </View>
              </View>
            </TouchableOpacity>
            );
          })
        }
  </ScrollView>
 </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    width:DEVICE_WIDTH,
    height:DEVICE_HEIGHT/5,
    margin:10,
    backgroundColor:'#fff',
    shadowColor: '#111',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.3,
   shadowRadius: 1,
   elevation: 5,
   flex:1,
   flexDirection: 'column',
  },
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
  },
  textHeader:{
    textAlign: 'center', // <-- the magic
 fontWeight: 'bold',
 fontSize: 28,
 marginTop: 0,

 width: DEVICE_WIDTH,
 height:40
  }
});
const count = [
 {},{},{},{},{},{}
]
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

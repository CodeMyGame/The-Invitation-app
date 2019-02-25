import React from 'react';
import { ScrollView, StyleSheet,View,Text,Alert,ProgressBarAndroid,
Platform,ProgressViewIOS,Image,ImageBackground,TouchableOpacity,TextInput} from 'react-native';
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
export default class LinksScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        events: [],
        searchText:'',
        searchEvents:[]
       };

  }
  componentWillMount(){
    firebase.database().ref('/past_events').once('value').then(function(snapshot) {
        data  = snapshot.val();
        if(data!=null){
          this.setState({
            events:data
          })
        }else{
          Alert.alert("No past events available");
        }

    }.bind(this));
  }
  static navigationOptions = {
     title: 'Past Events',
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
       <TouchableOpacity style={{marginRight:10}}>
       <Icon
          name='filter'
          type='feather'
          color='white'
        />
        </TouchableOpacity>
        </View>
   ),
  };
    onPress(key){
      let data = this.state.events;
      let getType = data[key].event_type;
      let getId = data[key].event_id;
      if(getType==='wedding'){
        Actions.eventName(
          {
            event_id:getId,
            boy:data[key].boy,
            girl:data[key].girl,
            event_details:data[key].event_details
          }
        );
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
    let filteredEvents = [];
    if(this.state.events.length!=0){
      filteredEvents = this.state.events.filter(createFilter(this.state.searchText, KEYS_TO_FILTERS))
    }
    if(this.state.events.length==0){
    return(
     <ImageBackground source={back} style={styles.container}>
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
            return (
            <TouchableOpacity style={styles.cardStyle} key={i} onPress={this.onPress.bind(this,u.index)}>
              <View style={{flex:3,flexDirection:'row'}}>
                <View style={{flex:3,justifyContent:'center'}}>
                  <Image  style={{width: (DEVICE_HEIGHT/5), height: (DEVICE_HEIGHT/5),
                    borderBottomLeftRadius: 10,
                		borderBottomRightRadius: 0,
                		borderTopLeftRadius: 10,
                		borderTopRightRadius: 0,
                  }} source={{uri: u.event_photo}}/>
                </View>
                <View style={{flex:4,justifyContent:'center'}}>
                  <Text style={{fontSize:30}}>{u.event_title}</Text>
                  <Text style={{fontSize:25,color:'#8a8a8a'}}>{u.event_place}</Text>
                  <Text style={{fontSize:20,color:'#8a8a8a'}}>{u.event_date}</Text>
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
   shadowRadius: 1,borderRadius:10,
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

import React from 'react';
import { ScrollView, StyleSheet,View,Text,Alert,ProgressBarAndroid,
Platform,ProgressViewIOS,Image,ImageBackground,TouchableOpacity} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Card, ListItem, Button, Icon,SearchBar,Avatar } from 'react-native-elements';
import firebase from 'firebase';
import Placeholder from 'rn-placeholder';
import Dimensions from 'Dimensions';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import back from '../assets/images/homeback.png';
import { Header  } from "react-navigation";
import call from 'react-native-phone-call'
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

      this.state = { member_data: [] };

  }

  componentWillMount(){
    let event_id = this.props.event_id;
    let event_type = this.props.event_type;
    firebase.database().ref('/'+event_type+'/'+event_id+'/keyMembers').once('value').then(function(snapshot) {
        data  = snapshot.val();
        this.setState({
          member_data:data
        })
    }.bind(this));

  }
  calling(no){
    const args = {
      number: ""+no, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    call(args).catch(console.error)
  }
  static navigationOptions = {
     title: 'Key members',
     headerTintColor: '#fff',
     header: props => <GradientHeader {...props} />,
     headerStyle: {
        backgroundColor: 'transparent',
      },
  };
  render() {
    if(this.state.member_data.length==0){
    return(
     <ImageBackground source={back} style={{flex:1}}>

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
     <ImageBackground source={back} style={{flex:1}}>

      <ScrollView>
        {
          this.state.member_data.map((u, i) => {
            return (
            <View style={styles.cardStyle} key={i}>
              <View style={{flex:3,flexDirection:'row'}}>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                  <Avatar
                    size="large"
                    rounded
                    source={{uri: u.pic}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={{flex:2,justifyContent:'center'}}>
                  <Text style={{fontSize:25}}>{u.name}</Text>
                  <Text style={{fontSize:15,color:'#8a8a8a'}}>{u.relation}</Text>
                </View>
                <TouchableOpacity onPress={this.calling.bind(this,u.mobile)} style={{flex:1,justifyContent:'center'}}>
                <Icon
                    name='phone'
                    type='entypo'
                  />
                </TouchableOpacity>
              </View>
            </View>
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
    height:100,
    margin:10,
    backgroundColor:'#fff',
    shadowColor: '#111',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.3,
   shadowRadius: 1,
   elevation: 5,
   borderRadius:1,
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

import React from 'react';
import { ScrollView, StyleSheet,View,Text,Alert,ProgressBarAndroid,
Platform,ProgressViewIOS,Image,ImageBackground} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Card, ListItem, Button, Icon,SearchBar,Avatar  } from 'react-native-elements';
import firebase from 'firebase';
import Placeholder from 'rn-placeholder';
import Dimensions from 'Dimensions';
import { LinearGradient } from 'expo';
import back from '../assets/images/homeback.png';
export default class SettingsScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = { weddings: [] };


  }
  componentWillMount(){
    firebase.database().ref('/wedding').once('value').then(function(snapshot) {
        data  = snapshot.val();
        this.setState({
          weddings:data
        })
    }.bind(this));
  }
  static navigationOptions = {
    header: null,
  };

  onClick = () => {
    firebase.database().ref('users/' + 2).set({
     username: "name",
     email: "email",
     profile_picture : "imageUrl"
 });
    }
  onChangeText = ()=>{

    }
  render() {
if(this.state.weddings.length==0){
    return(
     <ImageBackground source={back} style={styles.container}>
      <Text style={styles.textHeader}>Profile</Text>
      <SearchBar
  round
  lightTheme
  searchIcon={{ size: 24 }}
  // onChangeText={someMethod}
  // onClear={someMethod}
  placeholder='Type Here...' />
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
     <Text style={styles.textHeader}>Profile</Text>
     <SearchBar
     lightTheme
   round
   searchIcon={{ size: 24 }}
   // onChangeText={someMethod}
   // onClear={someMethod}
   placeholder='Search' />
      <ScrollView>
        {
          this.state.weddings.map((u, i) => {
            return (
            <View style={styles.cardStyle}>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:30,color:'#6e2ab1'}}>Heading</Text>
              </View>
              <View style={{flex:3,flexDirection:'row'}}>
                <View style={{flex:3,alignItems:'center',justifyContent:'center'}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                </View>
                <View style={{flex:4,justifyContent:'center'}}>
                  <Text style={{fontSize:30}}>Name</Text>
                  <Text style={{fontSize:25,color:'#8a8a8a'}}>Location</Text>
                  <Text style={{fontSize:20,color:'#8a8a8a'}}>Date</Text>
                </View>
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
    height:210,
    margin:10,
    backgroundColor:'#fff',
    shadowColor: '#111',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.3,
   shadowRadius: 1,
   elevation: 5,
   borderRadius:10,
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

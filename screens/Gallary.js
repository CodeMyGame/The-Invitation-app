import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet,View,Text, Animated, TouchableOpacity,Alert,ImageBackground,Image} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Dimensions from 'Dimensions';
import { Constants } from 'expo';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GridView from 'react-native-super-grid';
import Display from 'react-native-display';
import { LinearGradient } from 'expo';
import firebase from 'firebase';
import back from '../assets/images/homeback.png';
import close from '../assets/images/close-window.png';
import { Header  } from "react-navigation";
import { Platform ,ActivityIndicator} from 'react-native';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

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
class FirstRoute extends React.Component{
  constructor(props){
      super(props);
      let event_id = this.props.event_id;
      let event_type = this.props.event_type;
      this.state = {
           selectedIndex:0,
           enable:true,
           enableVideo:false,
           gallaryPicByHost: [],
           gallaryVidByHost : [],
           currentImageIndex:0,
           isModalOpened:false
     };
       firebase.database().ref('/'+event_type+'/'+event_id+'/gallary/byHost/pictures').once('value').then(function(snapshot) {
           data  = snapshot.val();
           this.setState({
             ...this.state,
             gallaryPicByHost:data
           })

       }.bind(this));
       firebase.database().ref('/'+event_type+'/'+event_id+'/gallary/byHost/videos').once('value').then(function(snapshot) {
           data  = snapshot.val();
           this.setState({
             gallaryVidByHost:data
           })

       }.bind(this));
   }
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
     render(){
       let items =  this.state.gallaryPicByHost
       if( items.length==0){
         return <ActivityIndicator size="large" color="#0000ff" />
       }
       return(
         <ImageBackground source={back} style={[styles.scene, {alignItems:'center'}]}>
         <Modal onRequestClose={() => {
           this.setState({
             isModalOpened:false
           })
          }}
           animationType={"slide"}
            transparent={false}
           visible={this.state.isModalOpened} transparent={true}>
          <TouchableOpacity
          style={{position:'absolute',zIndex:123,margin:20}}
            onPress={() => {
                this.setState({isModalOpened: false})
            } }>
              <Image style={{width:30,height:30}}
              source={close} />
          </TouchableOpacity>
           <ImageViewer imageUrls={items} index={this.state.currentImageIndex}/>
        </Modal>
         <SegmentedControlTab
                    activeTabStyle = {{backgroundColor:'#6f29b0',}}
                    tabStyle={{borderColor:'#6f29b0'}}
                    tabsContainerStyle={{marginLeft:40+DEVICE_WIDTH/6,marginRight:40+DEVICE_WIDTH/6,borderColor:'#6f29b0'}}
                     values={['Pictures', 'Videos']}
                     selectedIndex={this.state.selectedIndex}
                     onTabPress={this.handleIndexChange}
                     />
          <Display enable={this.state.enable}
          enterDuration={500}
           exitDuration={250}
           exit="fadeOutDown"
           enter="fadeInUp"
          >
          <GridView
          itemDimension={130}
          items={items}
          renderItem={(item,i) => (
            <TouchableOpacity onPress={() => {
              this.setState({
                isModalOpened:true,
                currentImageIndex:i
              })
            }}>
            <Image source={{uri:item.url}}  style={{height: 200}}/>
            </TouchableOpacity>
          )}
        />
        </Display>
         <Display enable={this.state.enableVideo}
              enterDuration={500}
              exitDuration={250}
              exit="fadeOutDown"
              enter="fadeInUp"
          >
          <GridView
          itemDimension={130}
          items={[1,2,3,4,5,6]}
          renderItem={item => (
            <View style={{backgroundColor:'green',height:200}}>
            <Text>{item}</Text>
            </View>
          )}
        />
          </Display>
         </ImageBackground>
       );
     }

}

class SecondRoute extends React.Component{
  constructor(props){
      super(props);
      let event_id = this.props.event_id;
      let event_type = this.props.event_type;
      this.state = {
           selectedIndex:0,
           enable:true,
           enableVideo:false,
           gallaryPicByGuest: [],
           gallaryVidByGuest : [],
           currentImageIndex:0,
           isModalOpened:false
     };

       firebase.database().ref('/'+event_type+'/'+event_id+'/gallary/byGuest/pictures').once('value').then(function(snapshot) {
           data  = snapshot.val();
           this.setState({
             gallaryPicByGuest:data
           })

       }.bind(this));
       firebase.database().ref('/'+event_type+'/'+event_id+'/gallary/byGuest/videos').once('value').then(function(snapshot) {
           data  = snapshot.val();
           this.setState({
             gallaryVidByGuest:data
           })

       }.bind(this));
   }
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
     render(){
       let items =  this.state.gallaryPicByGuest
       if( items.length==0){
         return <ActivityIndicator size="large" color="#0000ff" />
       }
       return(
         <ImageBackground source={back} style={[styles.scene, {alignItems:'center'}]}>
         <Modal onRequestClose={() => {
           this.setState({
             isModalOpened:false
           })
          }}
           animationType={"slide"}
            transparent={false}
           visible={this.state.isModalOpened} transparent={true}>
          <TouchableOpacity
          style={{position:'absolute',zIndex:123,margin:20}}
            onPress={() => {
                this.setState({isModalOpened: false})
            } }>
              <Image style={{width:30,height:30}}
              source={close} />
          </TouchableOpacity>
           <ImageViewer imageUrls={items} index={this.state.currentImageIndex}/>
        </Modal>
         <SegmentedControlTab
                    activeTabStyle = {{backgroundColor:'#6f29b0',}}
                    tabStyle={{borderColor:'#6f29b0'}}
                    tabsContainerStyle={{marginLeft:40+DEVICE_WIDTH/6,marginRight:40+DEVICE_WIDTH/6,borderColor:'#6f29b0'}}
                     values={['Pictures', 'Videos']}
                     selectedIndex={this.state.selectedIndex}
                     onTabPress={this.handleIndexChange}
                     />
          <Display enable={this.state.enable}
          enterDuration={500}
           exitDuration={250}
           exit="fadeOutDown"
           enter="fadeInUp"
          >
          <GridView
          itemDimension={130}
          items={items}
          renderItem={(item,i) => (
            <TouchableOpacity onPress={() => {
              this.setState({
                isModalOpened:true,
                currentImageIndex:i
              })
            }}>
            <Image source={{uri:item.url}}  style={{height: 200}}/>
            </TouchableOpacity>
          )}
        />
        </Display>
         <Display enable={this.state.enableVideo}
              enterDuration={500}
              exitDuration={250}
              exit="fadeOutDown"
              enter="fadeInUp"
          >
          <GridView
          itemDimension={130}
          items={[1,2,3,4,5,6]}
          renderItem={item => (
            <View style={{backgroundColor:'green',height:200}}>
            <Text>{item}</Text>
            </View>
          )}
        />
          </Display>
         </ImageBackground>
       );
     }

}
export default class Gallary extends React.Component {

  constructor(props){
      super(props);
      this.state = {
         index: 0,
         routes: [
           { key: 'first', title: 'By Host' },
           { key: 'second', title: 'By Guest' },
         ],
       };
    }
   _handleIndexChange = index => this.setState({ index });
   static navigationOptions = {
      title: 'Gallary',
      headerTintColor: '#fff',
      header: props => <GradientHeader {...props} />,
      headerStyle: {
         backgroundColor: 'transparent',
       },
   };
  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(
              inputIndex => (inputIndex === i ? '#D6356C' : '#222')
            ),
          });
          return (
            <TouchableOpacity
            key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
  first: FirstRoute.bind(this,{
      event_id:this.props.event_id,
      event_type: this.props.event_type
  }),
  second: SecondRoute.bind(this,{
    event_id:this.props.event_id,
    event_type: this.props.event_type
  }),
});
  render() {
    return(
      <View style={{flex:1}}>

      <View style={{flex:1}}>

      <TabView
         navigationState={this.state}
         renderScene={this._renderScene}
         renderTabBar={this._renderTabBar}
         onIndexChange={this._handleIndexChange}
       />
      </View>
      </View>


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

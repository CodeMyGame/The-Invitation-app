import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text,Animated, View, StyleSheet, Image, Dimensions, ScrollView,TouchableOpacity,ActivityIndicator,
AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { LinearGradient,Svg} from 'expo';
import { Platform } from 'react-native';
import { Header  } from "react-navigation";

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]
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
export default class EventName extends React.Component {
  constructor(props){
      super(props);
      this.state = {
            loading:true,
      };
      AsyncStorage.getItem('wedding_side').then((result) => {
        if (result !== null && result=='yess') {
            Actions.reset("mainScreen")
        }else{
          this.setState({
            loading:false
          })
        }
      });

    }
  static navigationOptions = {
     title: 'Wedding',
     headerTintColor: '#fff',
     header: props => <GradientHeader {...props} />,
     headerStyle: {
        backgroundColor: 'transparent',
      },
  };

  boySideClick(){
    AsyncStorage.setItem('wedding_side', 'yess');
    Actions.weddingSchedule(
      {
        event_id:this.props.event_id
      }
    );
  }
  girlSideClick(){
    AsyncStorage.setItem('wedding_side', 'yess');
    Actions.weddingSchedule(
      {
        event_id:this.props.event_id
      }
    );
  }
  numItems = images.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)
  render() {
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      console.log(image, i)
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{ width: deviceWidth,flex:1 }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })
    if(this.state.loading){
      return (<ActivityIndicator size="large" color="#0000ff"/>);
    }
    return (
      <View
        style={styles.container}
        flex={1}
      >
      <View style={{flex:2}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >

          {imageArray}

        </ScrollView>
        </View>
        <View style={{flex:2,alignItems:'center'}}>
          <ScrollView>
          <Text style={{margin:40,fontSize:18,textAlign:'center',color:'#97969a'}}>{this.props.event_details}
          </Text>
          </ScrollView>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:30}}>Choose your side ?</Text>
          <View style={{flex:2,flexDirection: 'row',margin:40}}>
            <View style={{flex:1,height:DEVICE_HEIGHT/16,borderRightWidth:1,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={this.boySideClick.bind(this)}>
                <Text style={{fontSize:35,color:'#650bda'}}>{this.props.boy}</Text>
            </TouchableOpacity>
            </View>
            <View style={{flex:1,height:DEVICE_HEIGHT/16,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity onPress={this.girlSideClick.bind(this)}>
              <Text style={{fontSize:35,color:'#e20e50'}}>{this.props.girl}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>
      </View>
    )
    }
  }
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

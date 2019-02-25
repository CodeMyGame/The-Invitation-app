import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text,Animated, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { Button,Avatar,Icon } from 'react-native-elements';
import { Header  } from "react-navigation";
import { Platform } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';

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

export default class Birthday extends React.Component {


    static navigationOptions = {
       title: 'Birthday',
       headerTintColor: '#fff',
       header: props => <GradientHeader {...props} />,
       headerStyle: {
          backgroundColor: 'transparent',
        },
    };


  numItems = images.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)
  onClick(){
    Actions.birthdaySchedule(
      {
        event_id:this.props.event_id
      }
    );
  }
  render() {
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      console.log(image, i)
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{ width: DEVICE_WIDTH,flex:1 }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [DEVICE_WIDTH * (i - 1), DEVICE_WIDTH * (i + 1)],
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
    });

    return (
      <View
        style={styles.container}
        flex={1}
      >
      <View style={{flex:1}}>
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
        <View style={{flex:1,alignItems:'center'}}>
          <ScrollView>
          <Text style={{margin:40,fontSize:18,textAlign:'center',color:'#97969a'}}>unset is the time of day when our sky meets the outer
          space solar winds. There are blue, pink, and purple swirls,
          spinning and twisting, like clouds of balloons caught in a blender. The sun moves slowly to hide behind the line of horizon, while the moon races to take its place in prominence atop the night sky. People slow to a crawl, entranced, fully forgetting the deeds that still must be done.
           There is a coolness, a calmness, when the sun does set.
          </Text>
          </ScrollView>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:30,color:'#e20e50'}}>Venue & Time</Text>
          <View style={{flexDirection: 'row',alignItems: 'center',}}>
            <Icon
                name='location-pin'
                type='entypo'
              />
            <Text style={{marginLeft:10}}>Location</Text>
         </View>
         <View style={{flexDirection: 'row',alignItems: 'center'}}>
           <Icon
               name='clock'
               type='entypo'
             />
           <Text style={{marginLeft:10}}>TTime</Text>
        </View>
        <Button
         onPress={this.onClick.bind(this)}
        buttonStyle={{width:150+DEVICE_WIDTH/4,marginTop:30,borderRadius:20}}
            title='Enter'
           ViewComponent={require('expo').LinearGradient}
           linearGradientProps={{
             colors: ['#6f29b0', '#952290'],
             start: [1, 0],
             end: [0.2, 0],
           }}
        />
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

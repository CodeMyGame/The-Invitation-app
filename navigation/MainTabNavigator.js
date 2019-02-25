import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import Profile from '../screens/Profile';
import UpcomingEvents from '../screens/UpcomingEvents';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
  activeTintColor: '#6f29b0',
},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'  ? 'ios-home': 'md-home'
      }
    />
  ),
};


const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Past Events',
  tabBarOptions: {
  activeTintColor: '#6f29b0',
},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-speedometer' : 'md-speedometer'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: Profile,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: {
  activeTintColor: '#6f29b0',
},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

const UpcomingEventsStack = createStackNavigator({
  Upcoming: UpcomingEvents,
});

UpcomingEventsStack.navigationOptions = {
  tabBarLabel: 'Upcoming Events',
  tabBarOptions: {
  activeTintColor: '#6f29b0',
},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  UpcomingEventsStack,
  LinksStack,
  ProfileStack,

});

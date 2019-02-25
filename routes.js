import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import EventName from './screens/EventName';
import Programs from './screens/Programs';
import Gallary from './screens/Gallary';
import Schedule from './screens/Schedule';
import WeddingSchedule from './screens/WeddingSchedule';
import Invitation from './screens/Invitation';
import KeyMembers from './screens/KeyMembers';
import EventPlanner from  './screens/EventPlanner';
import Profile from  './screens/Profile';
import Birthday from './screens/Birthday';
import BirthdaySchedule from './screens/BirthdaySchedule';
import Splash from './screens/Splash';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "splash" component = {Splash} title = "Splash"  initial = {true}  />
         <Scene key = "login" component = {Login} title = "Login" />
         <Scene key = "mainScreen" component = {MainScreen} title = "Home"/>
         <Scene key = "eventName" component = {EventName} title = "eventName" />
         <Scene key = "programs" component = {Programs} title = "programs" />
          <Scene key = "schedule" component = {Schedule} title = "schedule" />
          <Scene key = "gallary" component = {Gallary} title = "gallary" />
          <Scene key = "weddingSchedule" component = {WeddingSchedule} title = "weddingSchedule" />
          <Scene key = "invitation" component = {Invitation} title = "invitation"    />
          <Scene key = "keyMembers" component = {KeyMembers} title = "keyMembers"  />
          <Scene key = "eventPlanner" component = {EventPlanner} title = "eventPlanner" />
          <Scene key = "birthdaySchedule" component = {BirthdaySchedule} title = "birthdaySchedule"  />
          <Scene key = "birthday" component = {Birthday} title = "birthday"  />
      </Scene>
   </Router>
)
export default Routes

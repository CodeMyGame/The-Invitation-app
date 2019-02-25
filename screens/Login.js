import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { ScrollView, StyleSheet,View,Text,Image,TextInput,ImageBackground,
Alert,AsyncStorage,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import { Button,Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import loginback from '../assets/images/loginback.png';
import logo from '../assets/images/logo.png';
import firebase from "firebase";
import DropdownAlert from 'react-native-dropdownalert';
import DialogInput from 'react-native-dialog-input';

const MARGIN = 40;
export default class Login  extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
      super(props);
      AsyncStorage.getItem('isLogin').then((result) => {
        if (result !== null && result=='yes') {
            Actions.reset("mainScreen")
        }else{
          this.setState({
            loading:false
          })
        }
      });

      this.state = {
            dialogVisible: false,
            loading:true,
            phone:'',
            name:'',
            count:20,
            smsstatus:'',
            smsDetails:''
      };
    }

  onClick = () => {
    var phoneno = /^\d{10}$/;
    if(!this.state.phone.match(phoneno)){
      this.dropdown.alertWithType('error', 'Error', 'Enter valid mobile number');
      return;
    }
    if(this.state.name==''){
      this.dropdown.alertWithType('error', 'Error', 'Enter name');
      return;
    }
    this.setState({ count: 20 });
    this.interval = setInterval(() => {
      if(this.state.count==0){
         clearInterval(this.interval);
      }else{
        this.setState({ count: this.state.count - 1 });
      }

    }, 1000);
    this.setState({ dialogVisible: true });

    fetch('https://2factor.in/API/V1/b747baf3-1637-11e9-9ee8-0200cd936042/SMS/+91'+this.state.phone+'/AUTOGEN')
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson.Status=='Success'){
          this.setState({
            smsDetails:responseJson.Details
          })
        }else{
          this.setState({ dialogVisible: false });
          this.dropdown.alertWithType('error', 'Error', 'Unable to send message please enter correct number');
        }
    })
    .catch((error) => {
      this.setState({ dialogVisible: false });
      this.dropdown.alertWithType('error', 'Error', error);
    });
    }
    showDialog(){
        if(this.state.count==0){
          this.setState({ count: 20 });
          this.interval = setInterval(() => {
            if(this.state.count==0){
               clearInterval(this.interval);
            }else{
              this.setState({ count: this.state.count - 1 });
            }

          }, 1000);

          fetch('https://2factor.in/API/V1/b747baf3-1637-11e9-9ee8-0200cd936042/SMS/+91'+this.state.phone+'/AUTOGEN')
          .then((response) => response.json())
          .then((responseJson) => {
              if(responseJson.Status=='Success'){
                this.setState({
                  smsDetails:responseJson.Details
                })
              }else{
                this.setState({ dialogVisible: false });
                this.dropdown.alertWithType('error', 'Error', 'Unable to send message please enter correct number');
              }
          })
          .catch((error) => {
            this.setState({ dialogVisible: false });
            this.dropdown.alertWithType('error', 'Error', error);
          });
        }
     };

     sendInput(val){
       if(val!=''){
         fetch('https://2factor.in/API/V1/b747baf3-1637-11e9-9ee8-0200cd936042/SMS/VERIFY/'+this.state.smsDetails+'/'+val)
         .then((response) => response.json())
         .then((responseJson) => {
             if(responseJson.Status=='Success' && responseJson.Details=='OTP Matched'){
               AsyncStorage.setItem('isLogin', 'yes');
               AsyncStorage.setItem('session_id', this.state.phone);
               AsyncStorage.setItem('session_name', this.state.name);
               Actions.reset("mainScreen")
             }else{
               Alert.alert("please enter correct verification code");
             }
         })
         .catch((error) => {
          Alert.alert(error);
         });
       }
     };

  render() {
    if(this.state.loading){
      return (<ActivityIndicator size="large" color="#0000ff"/>);
    }else{
    return (
      <KeyboardAvoidingView  style={styles.container}
      behavior="padding">
      <DialogInput isDialogVisible={this.state.dialogVisible}
            title={"Enter verification code"}
            message={"Resend in "+this.state.count + " seconds"}
            cancelText={'Resend'}
            modalStyle={{backgroundColor:'rgba(52, 52, 52, 0.8)'}}
            hintInput ={"Enter code"}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.showDialog()}}>
            </DialogInput>
        <DropdownAlert zIndex={100} translucent={true} ref={ref => this.dropdown = ref} />
      <View style={{flex:1}}>
          <ImageBackground source={loginback} style={{alignItems: 'center',justifyContent: 'center',flex: 3,marginLeft:-DEVICE_WIDTH/4}}>
            <Image source = {logo} style={{marginTop:30,width:(DEVICE_WIDTH/4)+20,height:DEVICE_WIDTH/4,marginLeft:DEVICE_WIDTH/4}}/>
          </ImageBackground>

          <View style={{flex: 2,alignItems: 'center'}}>
          <Input
            containerStyle={{marginTop:DEVICE_WIDTH/8}}
            placeholder='Your name'
            leftIcon={{ type: 'font-awesome', name: 'user'}}
            onChangeText={(text) => this.setState({
              name:text
            })}
            value={this.state.name}
          />
        <Input
        containerStyle={{marginTop:20}}
        maxLength = {10}
        placeholder='Your mobile number'
        leftIcon={{ type: 'font-awesome', name: 'phone' }}
        onChangeText={(text) =>{
          text = text.replace(".", '');
          if(!isNaN(text)){
            this.setState({
                phone:text
            })
          }
        }}
        value={this.state.phone}
        />
        <Button
         onPress={this.onClick}
        buttonStyle={{width:150+DEVICE_WIDTH/4,marginTop:30,borderRadius:20}}
            title='Login'
           ViewComponent={require('expo').LinearGradient}
           linearGradientProps={{
             colors: ['#6f29b0', '#952290'],
             start: [1, 0],
             end: [0.2, 0],
           }}
        />
          </View>

        </View>
          </KeyboardAvoidingView>
    );
  }
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    marginTop:10,
    backgroundColor: 'white',
    width: DEVICE_WIDTH - 80,
    height: 44,
    paddingLeft: 45,
    borderRadius: 20,
  },
 picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
 },
 container: {
    flex: 1
  },

  button: {
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#F035E0',
   width: DEVICE_WIDTH - 40,
   height: 40,
   marginHorizontal: 20,
   paddingLeft: 45,
   marginTop:10,
   borderRadius: 20,
   zIndex: 100,
 },


});

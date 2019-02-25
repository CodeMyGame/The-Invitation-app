import React from 'react';
import { ScrollView, StyleSheet,View,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Card, ListItem, Button, Icon,SearchBar  } from 'react-native-elements';
import AppNavigator from '../navigation/AppNavigator';
import DropdownAlert from 'react-native-dropdownalert';
export default class MainScreen  extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
console.disableYellowBox = true;
    return (
      <View style={styles.container}>
      <DropdownAlert zIndex={100}  ref={ref => this.dropdown = ref} />
      <AppNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});

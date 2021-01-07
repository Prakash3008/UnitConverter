import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Length from './Conversions/Length';
import Temperature from './Conversions/Temperature';
import Currency from './Conversions/Currency';
import Time from './Conversions/Time';
import Number from './Conversions/Number';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createMaterialBottomTabNavigator();
class Main extends Component{
  render(){
    return(
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Distance" component={Length} /> 
        <Tab.Screen name="Temperature" component={Temperature} />
        <Tab.Screen name="Currency" component={Currency}/>
        <Tab.Screen name="Time" component={Time}/>
        <Tab.Screen name="Number" component={Number}/>
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
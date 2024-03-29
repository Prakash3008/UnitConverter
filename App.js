import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Length from './Conversions/Length';
import Temperature from './Conversions/Temperature';
import Currency from './Conversions/Currency';
import Time from './Conversions/Time';
import Number from './Conversions/Number';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const Nav = createMaterialBottomTabNavigator();
class App extends Component{
  render(){
    return(
      <NavigationContainer activeColor="#f0edf6"
        inactiveColor="#3e2465">
      <Nav.Navigator>
        <Nav.Screen name="Distance" component={Length}
          options={{
          tabBarLabel: 'Distance',
          tabBarIcon: ({}) => (
            <FontAwesome5 name="ruler" size={24} color="black" />
          ),
        }}
        /> 
        <Nav.Screen name="Temperature" component={Temperature} 
          options={{
            tabBarLabel: 'Temperature',
            tabBarIcon: ({}) => (
              <FontAwesome5 name="temperature-high" size={24} color="black" />
            ),
          }}
        />
        <Nav.Screen name="Currency" component={Currency}
          options={{
          tabBarLabel: 'Currency',
          tabBarIcon: ({}) => (
            <MaterialCommunityIcons name="currency-usd-circle" size={24} color="black" />
          ),
        }}
        />
        <Nav.Screen name="Time" component={Time}
          options={{
          tabBarLabel: 'Time',
          tabBarIcon: ({}) => (
            <AntDesign name="clockcircle" size={24} color="black" />
          ),
        }}
        />
        <Nav.Screen name="Number" component={Number}
          options={{
          tabBarLabel: 'Number',
          tabBarIcon: ({}) => (
            <MaterialCommunityIcons name="decimal" size={24} color="black" />
          ),
        }}
        />
      </Nav.Navigator>
    </NavigationContainer>
    )
  }
}
export default App;
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Dimensions, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window')

class Temperature extends Component{
    constructor(props){
        super(props);
        this.state = {
            unitFrom: 'C', userInput: '', unitTo: 'F', value: null,
        }
    }

    FromChange = (unit) => {
    this.setState({unitFrom:unit},() => this.calculate());
    }
    ToChange = (unit1) => {
    this.setState({unitTo:unit1},() => this.calculate());
    }

    calculate = () => {
        if (this.state.userInput !== '') {
            let mid, result;
            if (this.state.unitFrom == 'F') {
                mid = (this.state.userInput - 32) * 5 / 9;
            }
            else if (this.state.unitFrom == 'C') {
                mid = this.state.userInput;
            }
            else if (this.state.unitFrom == 'K'){
                mid = this.state.userInput - 273.15
            };

            if (this.state.unitTo == 'F') {
                result = mid * 1.8 + 32;
            }
            else if (this.state.unitTo == 'C') {
                result = mid;
            }
            else if (this.state.unitTo == 'K'){
                result =  mid * 1 + 273.15 ;
            };
            this.setState({ value: parseFloat(result).toFixed(1) });
    }
}

    updateAndCalculate = (text) => {
        this.setState({userInput: text.replace(/,/g,'')},() => 
            this.calculate())
    }

    render(){
        return (
            <View>
            <Text style={styles.title}> Temperature Conversion</Text>
            <View style={styles.contentsContainer}>
                <Text style={styles.textStyle}>From:            </Text>
                <TextInput
                placeholder="Enter here"
                style={styles.textStyle}
                value= {this.state.userInput}
                onChangeText={this.updateAndCalculate}
                maxLength={10}
                keyboardType='numeric'
                />
            <Picker   
                style={styles.picker}
                selectedValue={this.state.unitFrom}
                onValueChange={this.FromChange}>
                <Picker.Item label="°C (Celsius)" value="C" />
                <Picker.Item label="°F (Farenheit)" value="F" />
                <Picker.Item label="K (Kelvin)" value="K" />

            </Picker>

            </View>
            <View style={styles.contentsContainer}>
                <Text style={styles.textStyle}>To:            </Text>
                <Text style={styles.textStyle}> {this.state.value} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.unitTo}
                onValueChange={this.ToChange}>
                <Picker.Item label="°C (Celsius)" value="C" />
                <Picker.Item label="°F (Farenheit)" value="F" />
                <Picker.Item label="K (Kelvin)" value="K" />
            </Picker>                   
                
            </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: 160,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop:60,
    },
    textStyle: {
        color: "black",
        fontSize: 15,
        
    },
    contentsContainer: {
    flexDirection: "row",
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 100,

    },
    container: {
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 100,

    },

});
export default Temperature;
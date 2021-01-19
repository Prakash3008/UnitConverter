import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from '../static/styles'

class Temperature extends Component{
    constructor(props){
        super(props);
        this.state = {
            FromUnit: 'C', userInput: '', ToUnit: 'F', output: null,
        }
    }

    unitFrom = (unitf) => {
    this.setState({FromUnit:unitf},() => this.compute());
    }
    unitTo = (unitt) => {
    this.setState({ToUnit:unitt},() => this.compute());
    }

    compute = () => {
        if (this.state.userInput !== '') {
            let mid, result;
            if (this.state.FromUnit == 'F') {
                mid = (this.state.userInput - 32) * 5 / 9;
            }
            else if (this.state.FromUnit == 'C') {
                mid = this.state.userInput;
            }
            else if (this.state.FromUnit == 'K'){
                mid = this.state.userInput - 273.15
            };

            if (this.state.ToUnit == 'F') {
                result = mid * 1.8 + 32;
            }
            else if (this.state.ToUnit == 'C') {
                result = mid;
            }
            else if (this.state.ToUnit == 'K'){
                result =  mid * 1 + 273.15 ;
            };
            this.setState({ output: parseFloat(result).toFixed(1) });
    }
}

    validateText = (text) => {
        this.setState({userInput: text.replace(/,/g,'')},() => 
            this.compute())
    }

    render(){
        return (
            <View style={styles.title} >
            <Text style={styles.title}>Temperature Conversion 🌡️</Text>
            <View style={styles.contentsContainer}>
                <TextInput
                placeholder="Enter here"
                style={styles.textStyle1}
                value= {this.state.userInput}
                onChangeText={this.validateText}
                maxLength={10}
                keyboardType='numeric'
                />
            <Picker   
                style={styles.picker}
                selectedValue={this.state.FromUnit}
                onValueChange={this.unitFrom}>
                <Picker.Item label="°C (Celsius)" value="C" />
                <Picker.Item label="°F (Fahrenheit)" value="F" />
                <Picker.Item label="K (Kelvin)" value="K" />

            </Picker>

            </View>
            <View style={styles.contentsContainer}>
                <Text style={styles.textStyle1}> {this.state.output} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.ToUnit}
                onValueChange={this.unitTo}>
                <Picker.Item label="°C (Celsius)" value="C" />
                <Picker.Item label="°F (Fahrenheit)" value="F" />
                <Picker.Item label="K (Kelvin)" value="K" />
            </Picker>                   
            </View>
            </View>
        );
    }
}
export default Temperature;
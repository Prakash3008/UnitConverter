import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from '../static/styles'

class Length extends Component{
    constructor(props){
        super(props);
        this.state = {
            FromUnit: 'mi', userInput: '', ToUnit: 'km', output: null,
            distanceVal:{'km': 1000,'m': 1,'cm':0.01,'mm':0.001,'in':0.0254,
                                    'mi':1609.34,'yd':0.9144,'ft':0.3048
                    }
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
            mid=this.state.userInput*this.state.distanceVal[this.state.FromUnit]
            result = mid/this.state.distanceVal[this.state.ToUnit]
            this.setState({ output: parseFloat(result).toFixed(3) });
        }
        else {
            this.setState({ output: null })
        }
    }

        validateText = (text) => {
        this.setState({userInput: text.replace(/,/g,'')},() => 
            this.compute())
    }

    render(){
        return (
            <View style={styles.title} >
            <Text style={styles.title}>Distance Conversion 📏</Text>
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
                <Picker.Item label="Miles" value="mi" />
                <Picker.Item label="Meters" value="m" />
                <Picker.Item label="Centimeters" value="cm" />
                <Picker.Item label="Millimeters" value="mm" />
                <Picker.Item label="Kilometers" value="km" />
                <Picker.Item label="Yards" value="yd" />
                <Picker.Item label="Feet" value="ft" />
                <Picker.Item label="Inches" value="in" />
            </Picker>

            </View>
            <View style={styles.contentsContainer}>
                <Text style={styles.textStyle1}> {this.state.output} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.ToUnit}
                onValueChange={this.unitTo}>
                <Picker.Item label="Miles" value="mi" />
                <Picker.Item label="Meters" value="m" />
                <Picker.Item label="Centimeters" value="cm" />
                <Picker.Item label="Millimeters" value="mm" />
                <Picker.Item label="Kilometers" value="km" />
                <Picker.Item label="Yards" value="yd" />
                <Picker.Item label="Feet" value="ft" />
                <Picker.Item label="Inches" value="in" />
            </Picker>                     
            </View>
            </View>
        );
    }
}

export default Length;
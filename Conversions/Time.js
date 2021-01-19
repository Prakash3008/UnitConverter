import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from '../static/styles'

class Time extends Component{
    constructor(props){
        super(props);
        this.state = {
            FromUnit: 'sec', userInput: '', ToUnit: 'min', output: null,
            TimeVal:{'sec': 1,'min': 60,'hr':3600,'day':86400,'wk':604800,
                                    'm':2.628e+6,'y':3.154e+7
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
            mid=this.state.userInput*this.state.TimeVal[this.state.FromUnit]
            result = mid/this.state.TimeVal[this.state.ToUnit]
            this.setState({ output: parseFloat(result).toFixed(2) });
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
            <Text style={styles.title}>Time Conversion ⏲️</Text>
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
                <Picker.Item label="Seconds" value="sec" />
                <Picker.Item label="Minutes" value="min" />
                <Picker.Item label="Hour" value="hr" />
                <Picker.Item label="Day" value="day" />
                <Picker.Item label="Week" value="wk" />
                <Picker.Item label="Month" value="m" />
                <Picker.Item label="Year" value="y" />
            </Picker>

            </View>
            <View style={styles.contentsContainer}>
                <Text style={styles.textStyle1} placeholder="Enter here"> {this.state.output} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.ToUnit}
                onValueChange={this.unitTo}>
                <Picker.Item label="Seconds" value="sec" />
                <Picker.Item label="Minutes" value="min" />
                <Picker.Item label="Hour" value="hr" />
                <Picker.Item label="Day" value="day" />
                <Picker.Item label="Week" value="wk" />
                <Picker.Item label="Month" value="m" />
                <Picker.Item label="Year" value="y" />
            </Picker>                   
            </View>
            </View>
        );
    }
}
export default Time;
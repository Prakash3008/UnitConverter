import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from '../static/styles'


class Number extends Component{
    constructor(props){
        super(props);
        this.state = {
            FromUnit: "dec", userInput: '', ToUnit: "bin", output: null,
        }
    }

    unitFrom = (unitf) => {
    this.setState({FromUnit:unitf},() => this.compute());
    }
    unitTo = (unitt) => {
    this.setState({ToUnit:unitt},() => this.compute());
    }

    baseConvert = (from,To) => {
        let result, val;
        val = this.state.userInput;
        result = parseInt(val + '',from).toString(To);
        this.setState({ output: result });
    }

    compute = () => {
        if (this.state.userInput !== '') {
            let from,To;
            if(this.state.FromUnit=="bin"){
                from=2;
            }
            else if(this.state.FromUnit=="qui"){
                from=5;
            }
            else if(this.state.FromUnit=="dec"){
                from=10;
            }
            else if(this.state.FromUnit=="oct"){
                from=8;
            }
            else if(this.state.FromUnit=="hex"){
                from=16;
            };

            if(this.state.ToUnit=="bin"){
                To=2;
            }
            else if(this.state.ToUnit=="qui"){
                To=5;
            }
            else if(this.state.ToUnit=="dec"){
                To=10;
            }
            else if(this.state.ToUnit=="oct"){
                To=8;
            }
            else if(this.state.ToUnit=="hex"){
                To=16;
            };
            if((from && To) >2 || (from && To)<36){
                this.baseConvert(from,To); 
            }      
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
            <Text style={styles.title}>Number Conversion 🔢</Text>
            <View style={styles.contentsContainer}>
                
                <TextInput
                placeholder="Enter here"
                style={styles.textStyle1}
                value= {this.state.userInput}
                onChangeText={this.validateText}
                maxLength={10}
                keyboardType='default'
                />
            <Picker   
                style={styles.picker}
                selectedValue={this.state.FromUnit}
                onValueChange={this.unitFrom}>
                <Picker.Item label="Binary" value="bin" />
                <Picker.Item label="Quinary" value="qui" />
                <Picker.Item label="Octal" value="oct" />
                <Picker.Item label="Decimal" value="dec" />
                <Picker.Item label="Hexadecimal" value="hex" />
            </Picker>

            </View>
            <View style={styles.contentsContainer}>               
                <Text style={styles.textStyle1}> {this.state.output} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.ToUnit}
                onValueChange={this.unitTo}>
                <Picker.Item label="Binary" value="bin" />
                <Picker.Item label="Quinary" value="qui" />
                <Picker.Item label="Octal" value="oct" />
                <Picker.Item label="Decimal" value="dec" />
                <Picker.Item label="Hexadecimal" value="hex" />
            </Picker>                             
            </View>
            </View>
        );
    }
}
export default Number;
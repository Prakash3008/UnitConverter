import React, { Component} from 'react';
import { Text, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import currAPI from '../apis/Currency'
import styles from '../static/styles'

class Currency extends Component{
    constructor(props){
        super(props);
        this.state = {
            FromUnit: "INR", userInput: '', ToUnit: "USD", output: null,
            CurrCon: []
        }
    }

    unitFrom = (unitf) => {
    this.setState({FromUnit:unitf},() => this.compute());
    }
    unitTo = (unitt) => {
    this.setState({ToUnit:unitt},() => this.compute());
    }

    compute = () => {
        let cur,result, rate;
        cur = this.state.FromUnit + '_' + this.state.ToUnit;
        if (this.state.userInput !== '') {        
            currAPI.get('convert?q=' + cur +'&compact=ultra&apiKey=9c72321894c386c1b1be')
            .then((response) =>{
                const rates = response.data;
                this.setState({CurrCon: rates}); 
                result = this.state.userInput * this.state.CurrCon[cur];
                this.setState({ output: parseFloat(result).toFixed(3) });
            }).catch(function(error){
            console.log(error)
        });
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
            <Text style={styles.title}>Currency Conversion 💱</Text>
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
                <Picker.Item label="INR" value="INR" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="JPY" value="JPY" />
                <Picker.Item label="GBP" value="GBP" />
                <Picker.Item label="AUD" value="AUD" />
                <Picker.Item label="MXN" value="MXN" />
                <Picker.Item label="KWD" value="KWD" />
                <Picker.Item label="SGD" value="SGD" />
                <Picker.Item label="MYR" value="MYR" />
                <Picker.Item label="AED" value="AED" />
            </Picker>

            </View>
            <View style={styles.contentsContainer}>
                
                <Text style={styles.textStyle1}> {this.state.output} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.ToUnit}
                onValueChange={this.unitTo}>
                <Picker.Item label="INR" value="INR" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="JPY" value="JPY" />
                <Picker.Item label="GBP" value="GBP" />
                <Picker.Item label="AUD" value="AUD" />
                <Picker.Item label="MXN" value="MXN" />
                <Picker.Item label="KWD" value="KWD" />
                <Picker.Item label="SGD" value="SGD" />
                <Picker.Item label="MYR" value="MYR" />
                <Picker.Item label="AED" value="AED" />
            </Picker>                   
                
            </View>
            </View>
        );
    }
}
export default Currency;
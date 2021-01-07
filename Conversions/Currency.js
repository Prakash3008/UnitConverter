import React, { Component} from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView,  TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import currAPI from '../apis/Currency'
import { func } from 'prop-types';



class Currency extends Component{
    constructor(props){
        super(props);
        this.state = {
            unitFrom: "INR", userInput: '', unitTo: "USD", value: null,
            conRate: []
        }
    }

    FromChange = (unit) => {
    this.setState({unitFrom:unit},() => this.calculate());
    }
    ToChange = (unit1) => {
    this.setState({unitTo:unit1},() => this.calculate());
    }

    calculate = () => {
        let cur,result, rate;
        cur = this.state.unitFrom + '_' + this.state.unitTo;
        if (this.state.userInput !== '') {        
            currAPI.get('convert?q=' + cur +'&compact=ultra&apiKey=9c72321894c386c1b1be')
            .then((response) =>{
                const rates = response.data;
                this.setState({conRate: rates}); 
                console.log(this.state.conRate);
                result = this.state.userInput * this.state.conRate[cur];
                this.setState({ value: parseFloat(result).toFixed(3) });
            }).catch(function(error){
            console.log(error)
        });
        }
        else {
            this.setState({ value: null })
        }
    }

        updateAndCalculate = (text) => {
        this.setState({userInput: text.replace(/,/g,'')},() => 
            this.calculate())
    }

    render(){
        return (
            <View>
            <Text style={styles.title}> Currency Conversion</Text>
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
                <Text style={styles.textStyle}>To:            </Text>
                <Text style={styles.textStyle}> {this.state.value} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.unitTo}
                onValueChange={this.ToChange}>
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
const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: 151,
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
export default Currency;
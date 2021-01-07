import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView,  TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';


class Number extends Component{
    constructor(props){
        super(props);
        this.state = {
            unitFrom: "dec", userInput: '', unitTo: "bin", value: null,
        }
    }

    FromChange = (unit) => {
    this.setState({unitFrom:unit},() => this.calculate());
    }
    ToChange = (unit1) => {
    this.setState({unitTo:unit1},() => this.calculate());
    }

    baseConvert = (from,To) => {
        let result, val;
        val = this.state.userInput;
        result = parseInt(val + '',from).toString(To);
        this.setState({ value: result });
    }

    calculate = () => {
        if (this.state.userInput !== '') {
            let from,To;
            if(this.state.unitFrom=="bin"){
                from=2;
            }
            else if(this.state.unitFrom=="qui"){
                from=5;
            }
            else if(this.state.unitFrom=="dec"){
                from=10;
            }
            else if(this.state.unitFrom=="oct"){
                from=8;
            }
            else if(this.state.unitFrom=="hex"){
                from=16;
            };

            if(this.state.unitTo=="bin"){
                To=2;
            }
            else if(this.state.unitTo=="qui"){
                To=5;
            }
            else if(this.state.unitTo=="dec"){
                To=10;
            }
            else if(this.state.unitTo=="oct"){
                To=8;
            }
            else if(this.state.unitTo=="hex"){
                To=16;
            };

            
            if((from && To) <2 || (from && To)>36){
                console.log(from,To);
            }  
            else{
                this.baseConvert(from,To); 
                console.log(from,To);
            }        
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
            <Text style={styles.title}> Number Conversion</Text>
            <View style={styles.contentsContainer}>
                <Text style={styles.textStyle}>From:            </Text>
                <TextInput
                placeholder="Enter here"
                style={styles.textStyle}
                value= {this.state.userInput}
                onChangeText={this.updateAndCalculate}
                maxLength={10}
                keyboardType='default'
                />
            <Picker   
                style={styles.picker}
                selectedValue={this.state.unitFrom}
                onValueChange={this.FromChange}>
                <Picker.Item label="Binary" value="bin" />
                <Picker.Item label="Quinary" value="qui" />
                <Picker.Item label="Octal" value="oct" />
                <Picker.Item label="Decimal" value="dec" />
                <Picker.Item label="Hexadecimal" value="hex" />
            </Picker>

            </View>
            <View style={styles.contentsContainer}>
                <Text style={styles.textStyle}>To:            </Text>
                <Text style={styles.textStyle}> {this.state.value} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.unitTo}
                onValueChange={this.ToChange}>
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
export default Number;
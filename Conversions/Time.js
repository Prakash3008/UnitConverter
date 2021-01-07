import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView,  TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';


class Length extends Component{
    constructor(props){
        super(props);
        this.state = {
            unitFrom: 'sec', userInput: '', unitTo: 'min', value: null,
            distance:{'sec': 1,'min': 60,'hr':3600,'day':86400,'wk':604800,
                                    'm':2.628e+6,'y':3.154e+7
                    }
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
            mid=this.state.userInput*this.state.distance[this.state.unitFrom]
            result = mid/this.state.distance[this.state.unitTo]
            this.setState({ value: parseFloat(result).toFixed(2) });
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
            <Text style={styles.title}> Time Conversion</Text>
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
                <Text style={styles.textStyle}>To:            </Text>
                <Text style={styles.textStyle}> {this.state.value} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.unitTo}
                onValueChange={this.ToChange}>
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
export default Length;
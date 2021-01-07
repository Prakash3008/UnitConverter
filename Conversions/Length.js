import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView,  TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';


class Length extends Component{
    constructor(props){
        super(props);
        this.state = {
            unitFrom: 'mi', userInput: '', unitTo: 'km', value: null,
            distance:{'km': 1000,'m': 1,'cm':0.01,'mm':0.001,'in':0.0254,
                                    'mi':1609.34,'yd':0.9144,'ft':0.3048
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
            this.setState({ value: parseFloat(result).toFixed(3) });
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
            <Text style={styles.title}> Distance Conversion</Text>
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
                <Text style={styles.textStyle}>To:            </Text>
                <Text style={styles.textStyle}> {this.state.value} </Text>
                <Picker   
                style={styles.picker}
                selectedValue={this.state.unitTo}
                onValueChange={this.ToChange}>
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
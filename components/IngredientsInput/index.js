import React, { Component } from 'react';
import { ListItem, Avatar, CheckBox } from 'react-native-elements'
import { SectionList, StyleSheet, Text, View } from 'react-native';
import Checkbox from './components/checkbox.js';

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    })

    const handleChange = (e) => {
        console.log("clicked")
    }

    const SectionListBasics = () => {
        return (
           
            <View style={styles.container}>
                <SectionList
                sections={[
                    {title: 'Alcohol', data: [ 'Light rum',
                     "Bourbon",
                     "Vodka",
                     "Gin",
                     "Tequila",
                     "Campari",
                     "Sweet Vermouth",
                     "Blended whiskey",
                     "Dry Vermouth",
                     "Triple sec",
                     "Apricot brandy",
                     "Southern Comfort",
                     "Amaretto",
                     "Sloe gin",
                     "Yellow Chartreuse",
                     "Creme de Cacao",
                     "Brandy",
                     "Lemon vodka",
                     "Blackberry brandy",
                     "Kummel"]},
                    {title: 'Mixers', data: [ "Soda water",
                     "Water",
                     "Coca-Cola",
                     "Lime juice",
                     "Ginger ale",
                     "Lemon juice",
                     "Light cream",
                     "Pineapple juice"]},
                    {title: 'Garnish', data: [ "Lime",
                     "Sugar",
                     "Mint",
                     "Angostura bitters",
                     "Lemon",
                     "Powdered sugar",
                     "Cherry",
                     "Olive",
                     "Salt",
                     "Ice",
                     "Maraschino cherry",
                     "Orange peel",
                     "Orange bitters",
                     "Lemon peel",
                     "Nutmeg"]},
                ]}
                renderItem={({item}) => 
                <Checkbox 
                    name={item} checked= {false} onChange = {handleChange}
                />}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
                />
            </View>
        );
    }

export default SectionListBasics;


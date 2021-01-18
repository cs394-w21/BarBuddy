import React, { Component } from 'react';
import { ListItem, Avatar, CheckBox } from 'react-native-elements'
import { SectionList, StyleSheet, Text, View } from 'react-native';

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

    const SectionListBasics = () => {
        return (
            <View style={styles.container}>
                <SectionList
                sections={[
                    {title: 'Alcohol', data: ['Devin', 'Dan', 'Dominic']},
                    {title: 'Mixers', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                    {title: 'Garnish', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                ]}
                renderItem={({item}) => 
                <CheckBox 
                    title={item}
                />}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
                />
            </View>
        );
    }

export default SectionListBasics;


import React, { Component } from 'react';
import { render } from 'react-dom';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
// import {ExpandableListView} from 'react-native-expandable-listview';

//need a function to import information on the particular cocktail that was clicked

class Cocktail extends Component{

    render(){
        return(
        <View> 
            <SafeAreaProvider>
                <SafeAreaView>
                    <Header
                        //leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: "BarBuddy", style: { color: '#fff', fontSize: 32, fontWeight: "bold"} }}
                        //rightComponent={{ icon: 'home', color: '#fff' }}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            
        </View>
        )
    }
}

export default Cocktail;
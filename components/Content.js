import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import CocktailList from './CocktailList/index.js'


export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cocktailList: []
        }
    }

    //Fetch cocktail data.
    // pass cocktail info to cocktail componenet 
    // take cocktail componenet and input into cocktailist 

    getCocktailData() {
        this.state.cocktailList = [{
            name: 'Classic Margarita',
            avatar_url: 'https://i1.wp.com/www.moodymixologist.com/wp-content/uploads/2020/02/classic-margarita-cocktail-recipe-03-3560629.jpg?w=733&ssl=1',
            ingredients: 'ingredients'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            ingredients: 'ingredients'
        },]
    }

    render () {   
        this.getCocktailData() 
        return (
            <View>
                <Text>This is our BarBuddy App!</Text>
                <CocktailList cocktailList = {this.state.cocktailList}/>
            </View>
        )
    }
}
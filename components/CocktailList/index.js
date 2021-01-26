import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'


export default class CocktailList extends Component {
    constructor(props) {
        super(props);
        this.chevronPress = this.chevronPress.bind(this);
        this.cocktailListDisplayHelper = this.cocktailListDisplayHelper.bind(this);
    }

    chevronPress () {
        console.log("pressed");
    }

    cocktailListDisplayHelper (l, i) {
        let ingredientStrings = []

        for(let i = 0; i < l.ingredients.length; i++)
        {
            if(l.measures[i].charAt(l.measures[i].length -1) != ' ')
            {
                l.measures[i] += " ";
            }
            ingredientStrings.push(l.measures[i] + l.ingredients[i]); //bug with if there isn't a space after measure
        }
        
        return ( // make a helper function to be able to join ingredients.
            <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{ingredientStrings.join(', ')}</ListItem.Subtitle>
                <ListItem.Subtitle>{l.instructions}</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem>
        )
    }
    

    render () {
        console.log(this.props.cocktailList)
        //console.log("ingredients")
        //console.log(this.props.allIngredients)
        //let uniqueDrinks = [...new Set(this.props.allIngredients)]
        //console.log(uniqueDrinks);

        return (
            <View>
                {
                    this.props.cocktailList.map((l, i) => this.cocktailListDisplayHelper(l, i))
                }
            </View>
        )

    }

}
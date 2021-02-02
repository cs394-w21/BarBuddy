import React, { Component } from 'react';
import { Platform, Text, View, Linking} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'


export default class CocktailList extends Component {
    constructor(props) {
        super(props);
        this.chevronPress = this.chevronPress.bind(this);
        this.cocktailListDisplayHelper = this.cocktailListDisplayHelper.bind(this);

    }

    chevronPress = (id) => {
        console.log("pressed" + id);
        let idInt = id;
        let url = `https://thecocktaildb.com/drink/${idInt}`;

        if(Platform.OS == 'web'){
            window.open(url, '_blank');
         } else {
            Linking.openURL(url, '_blank') // normal Linking react-native
         }
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
            <ListItem onPress ={() => this.chevronPress(l.id)} key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{ingredientStrings.join(', ')}</ListItem.Subtitle>
                <ListItem.Subtitle>{l.instructions}</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem >
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
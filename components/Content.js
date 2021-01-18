import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import CocktailList from './CocktailList/index.js'


export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cocktailList: [],
            cocktailData: {},
            dataReceived: 0
        }

        this.getCocktailData = this.getCocktailData.bind(this);
        this.compileCocktailList = this.compileCocktailList.bind(this);
    }

    //Fetch cocktail data.
    // pass cocktail info to cocktail componenet 
    // take cocktail componenet and input into cocktailist 

    getCocktailData(callback = () => { }) { 
        //this.state.cocktailList = [
        //     {
        //     name: 'Classic Margarita',
        //     avatar_url: 'https://i1.wp.com/www.moodymixologist.com/wp-content/uploads/2020/02/classic-margarita-cocktail-recipe-03-3560629.jpg?w=733&ssl=1',
        //     ingredients: 'ingredients'
        // },
        // {
        //     name: 'Chris Jackson',
        //     avatar_url: 'https://i1.wp.com/www.moodymixologist.com/wp-content/uploads/2020/02/classic-margarita-cocktail-recipe-03-3560629.jpg?w=733&ssl=1',
        //     ingredients: 'ingredients'
        // },
    //]

        if(this.state.dataReceived == 0) { //render kept repeating
            fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php') //fetching popular cocktail data
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    cocktailData: json,
                    dataReceived: 1
                }, callback)
            }).catch((error) => {
                console.error(error);
            });

           
        }
    }

    compileCocktailList() {
        console.log(this.state.cocktailData);
        console.log("Drink 1");
        console.log(this.state.cocktailData.drinks[0].strDrink);
        //TODO get all drink names, image links (?), and ingredients
        //put all this info for each drink into its own dictionary
        //put all dictionaries into a list
        let drinkArr = [];
        let drink;
        for(drink of this.state.cocktailData.drinks){
            let drinkName = drink.strDrink;
            let drinkImage = drink.strDrinkThumb; 
            let drinkDict = {name: drinkName,
            avatar_url: drinkImage};
            drinkArr.push(drinkDict);
        }
        //console.log(drinkArr);
        this.setState({
            cocktailList: drinkArr
        })
        console.log(this.state.cocktailList);
    }

    render () {   
        this.getCocktailData(this.compileCocktailList);
        return (
            <View>
                <Text>This is our BarBuddy App!</Text>
                <CocktailList cocktailList = {this.state.cocktailList}/>
            </View>
        )
    }
}
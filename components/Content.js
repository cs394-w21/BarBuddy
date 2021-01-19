import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { Text, View, ScrollView } from 'react-native';
import CocktailList from './CocktailList/index.js';
import IngredientsInput from './IngredientsInput/index.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cocktailList: [],
            cocktailData: {},
            dataReceived: 0,
            //allIngredients: [], //list of ingredients for us 
        } 
        this.getCocktailData = this.getCocktailData.bind(this);
        this.compileCocktailList = this.compileCocktailList.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //Fetch cocktail data.
    // pass cocktail info to cocktail componenet 
    // take cocktail componenet and input into cocktailist 


    handleChange(e) {
        console.log("clicked")
    }

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
        //console.log(this.state.cocktailData);
        //console.log("Drink 1");
        //console.log(this.state.cocktailData.drinks[0].strDrink);

        let drinkArr = [];
        let drink;
        //let allIng = []; //figure out ingredients
        for(drink of this.state.cocktailData.drinks){
            // get the ingredients for each drink 
            //TODO display each ingredients individually for filter
            let ingredientsArray = []; 
            
            for(let i=0; i<15; i++) {    
                let x = `strIngredient${i+1}`
                if (drink[x]!=null) {
                ingredientsArray.push(drink[x])
                }
                else{ break }
            }

            //allIng = allIng.concat(ingredientsArray); //figure out ingredients
            //console.log(ingredientsArray)

            let drinkDict = {
                name: drink.strDrink,
                avatar_url: drink.strDrinkThumb,
                ingredients: ingredientsArray
            };

            drinkArr.push(drinkDict);
        }
        //console.log(drinkArr);
        this.setState({
            cocktailList: drinkArr,
            //allIngredients: allIng
        })


        
    }

    render () {   
        this.getCocktailData(this.compileCocktailList);
        
        return (
            <View> 
                <SafeAreaProvider>
                    <SafeAreaView>
                        <Header
                            leftComponent={{ icon: 'menu', color: '#fff' }}
                            centerComponent={{ text: "BarBuddy", style: { color: '#fff', fontSize: 32, fontWeight: "bold"} }}
                            rightComponent={{ icon: 'home', color: '#fff' }}
                        />
                    </SafeAreaView>

                    <SafeAreaView>
                        <IngredientsInput handleChange = {this.state.handleChange} />
                    </SafeAreaView>

                    <SafeAreaView>
                        <ScrollView>
                            <CocktailList 
                                cocktailList = {this.state.cocktailList}
                                //allIngredients = {this.state.allIngredients}
                            />
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        )
    }
}
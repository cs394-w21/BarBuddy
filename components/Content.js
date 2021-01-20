import React, { Component } from 'react';
import { Header, Input } from 'react-native-elements';
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
            ingredients: [],
            filter_list: []
            //allIngredients: [], //list of ingredients for us 
        } 
        this.getCocktailData = this.getCocktailData.bind(this);
        this.compileCocktailList = this.compileCocktailList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterCocktailList = this.filterCocktailList.bind(this);
    }

    //Fetch cocktail data.
    // pass cocktail info to cocktail componenet 
    // take cocktail componenet and input into cocktailist 


    // handleChange(e) {
    //     console.log("clicked")
    // }

    getCocktailData(callback = () => { }) { 

        if(this.state.dataReceived == 0) { //render kept repeating
            fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php') //fetching popular cocktail data
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
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
            ingredientsArray = [...new Set(ingredientsArray)]

            //allIng = allIng.concat(ingredientsArray); //figure out ingredients
            //console.log(ingredientsArray)

            let drinkDict = {
                name: drink.strDrink,
                avatar_url: drink.strDrinkThumb,
                ingredients: ingredientsArray
            };
            drinkArr.push(drinkDict);
        }
        //sort drinkArr by drink name
        drinkArr.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          });
        // console.log("before" + drinkArr);
        this.setState({
            cocktailList: drinkArr,
            //allIngredients: allIng
        },this.filterCocktailList)
        //console.log("after" + this.state.cocktailList);
        //this.filterCocktailList();
    }

    filterCocktailList() {
        // console.log("we're in")
        let temp_list = [];
        let cocktail;
        let ingredient;
        //console.log("cocktail list", this.state.cocktailList);
        // take list from cocktail list and check if each one matches then 
        // console.log("ingredients", this.state.ingredients);
        for(cocktail of this.state.cocktailList) {
            let temp = true;                           // maybe try make more efficient 
            for(ingredient of cocktail.ingredients) {
                if (this.state.ingredients.includes(ingredient) != true) {
                    temp = false;
                } 
            }
            if (temp == true) {
                temp_list.push(cocktail);
            }
        }
        //console.log("temp list" + temp_list);
        this.setState({
            filter_list: temp_list,
        })
    }

    handleUserInput (userInput) {
        this.setState({
            ingredients: userInput.split(", ")
        }, this.filterCocktailList)

    }

    render () {   
        this.getCocktailData(this.compileCocktailList);
        //console.log(this.state.ingredientsString)
        
        return (
            <View> 
                <SafeAreaProvider>
                    <SafeAreaView>
                        <Header
                            //leftComponent={{ icon: 'menu', color: '#fff' }}
                            centerComponent={{ text: "BarBuddy", style: { color: '#fff', fontSize: 32, fontWeight: "bold"} }}
                            //rightComponent={{ icon: 'home', color: '#fff' }}
                        />
                    </SafeAreaView>
                    <h2>Input your ingredients below:</h2>
                    <Input
                        placeholder="Ingredients"
                        onChangeText={value => this.handleUserInput(value)}
                    />
                    {/* <SafeAreaView>
                        <IngredientsInput handleChange = {this.state.handleChange} />
                    </SafeAreaView> */}
                    <h2>Cocktails</h2>
                    <SafeAreaView>
                        <ScrollView>
                            <CocktailList 
                                cocktailList = {this.state.filter_list}
                                //allIngredients = {this.state.allIngredients}
                            />
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        )
    }
}
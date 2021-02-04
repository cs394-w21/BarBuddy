import React, { Component } from 'react';
import { Header, Input } from 'react-native-elements';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import CocktailList from './CocktailList/index.js';
import IngredientsInput from './IngredientsInput/index.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    headers: {
        fontWeight: 'bold',
        fontSize: 20,
    }
})

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cocktailList: [],
            cocktailData: {},
            dataReceived: 0,
            ingredients: [],
            filter_list: [],
            explore_list: [],
            //allIngredients: [], //list of ingredients for us 
        } 
        this.getCocktailData = this.getCocktailData.bind(this);
        this.compileCocktailList = this.compileCocktailList.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.filterCocktailList = this.filterCocktailList.bind(this);
        this.filterExploreList = this.filterExploreList.bind(this);
        this.filter = this.filter.bind(this);
    }

    //Fetch cocktail data.
    // pass cocktail info to cocktail componenet 
    // take cocktail componenet and input into cocktailist 


    // handleChange(e) {
    //     console.log("clicked")
    // }

    getCocktailData(callback = () => { }) { 
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        if(this.state.dataReceived == 0) { //render kept repeating
            fetch('https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=a') //fetching popular cocktail data
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                let cocktailDataTemp = []
                cocktailDataTemp = json.drinks //initialize cocktailDataTemp
                this.getCocktailDataHelper(cocktailDataTemp, callback, alphabet, 1)

            }).catch((error) => {
                console.error(error);
            });
        }
    }

    getCocktailDataHelper(cocktailDataTemp, callback, alphabet, i) {        
        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=${alphabet.substring(i, i+1)}`) //fetching popular cocktail data
        .then((response) => response.json())
        .then((json) => {
            //console.log(alphabet.substring(i, i+1), json);
            if(i < 25)
            {
                cocktailDataTemp = cocktailDataTemp.concat(json['drinks'])
                this.getCocktailDataHelper(cocktailDataTemp, callback, alphabet, i+1)               
            }
            else
            {
                cocktailDataTemp = cocktailDataTemp.concat(json['drinks'])
                cocktailDataTemp = cocktailDataTemp.filter(x => x !== null) //remove null
                let cocktailDataTempDict = {}
                cocktailDataTempDict.drinks = cocktailDataTemp


                this.setState({
                    cocktailData: cocktailDataTempDict,
                    dataReceived: 1
                }, callback)
            }
            

        }).catch((error) => {
            console.error(error);
        });
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
            let measuresArray = [];
            
            for(let i=0; i<15; i++) {    
                let x = `strIngredient${i+1}`
                let y = `strMeasure${i+1}`

                if ((drink[x]!=null) && (drink[x]!= "")) {
                    ingredientsArray.push(drink[x]);
                    if (drink[y] == null)
                    {
                        measuresArray.push("");
                    }
                    else
                    {
                        measuresArray.push(drink[y])
                    }
                }
                else{ break }
            }
            ///ingredientsArray = [...new Set(ingredientsArray)]

            //allIng = allIng.concat(ingredientsArray); //figure out ingredients
            //console.log(ingredientsArray)
            let drinkDict = {
                name: drink.strDrink,
                id: drink.idDrink,
                avatar_url: drink.strDrinkThumb,
                ingredients: ingredientsArray,
                measures: measuresArray,
                instructions: drink['strInstructions']
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

    filter(){
        this.filterCocktailList();
        this.filterExploreList();
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
                if (this.state.ingredients.includes(ingredient.toUpperCase()) != true) {
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
        },
        this.filterExploreList)
    }

    filterExploreList(){
        let temp_list = [];
        let cocktail;
        let ingredient;
        //console.log("cocktail list", this.state.cocktailList);
        // take list from cocktail list and check if each one matches then 
        // console.log("ingredients", this.state.ingredients);
        for(cocktail of this.state.cocktailList) {
            let temp = false;                           // maybe try make more efficient 
            for(ingredient of cocktail.ingredients) {
                if (this.state.ingredients.includes(ingredient.toUpperCase()) == true) {
                    temp = true;
                } 
            }
            if ((temp == true) && (!(this.state.filter_list.includes(cocktail)))){
                temp_list.push(cocktail);
            }
        }
        //also: filter explore list based on filter list
        //this.filterCocktailList();
        // for(cocktail of temp_list){
        //     if (this.state.filter_list.includes(cocktail)){
        //         console.log("Removing " + cocktail.name);
        //         temp_list.filter((cocktail) => c;
        //     }
        // }

        //console.log("temp list" + temp_list);
        this.setState({
            explore_list: temp_list,
        })
    }

    handleUserInput (userInput) {
        this.setState({
            ingredients: userInput.split(", ").map((input) => input.toUpperCase())
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
                    <Text style={styles.headers}>
                        Input your ingredients below:
                    </Text>
                    <Input
                        placeholder="Ingredients"
                        onChangeText={value => this.handleUserInput(value)}
                    />
                    {/* <SafeAreaView>
                        <IngredientsInput handleChange = {this.state.handleChange} />
                    </SafeAreaView> */}
                    <Text style={styles.headers}>
                        Cocktails: Exact
                    </Text>
                    <SafeAreaView>
                        <ScrollView>
                            <CocktailList 
                                cocktailList = {this.state.filter_list}
                                //allIngredients = {this.state.allIngredients}
                            />
                        </ScrollView>
                    </SafeAreaView>
                    <Text style={styles.headers}>
                        Cocktails: Explore
                    </Text>
                    <SafeAreaView>
                        <ScrollView>
                            <CocktailList 
                                cocktailList = {this.state.explore_list}
                                //allIngredients = {this.state.allIngredients}
                            />
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        )
    }
}
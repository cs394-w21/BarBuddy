import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import {ExpandableListView} from 'react-native-expandable-listview';


function handleItemClick({index}) {
    console.log(index);
  };

function handleInnerItemClick({innerIndex, item, itemIndex}) {
    console.log(innerIndex);
  };


export default class CocktailList extends Component {
    

    
    render () {
        console.log(this.props.cocktailList)
        //console.log("ingredients")
        //console.log(this.props.allIngredients)
        //let uniqueDrinks = [...new Set(this.props.allIngredients)]
        //console.log(uniqueDrinks);

        return (
            <View>
                <ExpandableListView
                    data={this.props.cocktailList} // required
                    onInnerItemClick={handleInnerItemClick}
                    onItemClick={handleItemClick}
                />
            </View>
        )

    }

}
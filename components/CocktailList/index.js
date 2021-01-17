import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'


export default class CocktailList extends Component {


    render () {
        
        return (
            <View>
                {
                    this.props.cocktailList.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                        <Avatar source={{uri: l.avatar_url}} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.ingredients}</ListItem.Subtitle>
                        </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
        )

    }

}
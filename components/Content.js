import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'


export default class Content extends Component {
    constructor(props) {
        super(props);

        /*this.state = {

        }*/
    }

    render () {
        const list = [
        {
            name: 'Classic Margarita',
            avatar_url: 'https://i1.wp.com/www.moodymixologist.com/wp-content/uploads/2020/02/classic-margarita-cocktail-recipe-03-3560629.jpg?w=733&ssl=1',
            ingredients: 'ingredients'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            ingredients: 'ingredients'
        },
        ]

        return (
            <div>
                <View>
                {
                list.map((l, i) => (
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
            </div>
        )
    }
}
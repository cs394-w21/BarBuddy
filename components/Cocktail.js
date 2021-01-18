import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ListItem, Icon } from 'react-native-elements';

const list = {
    "list": [
{
    title: 'Appointments',
    icon: 'av-timer'
},
{
    title: 'Trips',
    icon: 'flight-takeoff'
},
//... // more items
]
};

<View>
  {
    list.map((item, i) => (
      <ListItem key={i} bottomDivider>
        <Icon name={item.icon} />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
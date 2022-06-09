import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CardsScreen } from '../../screens/cards/cards';
import { Routes } from './routes';

const RootStack = createStackNavigator();

export function RootStackView() {
  return (
    <RootStack.Navigator initialRouteName={Routes.CARDS_LIST} headerMode="none">
      <RootStack.Screen name={Routes.CARDS_LIST} component={CardsScreen} />
    </RootStack.Navigator>
  );
}

export function Router() {
  return (
    <NavigationContainer>
      <RootStackView />
    </NavigationContainer>
  );
}

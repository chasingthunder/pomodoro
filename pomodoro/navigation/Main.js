import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Pomodoro from './screens/Pomodoro';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Pomodoro" component={Pomodoro} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

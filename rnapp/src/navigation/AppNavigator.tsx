import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import HomeScreen from '../screens/home/mainComponent';
import DetailScreen from '../screens/detail/mainComponent';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: '#FF6200' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerTitle: 'conditions/takahara',
            headerStyle: { backgroundColor: '#FF6200' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

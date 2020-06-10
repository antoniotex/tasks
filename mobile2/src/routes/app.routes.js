import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import NewPoster from '../pages/NewPoster';

const AppStack = createDrawerNavigator();

const AppRoutes = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="NewPoster" component={NewPoster} />
            <AppStack.Screen name="Home" component={Home} />
        </AppStack.Navigator>
    )
}

export default AppRoutes;
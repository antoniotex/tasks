import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import NewPoster from '../pages/NewPoster';
import Poster from '../pages/Poster'

const AppStack = createDrawerNavigator();
const PosterStack = createStackNavigator()

const PosterRoutes = () => {
    return (
        <PosterStack.Navigator initialRouteName="Home">
            <AppStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <AppStack.Screen name="Poster" component={Poster} options={{
                title: 'Anúncio'
            }} />
        </PosterStack.Navigator>
    )
}

const AppRoutes = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="PosterRoutes" component={PosterRoutes} options={{
                title: 'Início'
            }} />
            <AppStack.Screen name="NewPoster" component={NewPoster} />
        </AppStack.Navigator>
    )
}

export default AppRoutes;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import NewPoster from '../pages/NewPoster';
import Poster from '../pages/Poster'
import MyPosters from '../pages/MyPosters'
import Settings from '../pages/Settings';
import Categories from '../pages/Categories';

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

const NewPosterRoutes = () => {
    return (
        <PosterStack.Navigator initialRouteName="NewPoster">
            <AppStack.Screen name="NewPoster" component={NewPoster} options={{
                headerShown:false,
                title: 'Voltar',
                unmountOnBlur: true
            }} />
            <AppStack.Screen name="Categories" component={Categories} options={{
                title: 'Categorias',
                unmountOnBlur: true
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
            <AppStack.Screen name="NewPosterRoutes" component={NewPosterRoutes} options={{
                title:'Anunciar',
                unmountOnBlur: true
            }} />
            <AppStack.Screen name="MyPosters" component={MyPosters} options={{
                title: 'Meus anúncios'
            }} />
            <AppStack.Screen name="Settings" component={Settings} options={{
                title: 'Configurações',
            }} />
        </AppStack.Navigator>
    )
}

export default AppRoutes;
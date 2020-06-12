import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import SignIn from '../pages/SignIn'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Poster from '../pages/Poster'

const AuthDrawer = createDrawerNavigator()
const PosterStack = createStackNavigator()

const PosterRoutes = () => {
    return (
        <PosterStack.Navigator initialRouteName="Home">
            <AuthDrawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <AuthDrawer.Screen name="Poster" component={Poster} options={{
                title: 'Anúncio'
            }} />
        </PosterStack.Navigator>
    )
}

const AuthRoutes = () => {
    return (
        <AuthDrawer.Navigator initialRouteName="PosterRoutes">
            <AuthDrawer.Screen name="PosterRoutes" component={PosterRoutes} options={{
                title: 'Início'
            }} />
            <AuthDrawer.Screen name="SignIn" component={SignIn} options={{
                title: 'Entrar'
            }} />
            <AuthDrawer.Screen name="Register" component={Register} options={{
                title: 'Criar conta'
            }} />
        </AuthDrawer.Navigator>
    )
}

export default AuthRoutes
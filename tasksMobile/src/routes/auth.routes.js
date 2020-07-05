import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import SignIn from '../pages/SignIn'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Poster from '../pages/Poster'
import ForgotPassword from '../pages/ForgotPassword'

const AuthDrawer = createDrawerNavigator()
const PosterStack = createStackNavigator()

const LoginRoutes = () => {
    return (
        <PosterStack.Navigator initialRouteName="SignIn">
            <AuthDrawer.Screen name="SignIn" component={SignIn} options={{
                headerShown:false,
                title: 'Entrar'
            }} />
            <AuthDrawer.Screen name="Register" component={Register} options={{
                title: 'Nova conta',
            }} />
            <AuthDrawer.Screen name="ForgotPassword" component={ForgotPassword} options={{
                title: 'Redefinição de senha',
            }} />
        </PosterStack.Navigator>
    )
}

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
        <AuthDrawer.Navigator drawerContentOptions={{
            activeTintColor: '#f73859',
            itemStyle: { marginVertical: 10 },
        }}>
            <AuthDrawer.Screen name="PosterRoutes" component={PosterRoutes} options={{
                title: 'Início'
            }} />
            <AuthDrawer.Screen name="LoginRoutes" component={LoginRoutes} options={{
                title: 'Login'
            }} />
        </AuthDrawer.Navigator>
    )
}

export default AuthRoutes
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Register from '../pages/Register';

const AuthStack = createDrawerNavigator();

const SignInOptions = {
    headerTransparent: true
}

const AuthRoutes = () => {
    return (
        <AuthStack.Navigator initialRouteName="Home">
            <AuthStack.Screen name="Home" component={Home} options={{
                title: 'Início'
            }} />
            <AuthStack.Screen name="SignIn" component={SignIn} options={{
                title: 'Entrar'
            }} />
            <AuthStack.Screen name="Register" component={Register} options={{
                title: 'Fazer cadastro'
            }} />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;
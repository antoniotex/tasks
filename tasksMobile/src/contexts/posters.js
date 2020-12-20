import React, { createContext, useState, useEffect } from 'react';
import { Alert, Platform, PermissionsAndroid, ios } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import api from '../services/api';

const PosterContext = createContext({ posters: [] });

export const PosterProvider = ({ children }) => {
    const [posters, setPosters] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [posterEditId, setPosterEditId] = useState()
    const [hasLocationPermission, setHasLocationPermission] = useState(null)
    const [userPosition, setUserPosition] = useState(false)
    const [initialPosition, setInitialPosition] = useState(null)

    async function getlocation(){
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                async position => {
                    setUserPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                    resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                },
                error => {
                    reject({success: false, errorCode: error.code, errorMessage: error.message})
                }
            )
        })
    }

    async function checkGPSPermission(){
        if(Platform.OS === 'ios'){
            return new Promise((resolve, reject) => {
                check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                  .then(async result => {
                    if(result === 'blocked'){
                        setHasLocationPermission(false)
                        resolve({ success: false, permission:false })
                    }else if(result === 'denied'){
                        setHasLocationPermission(result != 'blocked')
                        resolve({ success: true, permission: result != 'blocked' })
                    }else{
                        setHasLocationPermission(true)
                        resolve({ success: true, permission:true })
                    }
                })
            })
        }else{
            return new Promise((resolve, reject) => {
                check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                  .then(async result => {
                    if(result === 'blocked'){
                        setHasLocationPermission(false)
                        resolve({ success: false, permission:false })
                    }else if(result === 'denied'){
                            resolve({ success: true, permission: result != 'blocked' })
                    }else{
                        resolve({ success: true, permission:true })
                    }
                })
            })
        }
    }

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');

            if (storageUser && storageToken) {
                // setUser(JSON.parse(storageUser));
                setLoading(false);
            } else if (!storageUser && !storageToken) {
                setLoading(false);
            }
        }

        loadPosters()
        loadStorageData()
    }, [])

    async function changePosterMode(id) {
        await setPosterEditId(id)
    }

    async function loadPosters(query) {
        let latitude
        let longitude

        try {
            const permission = await checkGPSPermission()
            const location = await getlocation()
    
            if(permission.permission){
                latitude = userPosition ? userPosition.latitude : location.latitude
                longitude = userPosition ? userPosition.longitude : location.longitude
            }
    
        } catch (error) {
            console.log('error', error)
        }
        const search = query ? `/search?query=${query}` : ''
        const response = await api.get(`/posters${search ? search : '?'}${latitude ? `&latitude=${latitude}&longitude=${longitude}` : ''}`)
        

        await setPosters(response.data)
        setLoading(false) 
    }

    async function loadCategories() {
        const response = await api.get('/categories')
        setCategories(response.data)
    }

    return (
        <PosterContext.Provider value={{
            posters, loadPosters,
            categories, loadCategories,
            posterEditId, changePosterMode,
            loading, setLoading
        }} >
            {children}
        </PosterContext.Provider>
    )
}

export default PosterContext;

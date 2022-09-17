
import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core'

import * as Notifications from 'expo-notifications';


import { Background } from "./src/components/Background";
import { Routes } from './src/routes/index';
import { Loading } from './src/components/Loading';

//notificacoes
import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken'


export default function App() {
  
  //observa quando chega notificacao
  const getNotificationListener = useRef<Subscription>();
  
  //responde a notificacao levando o user ao app
  const responseNotificationListener = useRef<Subscription>()
  
  //n ta funcionando
  useEffect(()=>{
    getPushNotificationToken()
  })

  useEffect(()=>{
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    })

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response =>{
      console.log(response);
      
    })

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current){
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  },[])

  //carrega fonte para aplicacao
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
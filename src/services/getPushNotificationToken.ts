import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {

    //acessar se o usuario permitiu notificacoes do app 
    const { granted } = await Notifications.getPermissionsAsync()

    if (!granted) {
        await Notifications.requestPermissionsAsync()
    }

    if (granted) {
        const pushToken = await Notifications.getExpoPushTokenAsync();
        console.log("NOTIFICATION TOKEN", pushToken.data);

        return pushToken.data
    }

}
import {SplashScreen, Stack} from "expo-router";
import "./globals.css"
import {useFonts} from 'expo-font';
import {useEffect} from "react";
import * as Sentry from '@sentry/react-native';
import {useAuthStore} from "@/store/auth.store";

Sentry.init({
  dsn: 'https://d2da90d922a2f644457ffdab58e1928d@o4509707062280192.ingest.de.sentry.io/4509707063459920',

  sendDefaultPii: true,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

});

export default Sentry.wrap(function RootLayout() {
    const {isLoading,fetchAuthenticatedUser} = useAuthStore();

    const [fontsLoaded, error] = useFonts({
        "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
        "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
        "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
        "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
        "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    useEffect(() => {
        fetchAuthenticatedUser()
    }, []);

    if(!fontsLoaded || isLoading) return null;

    return <Stack screenOptions={{headerShown: false}}/>;
});
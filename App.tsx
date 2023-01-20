import './src/lib/dayjs';
import { Fragment } from 'react';
import { Routes } from './src/routes';
import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <Fragment>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </Fragment>
  );
}

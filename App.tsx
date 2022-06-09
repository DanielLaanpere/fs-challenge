import React from 'react';
import { useFonts } from 'expo-font';

import { Fonts } from './src/components/theme/fonts';
import { Router } from './src/components/router/router';
import { Apollo } from './src/providers/apollo-client';

export default function App() {
  let [fontsLoaded] = useFonts({
    [Fonts.ProximaNovaARegular]: require('./assets/fonts/ProximaNova-Regular.otf'),
    [Fonts.ProximaNovaAThin]: require('./assets/fonts/ProximaNova-Thin.otf'),
    [Fonts.ProximaNovaABold]: require('./assets/fonts/ProximaNova-Bold.otf'),
    [Fonts.ProximaNovaAExtrabold]: require('./assets/fonts/ProximaNova-Extrabold.otf'),
    [Fonts.ProximaNovaABlack]: require('./assets/fonts/ProximaNova-Black.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Apollo>
      <Router />
    </Apollo>
  );
}

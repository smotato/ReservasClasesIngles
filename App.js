import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ClasesStack from './src/navigation/ClasesStack';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/theme';
import { ReservasProvider } from './src/context/ReservasContext';
import AppTabs from './src/navigation/AppTabs';

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.text,
    primary: colors.text,
    text: colors.text,
    border: colors.border,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ReservasProvider>
        <NavigationContainer theme={temaNavegacion}>
          <StatusBar style="dark" />
          <AppTabs />
        </NavigationContainer>
      </ReservasProvider>
    </SafeAreaProvider>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

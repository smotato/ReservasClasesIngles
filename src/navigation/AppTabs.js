import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ClasesStack from './ClasesStack';
import ReservasScreen from '../screens/ReservasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

const iconos = {
  InicioTab: 'home',
  ReservasTab: 'calendar',
  PerfilTab: 'person',
};

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.buttons,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.borderSoft },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconos[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="InicioTab" component={ClasesStack} />
      <Tab.Screen name="ReservasTab" component={ReservasScreen} />
      <Tab.Screen name="PerfilTab" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
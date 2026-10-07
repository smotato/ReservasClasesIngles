import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import DetalleClaseScreen from "../screens/DetalleClaseScreen";

const Stack = createNativeStackNavigator();

export default function ClasesStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={StartScreen}
                options={{headerShown: false, title: 'Home'}}
            />
            <Stack.Screen
                name="DetalleClase"
                component={DetalleClaseScreen}
                options={{headerShown: false, title: 'Detalle'}}
            />
        </Stack.Navigator>
    )
}
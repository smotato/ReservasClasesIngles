import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import EtiquetaNivel from './EtiquetaNivel'
import { colors, radius, spacing, typography } from '../theme'
import { formatearPrecio } from '../data/classes'

export default function Card({ clase, onPress }) {
    return (
        <Pressable
            onPress={onPress}>
                <Image source={{uri: clase.imagen}}/>
                <View>
                    <EtiquetaNivel nivel={clase.nivel}/>
                </View>
        </Pressable>
    )
}

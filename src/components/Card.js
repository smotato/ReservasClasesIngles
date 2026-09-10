import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import EtiquetaNivel from './EtiquetaNivel'
import { colors, radius, spacing, typography } from '../theme'
import { CLASES, formatearPrecio } from '../data/classes'

export default function Card({ clase, onPress }) {
    return (
        <Pressable
            onPress={onPress}>
                <Image source={{uri: clase.imagen}}/>
                <View>
                    <EtiquetaNivel nivel={clase.nivel}/>
                    <Text style={styles.titulo}>{clase.titulo}</Text>
                    <Text>{clase.nivel}</Text>
                    <Text>{clase.profesor.nombre}</Text>
                    <Text>formatearPrecio({clase.precio})</Text>
                </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    titulo: {fontSize: 16, color: colors.text}
})
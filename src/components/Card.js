import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import EtiquetaNivel from './EtiquetaNivel'
import { colors, radius, spacing, typography } from '../theme'
import { CLASES, formatearPrecio } from '../data/classes'

export default function Card({ clase, onPress }) {
    return (
        <Pressable
            onPress={onPress}>
                <View style={{marginBottom: spacing.lg}}>
                    <EtiquetaNivel nivel={clase.nivel}/>
                    <Text style={styles.title}>{clase.titulo}</Text>
                    <Image source={{ uri: clase.imagen }} resizeMode="cover" style={styles.imagen} />
                    <Text>{clase.nivel}</Text>
                    <Text>{clase.profesor.nombre}</Text>
                    <Text>{formatearPrecio(clase.precio)}</Text>
                </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    title: { fontSize: 16, fontWeight: '600', color: colors.text },
    imagen: {
        width: '100%',
        height: 180, // o el alto que quieras
        borderRadius: radius.md, // opcional
    }
})
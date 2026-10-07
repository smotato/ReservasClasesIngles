import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import EtiquetaNivel from './EtiquetaNivel'
import { colors, radius, spacing } from '../theme'
import { formatearPrecio } from '../data/classes'

const GRIS_TEXTO = '#6B7280'
const GRIS_BORDE = '#E3E5E8'

export default function Card({ clase, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.sombra,
                pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
            ]}
        >
            {/* Contenedor interno: recorta la imagen con las esquinas redondeadas */}
            <View style={styles.card}>
                <View>
                    <Image
                        source={{ uri: clase.imagen }}
                        resizeMode="cover"
                        style={styles.imagen}
                    />
                    <EtiquetaNivel nivel={clase.nivel} style={styles.etiqueta} />
                </View>

                <View style={styles.contenido}>
                    <Text style={styles.titulo} numberOfLines={2}>
                        {clase.titulo}
                    </Text>

                    <View style={styles.profesor}>
                        {clase.profesor.foto ? (
                            <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
                        ) : (
                            <Ionicons name="person-circle-outline" size={24} color={GRIS_TEXTO} />
                        )}
                        <Text style={styles.profesorNombre} numberOfLines={1}>
                            {clase.profesor.nombre}
                        </Text>
                    </View>

                    <View style={styles.pie}>
                        <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
                        <View style={styles.flecha}>
                            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    // La sombra va en un contenedor sin overflow:hidden (si no, iOS la ignora)
    sombra: {
        flex: 1,
        marginBottom: spacing.lg,
        borderRadius: radius.lg,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    card: {
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: GRIS_BORDE,
    },
    imagen: {
        width: '100%',
        height: 180,
        backgroundColor: GRIS_BORDE,
    },
    etiqueta: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.md,
    },
    contenido: {
        padding: spacing.lg,
        gap: spacing.md,
    },
    titulo: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
        lineHeight: 24,
    },
    profesor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: GRIS_BORDE,
    },
    profesorNombre: {
        flex: 1,
        fontSize: 14,
        color: GRIS_TEXTO,
        fontWeight: '500',
    },
    pie: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: GRIS_BORDE,
        paddingTop: spacing.md,
    },
    precio: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.buttons,
    },
    flecha: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.text,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
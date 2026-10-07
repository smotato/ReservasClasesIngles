import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, spacing, radius } from '../theme'

export default function EtiquetaNivel({ nivel, style }) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{nivel}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.buttons,
        borderRadius: radius.full,
    },
    text: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    },
})
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, spacing, radius } from '../theme'

export default function EtiquetaNivel({ nivel }) {
    return (
        <View style={[ styles.container, {backgroundColor: colors.buttons} ]}>
            <Text style={ styles.text }> { nivel } </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'auto',
        paddingVertical: 3,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.buttons,
        borderRadius: radius.sm
    },
    text: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3, color: colors.surface }
})
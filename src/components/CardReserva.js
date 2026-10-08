import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import EtiquetaNivel from './EtiquetaNivel'
import { colors, radius, spacing } from '../theme'
import { formatearPrecio } from '../data/classes'

export default function CardReserva({ reserva, onCancelar }) {
    return (
        <View style={styles.sombra}>
            <View style={styles.card}>
                {/* Nivel + precio */}
                <View style={styles.encabezado}>
                    <EtiquetaNivel nivel={reserva.nivel} />
                    <Text style={styles.precio}>{formatearPrecio(reserva.precio)}</Text>
                </View>

                <Text style={styles.titulo} numberOfLines={2}>
                    {reserva.titulo}
                </Text>

                {/* Detalles */}
                <View style={styles.detalles}>
                    <View style={styles.fila}>
                        <Ionicons name="person-outline" size={16} color={colors.buttons} />
                        <Text style={styles.detalleTexto} numberOfLines={1}>
                            {reserva.profesor}
                        </Text>
                    </View>
                    <View style={styles.fila}>
                        <Ionicons name="calendar-outline" size={16} color={colors.buttons} />
                        <Text style={styles.detalleTexto}>{reserva.horario}</Text>
                    </View>
                    {reserva.duracion ? (
                        <View style={styles.fila}>
                            <Ionicons name="time-outline" size={16} color={colors.buttons} />
                            <Text style={styles.detalleTexto}>{reserva.duracion} min</Text>
                        </View>
                    ) : null}
                </View>

                {/* Cancelar: entrega el id a quien use la card */}
                <Pressable
                    onPress={() => onCancelar(reserva.id)}
                    style={({ pressed }) => [styles.botonCancelar, pressed && { opacity: 0.7 }]}
                >
                    <Ionicons name="close-circle-outline" size={18} color={colors.buttons} />
                    <Text style={styles.botonCancelarTexto}>Cancelar reserva</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // La sombra va en un contenedor sin overflow:hidden (si no, iOS la ignora)
    sombra: {
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
        borderColor: colors.borderSoft,
        padding: spacing.lg,
        gap: spacing.md,
    },
    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    precio: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.buttons,
    },
    titulo: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
        lineHeight: 24,
    },
    detalles: {
        gap: spacing.sm,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.borderSoft,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    detalleTexto: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: colors.textMuted,
    },
    botonCancelar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.md,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.buttons,
    },
    botonCancelarTexto: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.buttons,
    },
})
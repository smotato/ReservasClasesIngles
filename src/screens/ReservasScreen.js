import React, { useState, useMemo } from 'react'
import { View, Text, Pressable, StyleSheet, TextInput, FlatList, StatusBar, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, radius, spacing } from '../theme'
import CardReserva from '../components/CardReserva'
import EstadoVacio from '../components/EstadoVacio'
import useReserva from '../hooks/useReserva'

export default function ReservasScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { reservas, cancelarReserva } = useReserva();

    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();
        return reservas.filter((reserva) =>
            texto === '' ||
            reserva.titulo.toLowerCase().includes(texto) ||
            reserva.profesor.toLowerCase().includes(texto) ||
            reserva.nivel.toLowerCase().includes(texto) ||
            reserva.horario.toLowerCase().includes(texto)
        );
    }, [reservas, busqueda]);

    const handleCancelar = (id) => {
        Alert.alert(
            'Cancelar reserva',
            '¿Seguro que quieres cancelar esta reserva?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Sí, cancelar',
                    style: 'destructive',
                    onPress: () => {
                        cancelarReserva(id);
                    },
                },
            ]
        );
    };

    return (
        <View style={style.pantalla}>
            <StatusBar barStyle="light-content" />

            <View style={[style.cabecera, { paddingTop: insets.top + spacing.lg }]}>
                <Text style={style.sobretitulo}>MIS CLASES</Text>
                <Text style={style.titulo}>Mis reservas</Text>

                <View style={style.buscador}>
                    <Ionicons name="search" size={18} color={colors.textMuted} />
                    <TextInput
                        value={busqueda}
                        onChangeText={setBusqueda}
                        placeholder="Busca por clase, profesor o nivel"
                        placeholderTextColor={colors.textMuted}
                        autoCorrect={false}
                        autoComplete="off"
                        style={style.input}
                    />
                    {busqueda.length > 0 && (
                        <Pressable onPress={() => setBusqueda('')} hitSlop={8}>
                            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                        </Pressable>
                    )}
                </View>
            </View>

            <Text style={[style.contador, { paddingHorizontal: spacing.lg }]}>
                {resultados.length} {resultados.length === 1 ? 'reserva' : 'reservas'}
            </Text>

            {/* Lista */}
            <FlatList
                data={resultados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CardReserva reserva={item} onCancelar={handleCancelar} />
                )}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingHorizontal: spacing.lg,
                    paddingTop: spacing.sm,
                    paddingBottom: spacing.xl,
                    flexGrow: 1,
                }}
                ListEmptyComponent={
                    reservas.length === 0 ? (
                        <EstadoVacio
                            icono="calendar-outline"
                            titulo="Aún no tienes reservas"
                            mensaje="Reserva una clase y aparecerá aquí"
                            onAction={() => navigation.navigate('InicioTab')}
                        />
                    ) : (
                        <EstadoVacio
                            icono="search-outline"
                            titulo="No encontramos resultados"
                            mensaje="Prueba con otra combinación de palabras"
                            onAction={() => setBusqueda('')}
                        />
                    )
                }
            />
        </View>
    )
}

const style = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.backgroundSoft },

    cabecera: {
        backgroundColor: colors.text,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
    },
    sobretitulo: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: colors.buttons,
        marginBottom: spacing.xs,
    },
    titulo: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 30,
    },

    buscador: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: '#FFFFFF',
        borderRadius: radius.md,
        paddingHorizontal: spacing.lg,
        height: 48,
        marginTop: spacing.lg,
    },
    input: { flex: 1, fontSize: 14, color: colors.text, paddingVertical: 0 },

    contador: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textMuted,
        marginTop: spacing.lg,
        marginBottom: spacing.xs,
    },
})
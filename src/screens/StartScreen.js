import React, { useState, useMemo } from 'react'
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView, FlatList, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, radius, spacing } from '../theme'
import { CLASES, NIVELES } from '../data/classes'
import Card from '../components/Card'
import useResponsive from '../hooks/useResponsive'
import EstadoVacio from '../components/EstadoVacio'

// Colores locales (no modifican el tema global)
const GRIS_FONDO = '#F4F5F7'
const GRIS_TEXTO = '#6B7280'
const GRIS_BORDE = '#E3E5E8'

export default function StartScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { columnas, paddingHorizontal } = useResponsive();

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincideTexto =
                texto === '' ||
                clase.profesor.nombre.toLowerCase().includes(texto) ||
                clase.titulo.toLowerCase().includes(texto) ||
                clase.nivel.toLowerCase().includes(texto);

            return coincideNivel && coincideTexto;
        });
    }, [nivel, busqueda]);

    return (
        <View style={style.pantalla}>
            <StatusBar barStyle="light-content" />

            {/* Cabecera oscura */}
            <View style={[style.cabecera, { paddingTop: insets.top + spacing.lg }]}>
                <Text style={style.sobretitulo}>CLASES DE INGLÉS</Text>
                <Text style={style.titulo}>Aplicación de reserva para clases de inglés</Text>

                <View style={style.buscador}>
                    <Ionicons name="search" size={18} color={GRIS_TEXTO} />
                    <TextInput
                        value={busqueda}
                        onChangeText={setBusqueda}
                        placeholder="Busca por nombre o nivel"
                        placeholderTextColor={GRIS_TEXTO}
                        autoCorrect={false}
                        autoComplete="off"
                        style={style.input}
                    />
                    {busqueda.length > 0 && (
                        <Pressable onPress={() => setBusqueda('')} hitSlop={8}>
                            <Ionicons name="close-circle" size={18} color={GRIS_TEXTO} />
                        </Pressable>
                    )}
                </View>
            </View>

            {/* Filtros */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={style.filtros}
                contentContainerStyle={style.filtrosContenido}
            >
                {NIVELES.map((item) => {
                    const activo = nivel === item;
                    return (
                        <Pressable
                            key={item}
                            onPress={() => setNivel(item)}
                            style={({ pressed }) => [
                                style.chip,
                                activo && style.chipActivo,
                                pressed && { opacity: 0.8 },
                            ]}
                        >
                            <Text style={[style.chipTexto, activo && style.chipTextoActivo]}>
                                {item}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            <Text style={[style.contador, { paddingHorizontal: spacing.lg }]}>
                {resultados.length} {resultados.length === 1 ? 'clase disponible' : 'clases disponibles'}
            </Text>

            {/* Lista */}
            <FlatList
                key={columnas}
                data={resultados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card
                        clase={item}
                        onPress={() => navigation.navigate('DetalleClase', { clase: item })}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal,
                    paddingTop: spacing.sm,
                    paddingBottom: insets.bottom + spacing.xl,
                    flexGrow: 1,
                }}
                numColumns={columnas}
                ListEmptyComponent={
                    <EstadoVacio
                        icono="search-outline"
                        titulo="No encontramos resultados"
                        mensaje="Prueba con otra combinación de palabras"
                        onAction={() => {
                            setNivel('Todos');
                            setBusqueda('');
                        }}
                    />
                }
            />
        </View>
    )
}

const style = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: GRIS_FONDO },

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

    filtros: {
        flexGrow: 0,
        flexShrink: 0,
        marginTop: spacing.lg,
    },
    filtrosContenido: {
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
    },
    chip: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.full,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: GRIS_BORDE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipActivo: {
        backgroundColor: colors.buttons,
        borderColor: colors.buttons,
    },
    chipTexto: { fontSize: 13, fontWeight: '600', color: colors.text },
    chipTextoActivo: { color: '#FFFFFF' },

    contador: {
        fontSize: 13,
        fontWeight: '600',
        color: GRIS_TEXTO,
        marginTop: spacing.lg,
        marginBottom: spacing.xs,
    },
});
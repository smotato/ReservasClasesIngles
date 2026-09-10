import React, {useState, useEffect, useMemo } from 'react'
import { View, Text, Image, Pressable, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EtiquetaNivel from '../components/EtiquetaNivel'
import { colors, radius, spacing, typography } from '../theme'
import { CLASES, NIVELES } from '../data/classes'
import NivelChip from '../components/NivelChip'
import Card from '../components/Card'
import useResponsive from '../hooks/useResponsive'

export default function StartScreen ({ navigation }){
    const insets = useSafeAreaInsets();

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincideTexto = textoBusqueda || 
            textoBusqueda === '' ||
            clase.profesor.nombre.toLowerCase().includes(textoBusqueda) ||
            clase.titulo.toLowerCase().includes(textoBusqueda)

            return coincideNivel && coincideTexto
        });
    }, [nivel, busqueda]);

    return(
        <View style = {[style.pantalla, {paddingTop: insets.top + spacing.md}]}>
            <View>
                <Text style={typography.title}>Aplicación de reserva para clases de inglés</Text>
                <Ionicons name="search" size={18} color={colors.text}/>
                <TextInput 
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder="Ingrese el nombre o nivel para la búsqueda"
                    autoCorrect={false}
                    autoComplete="off"
                />
                {
                    busqueda.length > 0 && (
                        <Ionicons 
                            name="close-circle"
                            size={18} 
                            color={colors.background}
                            onPress={()=> setBusqueda('')}
                        />
                    )
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator = {false}
                style={{flexGrow: 0}}
            >
                {
                    NIVELES.map((item) => (
                        <NivelChip 
                            key={item}
                            etiqueta={item}
                            activo={item}
                            onPress={() => setNivel(item)}
                        />
                    ))
                }

            </ScrollView>

            <FlatList 
                data={resultados}
                keyExtractor={(item)=> item.id}
                renderItem={(item)=>(
                    <Card 
                        clase={item}
                        onPress={()=> navigation.navigate('DetalleClase', {clase:item})}
                    />
                )}
                contentContainerStyle={{
                    paddingHorizontal,
                    flexGrow: 1
                }}
            />
        </View>
    )
}

const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.background },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: { flex: 1, fontSize: 14, color: colors.text, paddingVertical: 0 },
});
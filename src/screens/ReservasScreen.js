import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, typography } from '../theme';
import { formatearPrecio } from '../data/classes';
import { useReservas } from '../context/ReservasContext';

export default function ReservasScreen() {
  const insets = useSafeAreaInsets();
  const { reservas } = useReservas();

  return (
    <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
      <Text style={[typography.title, styles.titulo]}>Mis reservas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.backgroundSoft },
  titulo: { paddingHorizontal: spacing.lg },
  vacio: { textAlign: 'center', color: colors.textMuted, marginTop: spacing.xl },
});
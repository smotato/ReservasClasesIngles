import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
      <Text style={typography.title}>Mi perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.backgroundSoft, paddingHorizontal: spacing.lg },
});
import react from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

export default function EstadoVacio ({icono='calendar-outline', titulo, mensaje, onAction}){
    return(
        <View style={styles.contenedor}>
            <View style={styles.circulo}>
                <Ionicons name={icono} size={34} color={colors.buttons} />
            </View>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.mensaje}>{mensaje}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  circulo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  titulo: { fontSize: 17, fontWeight: '700', color: colors.text, textAlign: 'center' },
  mensaje: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
});
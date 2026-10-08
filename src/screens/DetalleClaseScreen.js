import React, { useState, useMemo } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EtiquetaNivel from "../components/EtiquetaNivel";
import { colors, spacing, typography, radius } from "../theme";
import { formatearPrecio, formatearCuposDisponibles } from "../data/classes";
import useReserva from "../hooks/useReserva";

export default function DetalleClaseScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { reservas, agregarReserva } = useReserva();
  const { clase } = route.params;
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const cuposDisponibles = formatearCuposDisponibles(clase, reservas);

  const handleReservar = () => {
    if (cuposDisponibles <= 0) {
      Alert.alert('Sin cupos', 'No se puede reservar, no hay cupos disponibles.');
      return;
    } 

    if (!horarioSeleccionado) {
      Alert.alert('Selecciona un horario', 'Elige uno de los horarios disponibles.');
      return;
    }

    const resultado = agregarReserva(clase, horarioSeleccionado);

    if (!resultado.ok) {
      if (resultado.motivo === 'duplicada') {
        Alert.alert('Ya reservada', 'Ya tienes esta clase en ese horario.');
      } else if (resultado.motivo === 'cruce') {
        Alert.alert(
          'Horario ocupado',
          `Se cruza con "${resultado.conflicto.titulo}" (${resultado.conflicto.horario}).`
        );
      } else {
        Alert.alert('Un momento', 'Aún se están cargando tus reservas, intenta de nuevo.');
      }
      return;
    }

    Alert.alert('Reserva exitosa', 'Has reservado la clase exitosamente.');
  };

  return (
    <View style={styles.pantalla}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Image source={{ uri: clase.imagen }} resizeMode="cover" style={styles.portada} />

        <View style={styles.contenido}>
          <View style={styles.profesor}>
            <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
            <View>
              <Text style={styles.etiqueta}>Profesor</Text>
              <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
              <Text style={styles.pais}>{clase.profesor.pais}</Text>
            </View>
          </View>

          <View style={styles.datos}>
            <View style={styles.dato}>
              <Ionicons name="cash-outline" size={20} color={colors.buttons} />
              <Text style={styles.datoValor}>{formatearPrecio(clase.precio)}</Text>
              <Text style={styles.etiqueta}>Precio</Text>
            </View>
            <View style={styles.dato}>
              <Ionicons name="time-outline" size={20} color={colors.buttons} />
              <Text style={styles.datoValor}>{clase.duracion} min</Text>
              <Text style={styles.etiqueta}>Duración</Text>
            </View>
            <View style={styles.dato}>
              <Ionicons name="people-outline" size={20} color={colors.buttons} />
              <Text style={styles.datoValor}>
                {cuposDisponibles > 0 ? cuposDisponibles : 'Agotado'}
              </Text>
              <Text style={styles.etiqueta}>Cupos</Text>
            </View>
          </View>

          <View style={styles.horarios}>
            <Text style={styles.subtitulo}>Horarios disponibles</Text>
            <View style={styles.listaHorarios}>
              {clase.horarios.map((horario) => {
                const activo = horario === horarioSeleccionado;
                return (
                <Pressable 
                  key={horario}
                  onPress={() => setHorarioSeleccionado(horario)}
                  style={[styles.horario, activo && styles.horarioActivo]}
                >
                  <Ionicons name="calendar-outline" size={16} color={activo ? colors.surface : colors.buttons} />
                  <Text style={[styles.horarioTexto, activo && styles.horarioTextoActivo]}>
                    {horario}
                  </Text>
                </Pressable>
              );
  })}
            </View>
          </View>

          <Pressable
            style={[styles.boton, cuposDisponibles === 0 && styles.botonDeshabilitado]}
            onPress={handleReservar}
          >
            <Text style={styles.botonTexto}>
              {cuposDisponibles === 0 ? 'No hay cupos disponibles' : 'Reservar Clase'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.background },
  portada: { width: '100%', height: 250,backgroundColor: colors.surface },
  contenido: { padding: spacing.lg, gap: spacing.lg },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.text },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.border },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.text },
  pais: { fontSize: 13, color: colors.text, marginTop: 2 },
  etiqueta: { fontSize: 12, color: colors.text, marginTop: 2 },
  descripcion: { ...typography.title, color: colors.text, lineHeight: 22, marginTop: spacing.sm },
  horarios: { gap: spacing.sm },
  subtitulo: { fontSize: 16, fontWeight: '700', color: colors.text },
  listaHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  horario: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderRadius: radius.md ?? radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  horarioActivo: { backgroundColor: colors.buttons, borderColor: colors.buttons },
  horarioTexto: { fontSize: 13, fontWeight: '600', color: colors.text },
  horarioTextoActivo: { color: colors.surface },
  boton: {
    backgroundColor: colors.buttons,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  botonTexto: { color: colors.surface, fontWeight: '700', fontSize: 16 },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.buttons },
});
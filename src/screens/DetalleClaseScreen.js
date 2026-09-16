import React, { useState, useMemo } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EtiquetaNivel from "../components/EtiquetaNivel";
import { colors, spacing, typography, radius } from "../theme";

export default function DetalleClaseScreen({route, navigation}){
    const insets = useSafeAreaInsets();
    const {clase} = route.params;

    return(
        <View style={styles.pantalla}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{paddingBottom: 120}}
            >
                <Image source={{uri: clase.imagen}} resizeMode="cover" style={styles.portada}/>

                //Foto del profesor y al lado su nombre con apellido
                //precio
                //duracion
                //cupos
                //horario

                //boton que se llame reservar clase
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.border },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.text },
  descripcion: { ...typography.title, color: colors.text, lineHeight: 22, marginTop: spacing.sm },
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
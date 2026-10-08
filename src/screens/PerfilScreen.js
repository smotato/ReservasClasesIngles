import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Image, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import usePerfil from "../hooks/usePerfil";
import RegistrarPerfil from "../components/RegistrarPerfil";
import { colors, spacing, radius, typography } from "../theme";

export default function PerfilScreen() {
  const { perfil, registrarPerfil, editarPerfil } = usePerfil();
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleEliminar = () => {
    Alert.alert(
      "Eliminar perfil",
      "¿Seguro que quieres eliminar tu perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => registrarPerfil(null),
        },
      ]
    );
  };

  if (!perfil) {
    return (
      <View style={styles.pantalla}>
        {!mostrarRegistro ? (
          <View style={styles.card}>
            <Text style={styles.textoVacio}>No hay usuario registrado</Text>
            <Pressable style={styles.boton} onPress={() => setMostrarRegistro(true)}>
              <Text style={styles.botonTexto}>Registrarse</Text>
            </Pressable>
          </View>
        ) : (
          <RegistrarPerfil
            onGuardar={(nuevoPerfil) => {
              registrarPerfil(nuevoPerfil);
              setMostrarRegistro(false);
            }}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Mi Perfil</Text>
        <Image source={{ uri: "https://i.pravatar.cc/200?img=12" }} style={styles.avatar} />
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{perfil.nombre}</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={perfil.email}
          onChangeText={(text) => editarPerfil({ email: text })}
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={perfil.telefono}
          onChangeText={(text) => editarPerfil({ telefono: text })}
          placeholderTextColor={colors.textMuted}
        />

        <Pressable style={styles.botonEliminar} onPress={handleEliminar}>
          <Ionicons name="trash-outline" size={20} color={colors.surface} />
          <Text style={styles.botonTexto}>Eliminar perfil</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.backgroundSoft,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.borderSoft,
    borderWidth: 2,
    borderColor: colors.buttons,
  },
  titulo: {
    ...typography.title,
    fontSize: 22,
    color: colors.text,
  },
  textoVacio: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  valor: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  boton: {
    backgroundColor: colors.buttons,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  botonEliminar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.buttons,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  botonTexto: {
    color: colors.surface,
    fontWeight: "700",
    fontSize: 16,
  },
});
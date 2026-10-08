import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Image, StyleSheet } from "react-native";
import usePerfil from "../hooks/usePerfil";
import RegistrarPerfil from "../components/RegistrarPerfil";
import { colors, spacing, radius, typography } from "../theme";

export default function PerfilScreen() {
  const { perfil, registrarPerfil, editarPerfil } = usePerfil();
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

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
        <Image source={{ uri: "https://i.pravatar.cc/200?img=47" }} style={styles.avatar} />
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
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.border },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  titulo: {
    ...typography.title,
    fontSize: 22,
    marginBottom: spacing.md,
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
  botonTexto: {
    color: colors.surface,
    fontWeight: "700",
    fontSize: 16,
  },
});

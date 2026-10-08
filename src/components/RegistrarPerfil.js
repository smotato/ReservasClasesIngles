import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { colors, spacing, radius, typography } from "../theme";

export default function RegistrarPerfil({ onGuardar }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleGuardar = () => {
    if (!nombre.trim()) {
      Alert.alert("Campo requerido", "El nombre es obligatorio.");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Campo requerido", "El email es obligatorio.");
      return;
    }

    onGuardar({ nombre, email, telefono });
    Alert.alert("Perfil guardado", "Tu información se ha registrado correctamente.");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Registro de usuario</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
        placeholderTextColor={colors.textMuted}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={colors.textMuted}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
        placeholderTextColor={colors.textMuted}
      />

      <Pressable style={styles.boton} onPress={handleGuardar}>
        <Text style={styles.botonTexto}>Guardar perfil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  titulo: {
    ...typography.title,
    fontSize: 20,
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

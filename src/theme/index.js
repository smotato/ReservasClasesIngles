import { Platform } from "react-native";

export const colors = {
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    border: '#000000',
    buttons: '#ff5b31',
    backgroundSoft: '#F4F5F7', // fondo gris claro de pantallas
    textMuted: '#6B7280',      // texto secundario
    borderSoft: '#E3E5E8',     // bordes y divisores suaves
}

//Espaciado: es la separación de las letras y los componentes
export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20
}

export const radius = {
    sm: 8,
    md: 16,
    lg: 24,
    full: 999
}

export const typography = {
    title: { fontSize: 26, fontWeight: '800', color: colors.text }
}

export default { colors, spacing, radius, typography }
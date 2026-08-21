import { Platform } from "react-native";

export const colors = {
    background: '#13e0ef',
    surface: '#ffffff',
    text: '#111827',
    border: '#bbecf0'
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
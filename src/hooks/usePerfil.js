import { useContext } from "react";
import { PerfilContext } from "../context/PerfilContext";

export default function usePerfil() {
    const contexto = useContext(PerfilContext);

    if (!contexto) {
        throw new Error("usePerfil debe ser usado dentro de un <PerfilProvider>");
    }
    return contexto;
};
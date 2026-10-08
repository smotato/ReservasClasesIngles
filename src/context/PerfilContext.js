import React, { createContext, useMemo, useCallback } from 'react';
import useAlmacenamiento from '../hooks/useAlmacenamiento';

const CLAVE_PERFIL = '@perfil_usuario';

export const PerfilContext = createContext(null);

export function PerfilProvider({ children }) {
  const [perfil, setPerfil, listo] = useAlmacenamiento(CLAVE_PERFIL, null);
  const cargando = !listo;

  const registrarPerfil = useCallback((nuevoPerfil) => {
    setPerfil(nuevoPerfil);
  }, [setPerfil]);

  const editarPerfil = useCallback((updates) => {
    if (!perfil) return;
    setPerfil({ ...perfil, ...updates });
  }, [perfil, setPerfil]);

  const value = useMemo(
    () => ({ perfil, cargando, registrarPerfil, editarPerfil }),
    [perfil, cargando, registrarPerfil, editarPerfil]
  );

  return (
    <PerfilContext.Provider value={value}>
      {children}
    </PerfilContext.Provider>
  );
}

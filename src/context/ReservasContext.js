import React, {useState, useEffect, useCallback, useMemo, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reservas_ingles';

export const ReservasContext = createContext(null);

export function ReservasProvider({children}) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    //Cargar reservas que tengo guardades
    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado));
                }
            } catch (error) {
                console.log('Error cargando reservas', error);
            } finally {
                setCargando(false);
            }

        };
        cargar();
    }, []);

    useEffect(() => {
        if (cargando) return;
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error) => {
            console.log('Error guardando reservas: ', error);
        });
    }, [reservas, cargando]);

    // CAMBIO 1: nombre corregido (agregarReserrva -> agregarReserva)
    const agregarReserva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        }

        // CAMBIO 2: se valida el duplicado antes de guardar y se devuelve el resultado
        if (reservas.some((r) => r.id === nueva.id)) {
            return {ok: false};
        }

        setReservas((prev) => [nueva, ...prev]);
        return {ok: true};
    }, [reservas]); // CAMBIO 3: ahora depende de reservas

    const value = useMemo(
        () => ({ reservas, cargando, agregarReserva }),
        [reservas, cargando, agregarReserva]
    );

    return (
        <ReservasContext.Provider value={value}>
            {children}
        </ReservasContext.Provider>
    );
}

// CAMBIO 4: hook para consumir el contexto (ya importabas useContext)
export function useReservas() {
    const ctx = useContext(ReservasContext);
    if (!ctx) throw new Error('useReservas debe usarse dentro de ReservasProvider');
    return ctx;
}
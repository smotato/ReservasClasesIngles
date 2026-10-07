import React, {useState, useEffect, useCallback, useMemo, createContext} from 'react';
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

    const agregarReserrva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        }

        let resultados = {ok: true};
        setReservas((prev) => {
            if (prev.some((r) => r.id === nueva.id)) {
                resultados = {ok: false}
                return prev;
            }
            return [nueva, ...prev];
        })
    }, []);

};
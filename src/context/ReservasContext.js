import React, {useState, useEffect, useCallback, useMemo, createContext} from 'react';
import useAlmacenamiento from '../hooks/useAlmacenamiento';
import { validarHorario } from '../data/classes';

const CLAVE_RESERVAS = '@reservas_ingles';

export const ReservasContext = createContext(null);

export function ReservasProvider({children}) {
    const [reservas, setReservas, listo] = useAlmacenamiento(CLAVE_RESERVAS, []);
    
    useEffect(() => {
        if (cargando) return;
        console.log('RESERVAS EN MEMORIA:', JSON.stringify(reservas, null, 2));
    }, [reservas, cargando]);
    
    const cargando = !listo;

    const agregarReserva = useCallback((clase, horario) => {

        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            duracion: clase.duracion,
            horario,
            creadoEn: new Date().toISOString(),
        }

        if (reservas.some((r) => r.id === nueva.id)) {
            return {ok: false, motivo: 'duplicada'};
        }

        const cruceHorario = reservas.find((r) =>
            validarHorario(horario, clase.duracion, r.horario, r.duracion)
        );
        if (cruceHorario) {
            return {ok: false, motivo: 'cruce', conflicto: cruceHorario};
        }

        setReservas([nueva, ...reservas]);
        return {ok: true};
    }, [reservas, setReservas, cargando]);

    const value = useMemo(
        () => ({ reservas, cargando, agregarReserva }),
        [reservas, cargando, agregarReserva]
    );
 
    return (
        <ReservasContext.Provider value={value}>
            {children}
        </ReservasContext.Provider>
    );

};
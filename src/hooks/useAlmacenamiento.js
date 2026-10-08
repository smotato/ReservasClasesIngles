import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(key, initialValue) {
    const [value, setValue] = useState(initialValue);
    const [listo, setListo] = useState(false);

    useEffect(() => {
        let activo = true;

        AsyncStorage.getItem(key)
        .then((guardando) => {
            if (activo && guardando !== null) {
                setValue(JSON.parse(guardando));
            }
        })
        .catch((error) => {
            console.log('Error leyendo '+ key, error);
        })
        .finally(() => activo && setListo(true));

        return()=> {
            activo = false;
        }
    }, [key]);

    const actualizar = useCallback(
        async(nuevoValor) => {
            setValue(nuevoValor);
            try {
                await AsyncStorage.setItem(key, JSON.stringify(nuevoValor));
            } catch (error) {
                console.log('Error guardando '+ key, error);
            }
        }, [key]
    );

    return [value, actualizar, listo];
};
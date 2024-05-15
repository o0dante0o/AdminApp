import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

function IPInfo() {
    const [ipAddress, setIpAddress] = useState('');
    const [store, dispatch] = useContext(StoreContext);

    function sendPostRequest(ipAddress) {
        const url = 'http://127.0.0.1:8000/get_geo';
        const data = { ip: ipAddress };
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch(url, fetchOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return {}; // Retornar un objeto vacío en caso de error
            });
    }

    useEffect(() => {
        console.log('BUG!!!! SE LLAMA DOS VECES!!! ARREGLAR!!!');
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                setIpAddress(data.ip); // Guardar la dirección IP
                return data.ip; // Pasar la IP a la siguiente llamada de la cadena
            })
            .then(sendPostRequest) // Envía la IP al servidor y espera la promesa
            .then(data => {
                dispatch({
                    type: types.IPInfo,
                    payload: data
                });
            })
            .catch(error => {
                console.error('Error al obtener la IP:', error);
            });   
    },[]);
}

export default IPInfo;

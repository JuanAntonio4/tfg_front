import { BASE_URL,BASE_FUNCTION_URL, requestOptions } from "../../common";
import axios from "axios";

export default{

    getAvisos: async function (token) {
    
        requestOptions.headers.Authorization = `Bearer ${token}`;
        const selectQuery = '*,cliente(*),empleado(*)';
        let response = await axios.get(`${BASE_URL}/aviso?select=${selectQuery}`, requestOptions);
        return response.data
    },

    getAvisosPorEmpleado: async function(id_empleado, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        const selectQuery = '*,cliente(*),empleado(*)';
        let response = await axios.get(`${BASE_URL}/aviso?select=${selectQuery}&id_empleado=eq.${id_empleado}`, requestOptions);
        return response.data
    },

    getAvisoPorId: async function(id, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.get(`${BASE_URL}/aviso?id=eq.${id}` , requestOptions);
        return response.data[0]
    },

    crearAviso: async function(aviso, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.post(`${BASE_URL}/aviso`, aviso , requestOptions);
        return response.data
    },

    editarAviso: async function(id, aviso, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.patch(`${BASE_URL}/aviso?id=eq.${id}`, aviso , requestOptions);
        return response.data
    },

    eliminarAviso: async function(id, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.delete(`${BASE_URL}/aviso?id=eq.${id}` , requestOptions);
        return response.data
    },

     enviarCorreoAvisoCreado: async function(contenidoParaCorreo){
        let response = await axios.post(`${BASE_FUNCTION_URL}/enviar-correo-asigaci-n-aviso` , contenidoParaCorreo, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data
    },

    
};

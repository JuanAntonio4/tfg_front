import { BASE_URL, requestOptions } from "../../common";
import axios from "axios";

export default{

    getObras: async function(token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        const selectQuery = '*,cliente(*)';
        let response = await axios.get(`${BASE_URL}/obra?select=${selectQuery}`, requestOptions);
        return response.data
          
    },

    getObraPorId: async function(id, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.get(`${BASE_URL}/obra?id=eq.${id}` , requestOptions);
        return response.data[0]
    },

    crearObra: async function(obra, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.post(`${BASE_URL}/obra`, obra , requestOptions);
        return response.data
    },

    editarObra: async function(id, obra, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.patch(`${BASE_URL}/obra?id=eq.${id}`, obra , requestOptions);
        return response.data
    },

    eliminarObra: async function(id, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.delete(`${BASE_URL}/obra?id=eq.${id}` , requestOptions);
        return response.data
    },

};
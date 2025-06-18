import { BASE_URL, requestOptions } from "../../common";
import axios from "axios";

export default{

    getClientes: async function(token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.get(`${BASE_URL}/cliente` , requestOptions);
        return response.data
      
    },

    getClientePorId: async function(id, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.get(`${BASE_URL}/cliente?id=eq.${id}` , requestOptions);
        return response.data[0]
    },

    crearCliente: async function(cliente, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.post(`${BASE_URL}/cliente`, cliente , requestOptions);
        return response.data
    },

    editarCliente: async function(id, cliente ,token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.patch(`${BASE_URL}/cliente?id=eq.${id}`, cliente , requestOptions);
        return response.data
    },

    eliminarCliente: async function(id, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.delete(`${BASE_URL}/cliente?id=eq.${id}` , requestOptions);
        return response.data
    },

};
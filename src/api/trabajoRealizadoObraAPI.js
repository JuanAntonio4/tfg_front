import { BASE_URL, requestOptions } from "../../common";
import axios from "axios";

export default{

    crearTrabajoRealizadoObra: async function(trabajoFormateado, token){
      requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.post(`${BASE_URL}/trabajo_realizado_obra`, trabajoFormateado , requestOptions);
        return response.data
    },

    crearMaterialesUsados: async function(id_trabajo, materiales, token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
      const materialesConTrabajoId = materiales.map(mat => ({id_trabajo_realizado_obra: id_trabajo,id_material: mat.id_material,cantidad: mat.cantidad}));
      const response = await axios.post(`${BASE_URL}/material_usado`, materialesConTrabajoId,requestOptions);
      return response.data;
    },

    eliminarMaterialUsado: async function(id, token){
    requestOptions.headers.Authorization = `Bearer ${token}`;
    let response = await axios.delete(`${BASE_URL}/material_usado?id=eq.${id}` , requestOptions);
    return response.data
    },

    obtenerTrabajosPorObraInformes: async function (obra_id, token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
      const selectQuery = '*,obra(*,cliente(*)),empleado(*),material_usado:material_usado(id,cantidad,material:material(*))';
      let response = await axios.get(`${BASE_URL}/trabajo_realizado_obra?select=${selectQuery}&id_obra=eq.${obra_id}`, requestOptions);
      return response.data;
    },





};
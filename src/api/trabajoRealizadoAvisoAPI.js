import { BASE_URL,BASE_FUNCTION_URL, requestOptions } from "../../common";
import axios from "axios";


export default{

    crearTrabajoRealizadoAviso: async function(trabajoFormateado, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        const responseTrabajo = await axios.post(`${BASE_URL}/trabajo_realizado_aviso`, trabajoFormateado, requestOptions);
        const trabajoCreado = responseTrabajo.data[0];

        if (trabajoCreado.estado === 'FINALIZADO') {
            const datoParaActualizar = {
                estado: 'FINALIZADO' 
            };

            await axios.patch(`${BASE_URL}/aviso?id=eq.${trabajoFormateado.id_aviso}`, datoParaActualizar, requestOptions);

        }else{
          const datoParaActualizar = {
                id_empleado: null
            };

            await axios.patch(`${BASE_URL}/aviso?id=eq.${trabajoFormateado.id_aviso}`,datoParaActualizar,requestOptions);

        }

        return responseTrabajo.data; 

},

    crearMaterialesUsados: async function(id_trabajo, materiales, token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
      const materialesConTrabajoId = materiales.map(mat => ({id_trabajo_realizado_aviso: id_trabajo,id_material: mat.id_material,cantidad: mat.cantidad}));
      const response = await axios.post(`${BASE_URL}/material_usado`, materialesConTrabajoId,requestOptions);
      return response.data;
    },

    eliminarMaterialUsado: async function(id, token){
    requestOptions.headers.Authorization = `Bearer ${token}`;
    let response = await axios.delete(`${BASE_URL}/material_usado?id=eq.${id}` , requestOptions);
    return response.data
    },

    obtenerTrabajosPorAvisoPresupuestos: async function (aviso_id, token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
      const selectQuery = '*,aviso(*,cliente(*)),empleado(*),material_usado:material_usado(id,cantidad,material:material(*))';
      let response = await axios.get(`${BASE_URL}/trabajo_realizado_aviso?select=${selectQuery}&id_aviso=eq.${aviso_id}`, requestOptions);
      return response.data;
    },

    obtenerTrabajosPorAvisoInformes: async function (aviso_id, token) {
       requestOptions.headers.Authorization = `Bearer ${token}`;
      const selectQuery = '*,aviso(*,cliente(*)),empleado(*),material_usado:material_usado(id,cantidad,material:material(*))';
      let response = await axios.get(`${BASE_URL}/trabajo_realizado_aviso?select=${selectQuery}&id_aviso=eq.${aviso_id}`, requestOptions);
      return response.data;
    },



enviarPresupuestoPorCorreo: async function (pdfBlob, nombre) {
  const formData = new FormData();
  console.log(nombre)
  formData.append("pdf", pdfBlob, `Presupuesto-${nombre}.pdf`);
  formData.append("nombre", nombre);

  console.log(formData)

  const headers = {

    ...(requestOptions.headers || {}), 
  };


  delete headers['Content-Type'];
  const response = await axios.post(
    `${BASE_FUNCTION_URL}/enviar-correo-presupuestos`,
    formData, 
    { headers } 
  );

  return response.data;
},

enviarInformePorCorreo: async function (pdfBlob, nombre) {
  const formData = new FormData();
  formData.append("pdf", pdfBlob, `Informe-${nombre}.pdf`);
  formData.append("nombre", nombre);

  const headers = {

    ...(requestOptions.headers || {}), 
  };


  delete headers['Content-Type'];
  const response = await axios.post(
    `${BASE_FUNCTION_URL}/enviar-correo-informes`,
    formData, 
    { headers } 
  );

  return response.data;
},



};
import { ref } from "vue";
import { useAutenticacionStore } from "@/stores/autenticacion";
import { useMessagesStore } from "@/stores/messages";
import { onMounted } from "vue";
import materialesAPI from "@/api/materialesAPI";
import trabajoRealizadoAvisoAPI from "@/api/trabajoRealizadoAvisoAPI";
import trabajoRealizadoAvisoValidator from "@/validators/trabajoRealizadoAviso";
import trabajoRealizadoObraValidator from "@/validators/trabajoRealizadoObra";
import trabajoRealizadoObraAPI from "@/api/trabajoRealizadoObraAPI";

const trabajo_realizado_aviso = ref({
    descripcion_trabajo_realizado: "",
    observaciones: "",
    estado: "",
    id_aviso: "",
    id_empleado: "",
    fecha_atencion: "",
});

const trabajo_realizado_obra = ref({
    descripcion_trabajo_realizado: "",
    observaciones: "",
    horas_invertidas: "",
    id_obra: "",
    id_empleado: "",
    estado: "",
    fecha_atencion:"",
    
});

const id= ref(null);
const tipo = ref(null)

const materiales = ref([])
const materialSeleccionado = ref([]);
const cantidadSeleccionada = ref(null);

const materialesUsados = ref([]);

async function obtenerMateriales(){
    const autenticacionStore = useAutenticacionStore();
    const messageStore = useMessagesStore();
    try {
        materiales.value = await materialesAPI.getMateriales(autenticacionStore.token);

    } catch (error) {
        messageStore.showMessageErrors("Ha ocurrido un error al recuperar los materiales");
    }
};

const nombreMaterialesEnSelect=(item) =>{
  return `${item.nombre} - ${item.unidad}`;
}

function agregarMaterial(){
   if (materialSeleccionado.value && cantidadSeleccionada.value > 0) {

     materialesUsados.value.push({
       id_material: materialSeleccionado.value,
       cantidad: cantidadSeleccionada.value,
     });

     materialSeleccionado.value = null;
     cantidadSeleccionada.value = null;
   }
};

const obtenerNombreMaterial = (id) => {
   const material = materiales.value.find((m) => m.id === id);
   return material ? `${material.nombre} / Unidad: ${material.unidad}` : "Desconocido";
};

 const eliminarMaterial = (index) => {
   materialesUsados.value.splice(index, 1);
};

function validaYEnvia(){
    const messageStore = useMessagesStore();
    let errores= []
    if(tipo.value === 'aviso'){
        errores = trabajoRealizadoAvisoValidator.validate(trabajo_realizado_aviso.value, materialesUsados.value);
    }else{
        errores = trabajoRealizadoObraValidator.validate(trabajo_realizado_obra.value, materialesUsados.value);
    }
    if (errores.length === 0) {
      enviarFormulario();
    } else {
      for (const error of errores) {
        messageStore.showMessageErrors(error)
      }
    }
  
};

async function enviarFormulario(){
    const autenticacionStore = useAutenticacionStore();
    const messageStore = useMessagesStore();
    const usuario = autenticacionStore.usuario
  try {

    const id_usuario = usuario.id
    if(tipo.value === 'aviso'){

      const aviso_id = id.value
      const trabajoFormateado = {
          descripcion_trabajo_realizado: trabajo_realizado_aviso.value.descripcion_trabajo_realizado,
          observaciones: trabajo_realizado_aviso.value.observaciones,
          estado: trabajo_realizado_aviso.value.estado,
          id_aviso: aviso_id,
          id_empleado: id_usuario,
          fecha_atencion: trabajo_realizado_aviso.value.fecha_atencion,
      };

        const trabajoCreado = await trabajoRealizadoAvisoAPI.crearTrabajoRealizadoAviso(trabajoFormateado, autenticacionStore.token)
        const trabajoCreadoID = trabajoCreado[0].id;
        const trabajoCreadoEstado = trabajoCreado[0].estado;
        if (trabajoCreadoEstado === 'FINALIZADO') { 
          trabajo_realizado_aviso.value.estado = 'FINALIZADO';
        }
        await trabajoRealizadoAvisoAPI.crearMaterialesUsados(trabajoCreadoID, materialesUsados.value, autenticacionStore.token);

        messageStore.showMessageSuccess('Trabajo realizado añadido con éxito' , "/lista-de-avisos")

    }else{

        const obra_id = id.value
        const trabajoFormateado = {
        descripcion_trabajo_realizado: trabajo_realizado_obra.value.descripcion_trabajo_realizado,
        observaciones: trabajo_realizado_obra.value.observaciones,
        horas_invertidas: trabajo_realizado_obra.value.horas_invertidas,
        id_obra: obra_id,
        id_empleado: id_usuario,
        estado: trabajo_realizado_obra.value.estado,
        fecha_atencion:trabajo_realizado_obra.value.fecha_atencion,

        };
        

        const trabajoCreadoObra = await trabajoRealizadoObraAPI.crearTrabajoRealizadoObra(trabajoFormateado, autenticacionStore.token)
        const trabajoCreadoID = trabajoCreadoObra[0].id;

        await trabajoRealizadoObraAPI.crearMaterialesUsados(trabajoCreadoID, materialesUsados.value , autenticacionStore.token);
        messageStore.showMessageSuccess('Trabajo realizado añadido con éxito' , "/lista-de-obras")
    }


  } catch (error) {
    messageStore.showMessageErrors("Se ha producido un error. Vuelve a intentarlo más tarde")
  }

};

function setupFormTrabajoRealizado(route){
    id.value = route.params.id || null; 
    tipo.value = route.params.tipo || null;
    if(tipo.value === 'aviso'){
        trabajo_realizado_aviso.value = {
               descripcion_trabajo_realizado: "",
                observaciones: "",
                estado: "",
                id_aviso: "",
                id_empleado: "",
                fecha_atencion: "",
        };
    }else{
          trabajo_realizado_obra.value = {
                descripcion_trabajo_realizado: "",
                observaciones: "",
                horas_invertidas: "",
                id_obra: "",
                id_empleado: "",
                estado: "",
                fecha_atencion:"",
            };
    }
   
    materialSeleccionado.value = [];
    cantidadSeleccionada.value = null; 
    materialesUsados.value = [];
    onMounted(obtenerMateriales);
};

export {
    trabajo_realizado_aviso,
    trabajo_realizado_obra,
    materiales,
    materialSeleccionado,
    cantidadSeleccionada,
    materialesUsados,
    id,
    tipo,
    nombreMaterialesEnSelect,
    validaYEnvia,
    setupFormTrabajoRealizado,
    agregarMaterial,
    obtenerNombreMaterial,
    eliminarMaterial,
};
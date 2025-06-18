import { ref, onMounted } from "vue";
import { useMessagesStore } from "@/stores/messages";
import clientesAPI from "@/api/clientesAPI";
import obrasAPI from "@/api/obrasAPI";
import obrasValidator from "@/validators/obras";
import { useAutenticacionStore } from "@/stores/autenticacion";

const obra = ref({
    nombre: "",
    id_cliente: "",
    fecha_prevista_fin: "",
  
});

const id = ref(null);
const clientes = ref([]);

async function obtenerObraPorId(id) {
  const messagesStore = useMessagesStore();
  const autenticacionStore = useAutenticacionStore();
  try {
    obra.value = await obrasAPI.getObraPorId(id, autenticacionStore.token);
    console.log(obra.value);
  } catch (error) {
    messagesStore.showMessageErrors("Ha ocurrido un error al recuperar la obra.");
  }
}

async function obtenerClientes() {
  const autenticacionStore = useAutenticacionStore();
  const messagesStore = useMessagesStore();
  try {
    clientes.value = await clientesAPI.getClientes(autenticacionStore.token);
  } catch (error) {
    messagesStore.showMessageErrors("Ha ocurrido un error al recuperar los clientes.");
  }
}


function validaYEnvia() {
  const messagesStore = useMessagesStore();
  let errores = obrasValidator.validate(obra.value);
  if (errores.length === 0) {
    enviarFormulario();
  } else {
    for (const error of errores) {
      messagesStore.showMessageErrors(error);
    }
  }
}

async function enviarFormulario() {
  const messagesStore = useMessagesStore();
  const autenticacionStore = useAutenticacionStore();
  try {
    const obraFormateada = {
          nombre: obra.value.nombre,
          id_cliente: obra.value.id_cliente,
          fecha_prevista_fin: obra.value.fecha_prevista_fin,

        };

    if (obra.value.id) {
      await obrasAPI.editarObra(obra.value.id,obraFormateada, autenticacionStore.token);
      messagesStore.showMessageSuccess("Obra editada correctamente", "/lista-de-obras");
    } else {
      await obrasAPI.crearObra(obraFormateada, autenticacionStore.token);
      messagesStore.showMessageSuccess("Obra creada correctamente", "/lista-de-obras");
    }
  } catch (error) {
    messagesStore.showMessageErrors("Se ha producido un error. Vuelve a intentarlo más tarde");
  }
}



function setupFormObras(route){
    id.value = route.params.id || null;
    onMounted(() => {
        if(id.value){
            obtenerObraPorId(id.value);
        }else{
            obra.value = {
                nombre: "",
                id_cliente: "",
                fecha_prevista_fin: "",
            };
        }
        obtenerClientes();
    });  
}

export {
    obra, 
    clientes,
    id,
    setupFormObras,
    validaYEnvia,  

};
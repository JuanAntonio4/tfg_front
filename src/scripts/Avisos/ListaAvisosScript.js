import { onMounted, ref, computed } from "vue";
import avisosAPI from "@/api/avisosAPI";
import { useMessagesStore } from '@/stores/messages';
import { useAutenticacionStore } from "@/stores/autenticacion";
import trabajoRealizadoAvisoAPI from '@/api/trabajoRealizadoAvisoAPI';


const avisos = ref([]);
const dialog = ref(false);
const search = ref('');
const avisoAEliminar = ref(null);
const botonesInformesDeshabilitados = ref({});

async function obtenerAvisos() {
    const messagesStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
    
    try {
        if(autenticacionStore.usuario.rol ==='TRABAJADOR'){
            avisos.value = await avisosAPI.getAvisosPorEmpleado(autenticacionStore.usuario.id, autenticacionStore.token);
        }else{
            avisos.value = await avisosAPI.getAvisos(autenticacionStore.token);
        }
        
    } catch (error) {
        messagesStore.showMessageErrors("Ha ocurrido un error al obtener los avisos.");
        
    }
    
};

async function eliminarAviso() {
    const messagesStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
    try {
        await avisosAPI.eliminarAviso(avisoAEliminar.value.id, autenticacionStore.token);
        await obtenerAvisos();
        messagesStore.showMessageSuccess('Aviso eliminado con éxito');
        cerrarDialogo();
    } catch (error) {
        messagesStore.showMessageErrors("Ha ocurrido un error al eliminar el aviso.");
    }
};

const avisosFiltrados = computed(() => {
    if (!search.value) {
        return avisos.value;
    }else{
        return avisos.value.filter(aviso =>
            (aviso.nombre && aviso.nombre.toLowerCase().includes(search.value.toLowerCase())) ||
            (aviso.descripcion && aviso.descripcion.toLowerCase().includes(search.value.toLowerCase())) ||
            (aviso.fecha && aviso.fecha.toLowerCase().includes(search.value.toLowerCase())) ||
            (aviso.prioridad && aviso.prioridad.toLowerCase().includes(search.value.toLowerCase())) ||
            (aviso.estado && aviso.estado.toLowerCase().includes(search.value.toLowerCase())) ||
            (aviso.cliente && aviso.cliente.nombre && aviso.cliente.nombre.toLowerCase().includes(search.value.toLowerCase())) ||
            (aviso.empleado && aviso.empleado.nombre && aviso.empleado.nombre.toLowerCase().includes(search.value.toLowerCase()))
          );
    }
});


async function obtenerTrabajoRealizadoPorAvisoIdInformes(id) {
    const autenticacionStore = useAutenticacionStore();
    const messagesStore = useMessagesStore();
    try {
      const trabajos = await trabajoRealizadoAvisoAPI.obtenerTrabajosPorAvisoInformes(id , autenticacionStore.token);
      console.log(trabajos)
      botonesInformesDeshabilitados.value[id] = trabajos.length === 0;
    } catch (error) {
        messagesStore.showMessageErrors("Ha ocurrido un error al obtener los trabajos que se han realizado en el aviso.");
    }
    
};



const abrirDialogo = (aviso) => {
    dialog.value = true;
    avisoAEliminar.value = aviso;
  
};


const cerrarDialogo = () => {
    avisoAEliminar.value = null;
    dialog.value = false;
};


function setupListaAvisos() {
    onMounted(async () => {
      await obtenerAvisos();
      avisos.value.forEach(aviso => {
        botonesInformesDeshabilitados.value[aviso.id] = true; 
        obtenerTrabajoRealizadoPorAvisoIdInformes(aviso.id);
      });
    });
  }

export {
avisos,
dialog,
avisosFiltrados,
search,
botonesInformesDeshabilitados,
setupListaAvisos,
eliminarAviso,
abrirDialogo,
cerrarDialogo
};
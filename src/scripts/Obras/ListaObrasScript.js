import { ref, onMounted, computed } from 'vue';
import obrasAPI from '@/api/obrasAPI';
import { useMessagesStore } from '@/stores/messages';
import trabajoRealizadoObraAPI from '@/api/trabajoRealizadoObraAPI';
import { useAutenticacionStore } from "@/stores/autenticacion";


const obras = ref([]);
const dialog = ref(false);
const obraAEliminar = ref(null);
const search = ref('');
const botonesInformesDeshabilitados = ref({});

async function obtenerObras() {
  const autenticacionStore = useAutenticacionStore();
    const messagesStore = useMessagesStore();
    try {
        obras.value = await obrasAPI.getObras(autenticacionStore.token);
        console.log(obras.value);
    } catch (error) {
        messagesStore.showMessageErrors("Ha ocurrido un error al recuperar las obras.");
        
    }
    
};

async function eliminarObra  () {
  const messagesStore = useMessagesStore();
  const autenticacionStore = useAutenticacionStore();
  try {
    await obrasAPI.eliminarObra(obraAEliminar.value.id, autenticacionStore.token);
    cerrarDialogo();
    await obtenerObras();
    messagesStore.showMessageSuccess("Obra eliminada con éxito");
    
  } catch (error) {
    messagesStore.showMessageErrors("Ha ocurrido un error al recuperar las obras.");

  } 

};

const obrasFiltradas = computed(() => {
    if (!search.value) {
        return obras.value;
    }else{
        return obras.value.filter(obra =>
            (obra.nombre && obra.nombre.toLowerCase().includes(search.value.toLowerCase())) ||
            (obra.cliente.nombre && obra.cliente.nombre.toLowerCase().includes(search.value.toLowerCase())) ||
            (obra.fechaPrevistaFin && obra.fechaPrevistaFin.toLowerCase().includes(search.value.toLowerCase())) 

          );
    }
});

async function obtenerTrabajoRealizadoPorObraIdInformes(id) {
    const messagesStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
    try {
      const trabajos = await trabajoRealizadoObraAPI.obtenerTrabajosPorObraInformes(id, autenticacionStore.token)
      console.log(trabajos)
      botonesInformesDeshabilitados.value[id] = trabajos.length === 0;
    } catch (error) {
      messagesStore.showMessageErrors("Ha ocurrido un error al obtener los trabajos que se han realizado en la obra.");
    }
    
};


const abrirDialogo = (obra) => {
  dialog.value = true;
  obraAEliminar.value = obra;

};

const cerrarDialogo = () => {
  obraAEliminar.value = null;
  dialog.value = false;
};

function setupListaObras(){
  onMounted(async () =>{
    await obtenerObras();
    obras.value.forEach(obra => {
      botonesInformesDeshabilitados.value[obra.id] = true; 
      obtenerTrabajoRealizadoPorObraIdInformes(obra.id);
    })
  });
}

export {
obras,
dialog,
search,
obrasFiltradas,
botonesInformesDeshabilitados,
setupListaObras,
eliminarObra,
abrirDialogo,
cerrarDialogo,

};
import { ref, onMounted, computed } from 'vue';
import clientesAPI from '@/api/clientesAPI';
import { useMessagesStore } from '@/stores/messages';
import { useAutenticacionStore } from "@/stores/autenticacion";

const clientes = ref([]);
const search = ref('');
const dialog = ref(false);
const clienteAEliminar = ref(null);


async function obtenerClientes(){
    const messageStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
  try {
    clientes.value = await clientesAPI.getClientes(autenticacionStore.token);
  } catch (error) {
    messageStore.showMessageErrors("Ha ocurrido un error al obtener los clientes.");
  }
};


async function eliminarCliente() {
  const messageStore = useMessagesStore();
  const autenticacionStore = useAutenticacionStore();
   try {
    await clientesAPI.eliminarCliente(clienteAEliminar.value.id, autenticacionStore.token)
    cerrarDialogo();
    await obtenerClientes();
    messageStore.showMessageSuccess('Cliente eliminado con éxito');
 

   } catch (error) {
     messageStore.showMessageErrors("Ha ocurrido un error al eliminar el cliente.");

   } 

 };

const clientesFiltrados = computed(() => {
    if (!search.value) {
        return clientes.value;
    }else{
        return clientes.value.filter(cliente =>
            (cliente.nombre && cliente.nombre.toLowerCase().includes(search.value.toLowerCase())) ||
            (cliente.direccion && cliente.direccion.toLowerCase().includes(search.value.toLowerCase()))
          );
    }
});

 const abrirDialogo = (cliente) => {
   dialog.value = true;
   clienteAEliminar.value = cliente
 };

 const cerrarDialogo = () => {
   dialog.value = false;
   clienteAEliminar.value = null
 };

function setupListaClientes(){
    onMounted(obtenerClientes);
}

export{
    clientes,
    dialog,
    search,
    clientesFiltrados,
    setupListaClientes,
    eliminarCliente,
    abrirDialogo,
    cerrarDialogo,
}

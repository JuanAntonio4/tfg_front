import { ref, onMounted, computed } from 'vue';
import empleadosAPI from '@/api/empleadosAPI';
import { useMessagesStore } from '@/stores/messages';
import { useAutenticacionStore } from "@/stores/autenticacion";

const dialog = ref(false);
const search = ref('');
const empleados = ref([]);
const empleadoAEliminar = ref(null);

async function obtenerEmpleados() {
    const messagesStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
    try {
        empleados.value = await empleadosAPI.getEmpleados(autenticacionStore.token);
    } catch (error) {
        messagesStore.showMessageErrors("Ha ocurrido un error al obtener los empleados.");
        
    }
    
};

 async function eliminarEmpleado(){
    const messagesStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
    console.log(empleadoAEliminar.value);
   try {
    await empleadosAPI.eliminarEmpleado(empleadoAEliminar.value.uuid_auth, autenticacionStore.token)
    cerrarDialogo();
    await obtenerEmpleados();
    messagesStore.showMessageSuccess('Empleado eliminado con éxito');
    

   } catch (error) {
    messagesStore.showMessageErrors("Ha ocurrido un error al eliminar el empleado.");

   } 

 };

 const empleadosFiltrados = computed(() => {
     if (!search.value) {
         return empleados.value;
     }else{
         return empleados.value.filter(empleado =>
             (empleado.nombre && empleado.nombre.toLowerCase().includes(search.value.toLowerCase())) ||
             (empleado.usuario && empleado.usuario.toLowerCase().includes(search.value.toLowerCase())) ||
             (empleado.correo && empleado.correo.toLowerCase().includes(search.value.toLowerCase())) ||
             (empleado.telefono && empleado.telefono.toLowerCase().includes(search.value.toLowerCase())) ||
            (empleado.rol && empleado.rol.toLowerCase().includes(search.value.toLowerCase()))
 
           );
     }
 });



 const abrirDialogo = (empleado) => {
   dialog.value = true;
   empleadoAEliminar.value = empleado
 };

 const cerrarDialogo = () => {
   dialog.value = false;
   empleadoAEliminar.value = null
 };


function setupListaEmpleados() {
  onMounted(obtenerEmpleados);
}

export{
    empleados,
    dialog,
    empleadosFiltrados,
    search,
    setupListaEmpleados,
    eliminarEmpleado,
    abrirDialogo,
    cerrarDialogo,
}
import { ref, onMounted } from "vue";
import empleadosAPI from "@/api/empleadosAPI"; 
import { useMessagesStore } from "@/stores/messages";
import empleadosValidator from "@/validators/empleados"; 
import { useAutenticacionStore } from "@/stores/autenticacion";

const empleado = ref({
  nombre: "",
  usuario: "",
  clave: "", 
  correo: "", 
  telefono: "",
  rol: "",
});

const id = ref(null); 

async function obtenerEmpleadoPorId(empleadoId) { 
  const messagesStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
  try {
    empleado.value = await empleadosAPI.getEmpleadoPorId(empleadoId, autenticacionStore.token);
  } catch (error) {

    messagesStore.showMessageErrors("Ha ocurrido un error al obtener el empleado.");
  }
}

function validaYEnvia() {
  const messageStore = useMessagesStore();
  let errores = empleadosValidator.validate(empleado.value); 
  if (errores.length === 0) {
    enviarFormulario();
  } else {
    for (const error of errores) {
      messageStore.showMessageErrors(error);
    }
  }
}

async function enviarFormulario() {
  const messagesStore = useMessagesStore();
  const autenticacionStore = useAutenticacionStore();
  try {

     const empleadoParaEnvio = {
          nombre: empleado.value.nombre,
          usuario: empleado.value.usuario,
          clave: empleado.value.clave || null,
          correo: empleado.value.correo,
          telefono: empleado.value.telefono,
          rol: empleado.value.rol,

        };

    if (id.value) { 
      await empleadosAPI.editarEmpleado(id.value, empleadoParaEnvio, autenticacionStore.token);
      messagesStore.showMessageSuccess("Empleado editado correctamente", "/lista-de-empleados");
    } else { 

      await empleadosAPI.registrarEmpleado(empleadoParaEnvio);
      messagesStore.showMessageSuccess("Empleado registrado correctamente", "/"); 

    }
  } catch (error) {
    messagesStore.showMessageErrors("Se ha producido un error. Vuelve a intentarlo más tarde");
  }
}

function setupFormEmpleado(route) {
  id.value = route.params.id || null;
  onMounted(() => {
    if (id.value) {
      obtenerEmpleadoPorId(id.value);
    } else {
      empleado.value = {
        nombre: "",
        usuario: "",
        clave: "", 
        correo: "",
        telefono: "",
        rol: "",
      };
    }
  });
}

export {
  empleado,
  id,
  validaYEnvia,
  setupFormEmpleado,
};
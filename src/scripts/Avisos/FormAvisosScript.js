import { ref, onMounted } from "vue";
import avisosAPI from "@/api/avisosAPI";
import { useMessagesStore } from '@/stores/messages';
import empleadosAPI from "@/api/empleadosAPI";
import clientesAPI from "@/api/clientesAPI";
import avisosAsFunctionValidator from "@/validators/avisosAsFunction";
import { useAutenticacionStore } from "@/stores/autenticacion";

const aviso = ref({
  nombre: "",
  descripcion: "",
  id_empleado: "",
  id_cliente: "",
  fecha: "",
  prioridad: "",
  estado: ""
});

const empleados = ref([]);
const clientes = ref([]);
const id = ref(null);

async function obtenerAvisoPorId(id) {
  const autenticacionStore = useAutenticacionStore();
  const messagesStore = useMessagesStore();
  try {
    aviso.value = await avisosAPI.getAvisoPorId(id, autenticacionStore.token);
  } catch (error) {
    messagesStore.showMessageErrors("Ha ocurrido un error al recuperar el aviso.");
  }
}

async function obtenerEmpleados() {
  const messagesStore = useMessagesStore();
  const autenticacionStore = useAutenticacionStore();
  try {
    empleados.value = await empleadosAPI.getEmpleados(autenticacionStore.token);
  } catch (error) {
    messagesStore.showMessageErrors("Ha ocurrido un error al recuperar el empleado.");
  }
}

async function obtenerClientes() {
  const autenticacionStore = useAutenticacionStore();
  const messagesStore = useMessagesStore();
  try {
    clientes.value = await clientesAPI.getClientes(autenticacionStore.token);
  } catch (error) {
    messagesStore.showMessageErrors("Ha ocurrido un error al recuperar el cliente.");
  }
}

function validaYEnvia() {
  const messagesStore = useMessagesStore();
  let errores = avisosAsFunctionValidator.validate(aviso.value);
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
        const avisoFormateado = {
            nombre: aviso.value.nombre,
            descripcion: aviso.value.descripcion,
            id_empleado: aviso.value.id_empleado || null,
            id_cliente: aviso.value.id_cliente, 
            fecha: aviso.value.fecha,
            prioridad: aviso.value.prioridad,
            estado: aviso.value.estado
        };

        if (aviso.value.id) {
           const avisoAEditar =  await avisosAPI.editarAviso(aviso.value.id, avisoFormateado, autenticacionStore.token);
            const avisoEditado = avisoAEditar[0];
             if (avisoEditado.id_empleado) {
              try {
                    const empleadoAsignado = await empleadosAPI.getEmpleadoPorId(avisoEditado.id_empleado, autenticacionStore.token);
                    
                    let nombreCliente = ""; 
                    let direccionCliente = "";
                    const clienteAsignado = clientes.value.find(c => c.id === avisoEditado.id_cliente);
                    if (clienteAsignado) {
                        nombreCliente = clienteAsignado.nombre;
                        direccionCliente = clienteAsignado.direccion; 
                    }
          

                    if (empleadoAsignado && empleadoAsignado.correo) {
                        const contenidoParaCorreo = {
                            aviso: {
                                id: avisoEditado.id,
                                nombre: avisoEditado.nombre,
                                descripcion: avisoEditado.descripcion,
                                fecha: avisoEditado.fecha,
                                prioridad: avisoEditado.prioridad,
                                estado: avisoEditado.estado,
                                id_cliente: avisoEditado.id_cliente,
                                cliente: { nombre: nombreCliente, direccion: direccionCliente }, 
                            },
                            empleado: {
                                id: empleadoAsignado.id,
                                nombre: empleadoAsignado.nombre,
                                correo: empleadoAsignado.correo
                            }
                        };

                        await avisosAPI.enviarCorreoAvisoCreado(contenidoParaCorreo);
                    }
                } catch (error) {
                    messagesStore.showMessageErrors("Ha ocurrido un error al editar el aviso o enviar el correo de asignación.");
                }

              }


            messagesStore.showMessageSuccess("Aviso editado correctamente", "/lista-de-avisos");
        } else {
            const avisoCreate = await avisosAPI.crearAviso(avisoFormateado, autenticacionStore.token);
            const avisoCreado = avisoCreate[0];

            if (avisoCreado.id_empleado) {
                try {
                    const empleadoAsignado = await empleadosAPI.getEmpleadoPorId(avisoCreado.id_empleado, autenticacionStore.token);
                    
                    let nombreCliente = ""; 
                    let direccionCliente = "";
                    const clienteAsignado = clientes.value.find(c => c.id === avisoCreado.id_cliente);
                    if (clienteAsignado) {
                        nombreCliente = clienteAsignado.nombre;
                        direccionCliente = clienteAsignado.direccion; 
                    }
          

                    if (empleadoAsignado && empleadoAsignado.correo) {
                        const contenidoParaCorreo = {
                            aviso: {
                                id: avisoCreado.id,
                                nombre: avisoCreado.nombre,
                                descripcion: avisoCreado.descripcion,
                                fecha: avisoCreado.fecha,
                                prioridad: avisoCreado.prioridad,
                                estado: avisoCreado.estado,
                                id_cliente: avisoCreado.id_cliente,
                                cliente: { nombre: nombreCliente, direccion: direccionCliente }, 
                            },
                            empleado: {
                                id: empleadoAsignado.id,
                                nombre: empleadoAsignado.nombre,
                                correo: empleadoAsignado.correo
                            }
                        };

                        await avisosAPI.enviarCorreoAvisoCreado(contenidoParaCorreo);
                    }
                } catch (error) {
                    messagesStore.showMessageErrors("Ha ocurrido un error al crear el aviso o enviar el correo de asignación.");
                }
            }

            messagesStore.showMessageSuccess("Aviso creado correctamente", "/lista-de-avisos");
        }
    } catch (error) {
        messagesStore.showMessageErrors("Se ha producido un error. Vuelve a intentarlo más tarde");
    }
}


function setupFormAviso(route) {
  id.value = route.params.id || null;

  onMounted(() => {
    if (id.value) {
      obtenerAvisoPorId(id.value);
    } else {
      aviso.value = {
        nombre: "",
        descripcion: "",
        id_empleado: "",
        id_cliente: "",
        fecha: "",
        prioridad: "",
        estado: ""
      };
    }
    obtenerEmpleados();
    obtenerClientes();
  });
};

export {
  aviso,
  empleados,
  clientes,
  id,
  setupFormAviso,  
  validaYEnvia,
};

import { onMounted, ref } from "vue";
import clientesAPI from "@/api/clientesAPI";
import { useMessagesStore } from "@/stores/messages";
import clientesValidator from "@/validators/clientes";
import { useAutenticacionStore } from "@/stores/autenticacion";


const cliente = ref({
    nombre: "",
    direccion: "",
});

const id = ref(null);

async function obtenerClientePorId(id) {
    const autenticacionStore = useAutenticacionStore();
    const messageStore = useMessagesStore();
    try {
        cliente.value = await clientesAPI.getClientePorId(id, autenticacionStore.token);
    } catch (error) {
        messageStore.showMessageErrors("Ha ocurrido un error al obtener el cliente.");

    }

};

function validaYEnvia() {
    let errores = clientesValidator.validate(cliente.value);
    const messageStore = useMessagesStore();
    if (errores.length === 0) {
        enviarFormulario();
    } else {
        for (const error of errores) {
            messageStore.showMessageErrors(error)
        }
    }

};

const enviarFormulario = async () => {
    const messageStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
    try {
        const clienteFormateado = {
            nombre: cliente.value.nombre,
            direccion: cliente.value.direccion,
        };

        if (cliente.value.id) {
            await clientesAPI.editarCliente(cliente.value.id, clienteFormateado, autenticacionStore.token);
            messageStore.showMessageSuccess("Cliente actualizado con éxito" , "/lista-de-clientes");
        } else {
            await clientesAPI.crearCliente(clienteFormateado, autenticacionStore.token);
            messageStore.showMessageSuccess("Cliente creado con éxito" , "/lista-de-clientes");
        }
    } catch (error) {
        messageStore.showMessageErrors("Se ha producido un error. Vuelve a intentarlo más tarde");
    }

};

function setupFormCliente(route) {
    id.value = route.params.id || null;

    onMounted(() => {
        if (id.value) {
            obtenerClientePorId(id.value);
        } else {
            cliente.value = {
                nombre: "",
                direccion: "",
            }
        }
    });
};

export {
    cliente,
    id,
    setupFormCliente,
    validaYEnvia,
};




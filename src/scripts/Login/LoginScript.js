import { onMounted, ref } from "vue";
import { useAutenticacionStore } from "@/stores/autenticacion";
import empleadosAPI from "@/api/empleadosAPI";
import { useMessagesStore } from "@/stores/messages";

const datosLogin = ref({
    username: "",
    password: ""
  })

const visible = ref(false);

async function login () {
    const autenticacionStore = useAutenticacionStore();
    const messageStore = useMessagesStore();
  try {
    const datosLoginFormateado = {
      username: datosLogin.value.username,
      password: datosLogin.value.password
    };

    const respuesta = await empleadosAPI.login(datosLoginFormateado);
  
    if (respuesta.token) {
      autenticacionStore.login(respuesta.usuario, respuesta.token);
      messageStore.showMessageSuccess('Inicio de sesión exitoso' , "/menu-principal");
    } else {
      messageStore.showMessageErrors("No se ha podido iniciar sesión.")
    }
  } catch (error) {
    messageStore.showMessageErrors("El usuario o clave son incorrectos");
  }
};

function setupLogin(){
    onMounted(() => {
        datosLogin.value = {
            username: "",
            password:""
        }
    });
}

export{
    datosLogin,
    visible,
    login,
    setupLogin
}
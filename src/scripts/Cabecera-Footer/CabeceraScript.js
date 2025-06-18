import { ref } from "vue";
import { useAutenticacionStore } from "@/stores/autenticacion";

const drawer = ref(true);

const listaMenuLateral = ref([
  { nombre: "Avisos", icon: "mdi-alert", ruta: "lista-de-avisos" },
  { nombre: "Obras", icon: "mdi-wrench", ruta: "lista-de-obras" },
  { nombre: "Empleados", icon: "mdi-account-multiple", ruta: "lista-de-empleados" },
  { nombre: "Clientes", icon: "mdi-account-tie", ruta: "lista-de-clientes" },
]);

const items = ref([
  { title: "Cerrar Sesión", ruta: "cerrar-sesion"},
])

const cerrarSesion = ()=>{
    const autenticacionStore = useAutenticacionStore()
    autenticacionStore.logout("/")
}

export{
    drawer,
    listaMenuLateral,
    items,
    cerrarSesion,
}
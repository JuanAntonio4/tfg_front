import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAutenticacionStore = defineStore('autenticacion', () =>{

    const usuario = ref(JSON.parse(localStorage.getItem("usuario")) || null);
    const token = ref(localStorage.getItem("token") || null);
    const router = useRouter();

const login = (datosUsuario, nuevoToken) =>{
    usuario.value = datosUsuario
    token.value = nuevoToken
    localStorage.setItem('usuario' , JSON.stringify(datosUsuario));
    localStorage.setItem('token' , nuevoToken)

};

function logout(rutaRedireccion = null){

    usuario.value = null;
    token.value = null; 
    localStorage.clear()

    if(rutaRedireccion){
        router.push(rutaRedireccion);
    }

}

return {usuario, token, login, logout}



});
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";


export const useMessagesStore = defineStore('messages', () =>{

    const errores = ref([]);
    const success = ref([]);
    const router = useRouter();

    function showMessageErrors(errorMessage) {
        errores.value.push(errorMessage);
        setTimeout(() => {
            clearMessagesError(); 
        }, 5000);

    };

    function showMessageSuccess(successMessage, rutaRedireccion = null) {
        success.value.push(successMessage);
        setTimeout(() => {
            clearMessageSuccess(); 
            if(rutaRedireccion){
                router.push(rutaRedireccion);
            }
        }, 2500);

    };



    function clearMessagesError() {
        errores.value = [];
    };

    function clearMessageSuccess() {
        success.value = [];
    };
 

    return {errores,success,  showMessageErrors, clearMessagesError , 
        showMessageSuccess, clearMessageSuccess};

})
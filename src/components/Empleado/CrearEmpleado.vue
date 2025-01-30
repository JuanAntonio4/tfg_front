<template>
    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'lista-de-empleados'}"></v-btn>
     <h3 style="text-align: center; margin: 10px;">Da de alta un empleado</h3>
     
        <v-form v-model="valid" @submit.prevent="enviarFormulario" style="margin-bottom: 50px;">
          <v-container>
            <v-text-field 
              v-model="empleado.nombre"
              :rules="reglaNoVacio"
              label="Introduce el nombre completo del empleado"
              required
              clearable
              variant="outlined"
              class="mb-4"
            ></v-text-field>
  
            <v-text-field 
              v-model="empleado.usuario"
              :rules="reglaNoVacio"
              label="Introduce un nombre de usuario"
              required
              clearable
              variant="outlined"
              class="mb-4"
            ></v-text-field>
  
            <v-text-field 
              v-model="empleado.contraseña"
              :rules="reglaNoVacio"
              label="Introduce una contraseña"
              required
              clearable
              variant="outlined"
              class="mb-4"
            ></v-text-field>
  
            <v-text-field 
              v-model="empleado.correo"
              :rules="reglaNoVacio"
              label="Introduce un correo electrónico"
              required
              clearable
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-text-field 
              v-model="empleado.telefono"
              :rules="reglaNoVacio"
              label="Introduce un teléfono de contacto"
              required
              clearable
              variant="outlined"
              class="mb-4"
            ></v-text-field>
  
            <v-select
              label="Selecciona el rol del empleado"
              :items="['JEFE', 'TRABAJADOR']"
              v-model="empleado.rol"
              :rules="reglaNoVacio"
              required
              clearable
              variant="outlined"
              class="mb-4"
            ></v-select>
            
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn class="mt-2" type="submit">Enviar</v-btn>
              </v-col>
           </v-row>  
           
           <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¡Empleado Creado!</v-card-title>
                <v-card-text>El empleado se ha dado de alta correctamente.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="cerrarDialogo">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


          </v-container>
        </v-form>
  
  
  
</template>

<script setup>
 import {useRouter } from "vue-router";
import { ref, onMounted} from "vue";
  
  // Datos reactivos
  const empleado = ref({
    nombre: "",
    usuario: "",
    contraseña: "",
    correo:"",
    telefono:"",
    rol: "",
  });

  const dialog = ref(false);
  const router = useRouter();

  const enviarFormulario = async () =>{
    try {
        const empleadoSimple = {...empleado.value};

        const respuesta = await fetch('/api/empleados' , {
            method: 'POST',
            body: JSON.stringify(empleadoSimple),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!respuesta.ok) {
            throw new Error("Error al crear el aviso");
        }

        dialog.value= true;

    } catch (error) {
        console.error("Error:", error);
    }

  };

  const cerrarDialogo = () => {
    dialog.value = false;
    router.push('/lista-de-empleados')
  };


  const reglaNoVacio = [
  value => {
    if (!value || value.trim() === "") {
      return  "Este campo no puede estar vacío.";
    }
    return true;
  }
];

</script>

<style scoped>


</style>
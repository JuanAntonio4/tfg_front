<template>
    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'lista-de-empleados'}"></v-btn>
     <h3 style="text-align: center; margin: 10px;">Edita el empleado: {{ empleado.nombre }}</h3>
     
        <v-form v-model="valid" @submit.prevent="editarEmpleado" >
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
                <v-btn class="mt-2" type="submit" color="primary">Guardar Cambios</v-btn>
              </v-col>
           </v-row>  
           
           <v-dialog v-model="dialogoOk" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¡Empleado Editado!</v-card-title>
                <v-card-text>El empleado se ha modificado correctamente.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="cerrarDialogoOK">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogoSinCambios" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¡No has realizado ningún cambio!</v-card-title>
                <v-card-text>El empleado no se ha modificado correctamente ya que no has editado ningún campo</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="cerrarDialogoSinCambios">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


          </v-container>
        </v-form>
  
  
  
</template>

<script setup>
import {useRouter,useRoute } from "vue-router";
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

  const dialogoOk = ref(false);
  const dialogoSinCambios = ref(false)
  const router = useRouter();
  const route = useRoute();

  onMounted(async ()=>{
    const id = route.params.id
    const respuesta = await fetch(`/api/empleados/${id}`)
    const data = await respuesta.json()
    empleado.value= data
  })

  const editarEmpleado = async() =>{
    const id = route.params.id
    try {
        const respuesta = await fetch(`/api/empleados/${id}/editar` ,{
            method: 'PUT',
            body: JSON.stringify(empleado.value),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!respuesta.ok) {
            throw new Error("Error al eliminar el aviso");
        }

        const mensajeBack = await respuesta.text();
        if (mensajeBack == "No has realizado ningún cambio") {
            dialogoSinCambios.value= true
        }else {
            dialogoOk.value = true;
        }
        
    } catch (error) {
        alert('Hubo un error al eliminar el aviso');
    }

  }

  const cerrarDialogoOK = () =>{
    dialogoOk.value = false
    router.push('/lista-de-empleados')
  }

  const cerrarDialogoSinCambios = () =>{
    dialogoSinCambios.value = false;
  }

  </script>
<template>
  <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'lista-de-avisos'}"></v-btn>
  <h3 style="text-align: center; margin: 10px;">Editar el aviso:  {{ aviso.nombre }}</h3>

  <v-form v-model="valid" @submit.prevent="editarAviso">
    <v-container>

      <v-text-field 
            v-model="aviso.nombre"
            label="Introduce el nombre del aviso"
            required
            clearable
            variant="outlined"
            class="mb-4"
          ></v-text-field>

          <v-textarea
           v-model="aviso.descripcion"
            label="Introduce una descipción para el aviso"
            required
            clearable
            variant="outlined"
            class="mb-4"
          ></v-textarea>

          <v-select
            v-model="aviso.empleado"
            label="Asigna un empleado"
            :items="empleados"
            item-title="nombre"
            item-value="id"
            required
            clearable
            variant="outlined"   
            class="mb-4"        
          ></v-select>

          <v-select
            v-model="aviso.cliente"
            label="Selecciona un cliente"
            :items="clientes"
            item-title="nombre"
            item-value="id"
            required
            clearable
            variant="outlined"       
            class="mb-4"    
          ></v-select>

          <v-text-field
            v-model="aviso.fecha"
            type="date"
            label="Selecciona una fecha"
            required
            clearable
            variant="outlined"   
            class="mb-4"
          />

          <v-select
            label="Selecciona la prioridad"
            :items="['URGENTE', 'NORMAL']"
            v-model="aviso.prioridad"
            required
            clearable
            variant="outlined"
            class="mb-4"
          ></v-select>

          <v-select
            label="Seleccione el estado"
            :items="['EN_ESPERA', 'EN_PROCESO' , 'FINALIZADO']"
            v-model="aviso.estado"
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
              <v-card-title class="text-h6">¡Aviso Editado!</v-card-title>
              <v-card-text>El aviso se ha modificado correctamente.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="cerrarDialogoOK">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogoSinCambios" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¡No has realizado ningún cambio!</v-card-title>
                <v-card-text>El aviso no se ha modificado correctamente ya que no has editado ningún campo</v-card-text>
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const aviso = ref({
  nombre: "",
  descripcion: "",
  usuario: "",
  cliente:"",
  direccion: "",
  fecha:"",
  prioridad: "",
  estado:"",
}); 

const valid = ref(false); // Validador del formulario
const error = ref(false); // Bandera para errores
const router = useRouter();
const route = useRoute();
const dialogoOk = ref(false);
const dialogoSinCambios = ref(false)
const empleados= ref ([]);


  onMounted(async ()=>{
    const respuesta = await fetch('/api/empleados')
    const data = await respuesta.json()
    empleados.value = data
  })

  const clientes= ref ([]);
  onMounted(async ()=>{
    const respuesta = await fetch('/api/clientes')
    const data = await respuesta.json()
    clientes.value = data
  })


onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await fetch(`/api/avisos/${id}`);
    if (!response.ok) {
      throw new Error("Aviso no encontrado");
    }
    aviso.value = await response.json();
  } catch (e) {
    console.error("Error al cargar el aviso:", e);
    error.value = true;
  }
});

const editarAviso = async () => {
  const id = route.params.id;
  const avisoSimple={ ...aviso.value, empleado: { id: aviso.value.empleado.id ?? aviso.value.empleado } , 
        cliente:{id: aviso.value.cliente.id ?? aviso.value.cliente}};
  try {
    const respuesta = await fetch(`/api/avisos/${id}/editar`, {
      method: "PUT",
      body: JSON.stringify(avisoSimple),
      headers: {
        "Content-Type": "application/json",
      },
      
    });

    if (!respuesta.ok) {
      throw new Error("Error al guardar el aviso");
    }

    const mensajeBack = await respuesta.text();
        if (mensajeBack == "No has realizado ningún cambio") {
            dialogoSinCambios.value= true
        }else {
            dialogoOk.value = true;
        }
    
  } catch (e) {
    console.error("Hola al guardar el aviso:", e);
 
  }
};

const cerrarDialogoOK = () => {
  dialogoOk.value = false;
  router.push("/lista-de-avisos");
};

const cerrarDialogoSinCambios = () =>{
    dialogoSinCambios.value = false;
  }

</script>

<style scoped>
</style>

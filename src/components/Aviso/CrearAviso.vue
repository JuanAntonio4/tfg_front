<template>
  <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'lista-de-avisos'}"></v-btn>
   <h3 style="text-align: center; margin: 10px;">Crea un aviso</h3>
   
      <v-form v-model="valid" @submit.prevent="enviarFormulario" style="margin-bottom: 50px;">
        <v-container>
          <v-text-field 
            v-model="aviso.nombre"
            :rules="reglaNoVacio"
            label="Introduce el nombre del aviso"
            required
            clearable
            variant="outlined"
            class="mb-4"
          ></v-text-field>

          <v-textarea
           v-model="aviso.descripcion"
            :rules="reglaNoVacio"
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
            :rules="reglaNoVacio"
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
            :rules="reglaNoVacio"
            required
            clearable
            variant="outlined"       
            class="mb-4"    
          ></v-select>

          <v-text-field
            v-model="aviso.fecha"
            type="date"
            label="Selecciona una fecha"
            :rules="reglaNoVacio"
            required
            clearable
            variant="outlined"   
            class="mb-4"
          />

          <v-select
            label="Selecciona la prioridad"
            :items="['URGENTE', 'NORMAL']"
            v-model="aviso.prioridad"
            :rules="reglaNoVacio"
            required
            clearable
            variant="outlined"
            class="mb-4"
          ></v-select>

          <v-select
            label="Seleccione el estado"
            :items="['EN_ESPERA', 'EN_PROCESO' , 'FINALIZADO']"
            v-model="aviso.estado"
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
              <v-card-title class="text-h6">¡Aviso Creado!</v-card-title>
              <v-card-text>El aviso se ha creado correctamente.</v-card-text>
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
  import { ref, onMounted} from "vue";
  import { useRouter } from "vue-router";
  
  // Datos reactivos
  const aviso = ref({
    nombre: "",
    descripcion: "",
    empleado: "",
    cliente:"",
    fecha:"",
    prioridad: "",
    estado:""
  });
  

  const empleados= ref ([]);
  const dialog = ref(false);

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


  // Router para redirigir
  const router = useRouter();
  
  // Método para enviar el formulario
  const enviarFormulario = async () => {

    try {
      const avisoSimple = { ...aviso.value, cliente: { id: aviso.value.cliente },  empleado: { id: aviso.value.empleado } };

      // Ahora puedes enviar el objeto sin problemas
      const response = await fetch('/api/avisos' , {
        method: "POST",
        body:JSON.stringify(avisoSimple),
        headers: { 'Content-Type': 'application/json' }
          
      })

      if(!response.ok){
        throw new Error("Error al crear el aviso");
      }

      dialog.value = true
    } catch (error) {
      console.error("Error:", error);
    }

  };

  const cerrarDialogo = () => {
    dialog.value = false;
    router.push('/lista-de-avisos');
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
  
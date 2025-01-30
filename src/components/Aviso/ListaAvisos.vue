<template>

<v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'menu-principal'}"></v-btn>
<v-btn icon="mdi-plus" size="small" style="margin-left: 20px;" :to="{name:'crear-aviso'}"></v-btn>
  <h3 style="text-align: center; margin: 10px;">Lista de avisos</h3>
  <v-card style="margin: 10px;">
  <v-text-field
        v-model="search"
        label="Realiza una busqueda por cualquier tipo"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </v-card>

    <v-divider></v-divider>
  
  <v-data-table
    :headers="headers"
    :items="avisos"
    items-value="totalItems"
    :search="search"
  >
  <template #item.acciones="{ item }">
      <v-menu
        activator="parent"
        offset-y
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
             prepend-icon="mdi-pencil"
            @click="editarAviso(item)"
          >
            <v-list-item-title>Editar</v-list-item-title>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-delete"
            @click="abrirDialogo(item)"
          >
            <v-list-item-title>Eliminar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>

  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title class="text-h6">Confirmación de Eliminación</v-card-title>
      <v-card-text>
        ¿Estás seguro de que deseas eliminar este aviso?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="cerrarDialogo">Cancelar</v-btn>
        <v-btn color="error" @click="eliminarAviso">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 

const router = useRouter(); 

const headers = ref([
  { title: 'Nombre del aviso', key: 'nombre', align: 'start' },
  { title: 'Descripción del aviso', key: 'descripcion', align: 'start' },
  { title: 'Usuario', key: 'empleado.usuario', align: 'start' },
  { title: 'Cliente', key: 'cliente.nombre', align: 'start' },
  { title: 'Fecha de creación', key: 'fecha', align: 'start' },
  { title: 'Prioridad', key: 'prioridad', align: 'start' },
  { title: 'Estado', key: 'estado', align: 'start' },
  { title: 'Acciones', key: 'acciones', align: 'end' },
  

]);

const search= ref([]);
const avisos = ref([])
const dialog = ref(false);
const avisoAEliminar = ref(null);


onMounted(async ()=>{
  const respuesta = await fetch('http://localhost:8080/api/avisos')
  const data = await respuesta.json()
  console.log(data)
  avisos.value = data

})

const abrirDialogo = (aviso) => {
  avisoAEliminar.value = aviso; 
  dialog.value = true; 
};

const cerrarDialogo = () => {
  avisoAEliminar.value = null; 
  dialog.value = false; 
};

const editarAviso = (aviso) => {
  router.push({ name: 'editar-aviso', params: { id: aviso.id } });
};

const eliminarAviso = async () => {

  try { 
    const response = await fetch(`/api/avisos/${avisoAEliminar.value.id}/eliminar`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el aviso");
      }

      // Actualizamos la lista
      avisos.value = avisos.value.filter(item => item.id !== avisoAEliminar.value.id);

  } catch (error) {
    alert('Hubo un error al eliminar el aviso');
  } finally{
    cerrarDialogo();
  }
    

  
};



</script>

<style scoped>


</style>


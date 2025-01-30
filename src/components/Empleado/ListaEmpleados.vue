<template>

    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'menu-principal'}"></v-btn>
    <v-btn icon="mdi-plus" size="small" style="margin-left: 20px;" :to="{name:'crear-empleado'}"></v-btn>
      <h3 style="text-align: center; margin: 10px;">Lista de empleados</h3>
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
        :items="empleados"
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
                @click="editarEmpleado(item)"
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
            ¿Estás seguro de que deseas dar de baja el empleado de la aplicación?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="cerrarDialogo">Cancelar</v-btn>
            <v-btn color="error" @click="eliminarEmpleado">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </template>
    
    <script setup>
    import { ref, onMounted} from 'vue';
    import {useRouter } from "vue-router";

    const headers = ref([
      { title: 'Nombre', key: 'nombre', align: 'start' },
      { title: 'Usuario', key: 'usuario', align: 'start' },
      { title: 'Correo electrónico', key: 'correo', align: 'start' },
      { title: 'Teléfono', key: 'telefono', align: 'start' },
      { title: 'Rol', key: 'rol', align: 'start' },
      { title: 'Acciones', key: 'acciones', align: 'end' },
      
    
    ]);
    
    const empleados = ref([]);
    const search= ref([]);
    const dialog = ref(false);
    const empleadoAEliminar= ref(null);
    const router = useRouter();

    const abrirDialogo = (empleado) => {
      dialog.value = true;
      empleadoAEliminar.value = empleado
    };

    const editarEmpleado = (empleado) =>{
      router.push({name:'editar-empleado', params: {id:empleado.id}})
    }
    const eliminarEmpleado = async () =>{
      try {
        const respuesta  = await fetch(`/api/empleados/${empleadoAEliminar.value.id}/eliminar`, {
          method: 'DELETE',
          headers: {
          "Content-Type": "application/json",
        },
        })

        if (!respuesta.ok) {
          throw new Error("Error al eliminar el aviso");
        }

        empleados.value = empleados.value.filter(item => item.id !== empleadoAEliminar.value.id );
      } catch (error) {
        alert('Hubo un error al eliminar el aviso');
      } finally{
        cerrarDialogo()
      }

    };
    
    onMounted(async () => {
      const respuesta = await fetch('/api/empleados');
      const data = await respuesta.json()
      empleados.value = data
    });

    const cerrarDialogo = () => {
      dialog.value = false;
      empleadoAEliminar.value = null
    };

    

    
    </script>
    
    <style scoped>
    
    
    </style>
    
    
<template>

    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'menu-principal'}"></v-btn>
    <v-btn icon="mdi-plus" size="small" style="margin-left: 20px;" :to="{name:'crear-cliente'}"></v-btn>
      <h3 style="text-align: center; margin: 10px;">Lista de clientes</h3>
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
        :items="clientes"
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
                @click="editarCliente(item)"
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
            ¿Estás seguro de que deseas dar de baja este cliente/empresa?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="cerrarDialogo">Cancelar</v-btn>
            <v-btn color="error" @click="eliminarCliente">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router'; 
    
    const headers = ref([
      { title: 'Nombre', key: 'nombre', align: 'start' },
      { title: 'Dirección del cliente', key: 'direccion', align: 'center' },
      { title: 'Acciones', key: 'acciones', align: 'end' },
      
    
    ]);
    
    const clientes = ref([]);
    const search= ref([]);
    const dialog = ref(false);
    const clienteAEliminar =ref(null);
    const router = useRouter();

    onMounted(async () => {
      const respuesta = await fetch('/api/clientes')
      const data = await respuesta.json()
      clientes.value= data
    });

    const editarCliente = (cliente) =>{
      router.push({name: 'editar-cliente' , params: { id: cliente.id }})
    }
    const eliminarCliente = async () => {
      try {

        const respuesta = await fetch(`/api/clientes/${clienteAEliminar.value.id}/eliminar` , {
          method: 'DELETE',
          headers :  { 'Content-Type': 'application/json' }
        })

        if (!respuesta.ok) {
          throw new Error("Error al eliminar el aviso");
        }

        clientes.value = clientes.value.filter(item => item.id !== clienteAEliminar.value.id)
        
      } catch (error) {
        alert('Hubo un error al eliminar el aviso');

      } finally {
        cerrarDialogo()
      }

    };

    const abrirDialogo = (cliente) => {
      dialog.value = true;
      clienteAEliminar.value = cliente
    };

    const cerrarDialogo = (cliente) => {
      dialog.value = false;
      clienteAEliminar.value = null
    };

    
    </script>
    
    <style scoped>
    
    
    </style>
    
    
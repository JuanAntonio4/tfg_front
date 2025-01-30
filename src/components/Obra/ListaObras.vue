<template>
    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'menu-principal'}"></v-btn>
    <v-btn icon="mdi-plus" size="small" style="margin-left: 20px;" :to="{name:'crear-obra'}"></v-btn>
      <h3 style="text-align: center; margin: 10px;">Lista de obras</h3>
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
        :items="obras"
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
                @click="editarObra(item)"
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
          ¿Estás seguro de que deseas eliminar esta obra?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cerrarDialogo">Cancelar</v-btn>
          <v-btn color="error" @click="eliminarObra">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    
    const headers = ref([
      { title: 'Nombre de la obra', key: 'nombre', align: 'start' },
      { title: 'Cliente', key: 'cliente.nombre', align: 'start' },
      { title: 'Direccion del cliente', key: 'cliente.direccion', align: 'start' },
      { title: 'Fecha prevista de fin', key: 'fechaPrevistaFin', align: 'start' },
      { title: 'Acciones', key: 'acciones', align: 'end' },
      
    
    ]);
    
    const obras = ref([]);
    const search= ref([]);
    const dialog = ref(false);
    const obraAEliminar = ref(null);
    const router = useRouter();
    
    
    onMounted(async () => {
      const respuesta = await fetch('/api/obras')
      const data  = await respuesta.json()
      obras.value = data
    });


    const abrirDialogo = (obra) =>{
      dialog.value = true;
      obraAEliminar.value = obra;
      
    };

    const editarObra = (obra) =>{
      router.push({ name: 'editar-obra', params: { id: obra.id } })
    }

    const eliminarObra = async () => {
      try {
        
        const respuesta = await fetch(`/api/obras/${obraAEliminar.value.id}/eliminar`,{
          method: 'DELETE',
          headers: {"Content-Type": "application/json", }
        });

        if (!respuesta.ok) {
          throw new Error("Error al eliminar el aviso");
        }
        obras.value = obras.value.filter(item => item.id !== obraAEliminar.value.id);

      } catch (error) {
        alert('Hubo un error al eliminar el aviso');
      }finally{
        cerrarDialogo();
      }

    };

    
    const cerrarDialogo = () =>{
      obraAEliminar.value = null;
      dialog.value = false;
    };

    
    </script>
    
    <style scoped>
    
    
    </style>
    
    
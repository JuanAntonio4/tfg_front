<template>

  <div v-if="tipo === 'aviso'">
    <v-container fluid class="d-flex justify-center align-center">
      <v-card elevation="10" max-width="800" class="pa-8 rounded-xl" style="width: 90%;">
        <v-btn icon="mdi-arrow-left" size="small" class="mb-4" :to="{ name: 'lista-de-avisos' }"></v-btn>

        <h3 class="text-h5 text-center font-weight-medium mb-6">
          Introduzca el trabajo realizado en el aviso
        </h3>

        <v-form ref="form" @submit.prevent="validaYEnvia">
         

            <v-text-field v-model="trabajo_realizado_aviso.descripcion_trabajo_realizado"
              label="Introduce una descripción del trabajo que has realizado" required clearable variant="outlined"
              class="mb-4">
            </v-text-field>

            <v-card elevation="17" title="Ingresa los materiales usados">

              <v-select v-model="materialSeleccionado" label="Selecciona el material" :items="materiales"
                :item-title="nombreMaterialesEnSelect" item-value="id" required clearable variant="outlined"
                class="mt-5 mb-5 ml-5 mr-5"></v-select>

              <v-text-field v-model="cantidadSeleccionada" label="Cantidad utilizada" type="number" required clearable
                variant="outlined" class="mt-5 mb-5 ml-5 mr-5" />

              <v-btn @click="agregarMaterial" color="primary" class=" mb-5 ml-5 mr-5">Añadir Material</v-btn>


              <v-list>
                <v-list-item v-for="(item, index) in materialesUsados" :key="index">
                  <v-list-item-title>
                    {{ obtenerNombreMaterial(item.id_material) }} - Cantidad: {{ item.cantidad }}
                  </v-list-item-title>
                  <v-btn @click="eliminarMaterial(index)" icon="mdi-delete" class="mt-2 mb-2"></v-btn>
                </v-list-item>
              </v-list>

            </v-card>

            <v-textarea v-model="trabajo_realizado_aviso.observaciones"
              label="Introduzca alguna observación si es necesario" clearable variant="outlined"
              class="mb-4 mt-10"></v-textarea>

            <v-text-field v-model="trabajo_realizado_aviso.fecha_atencion" type="date" label="Selecciona la fecha de atención "
              required clearable variant="outlined" class="mb-4" />

            <v-select label="Seleccione el estado" :items="['EN_PROCESO', 'FINALIZADO']"
              v-model="trabajo_realizado_aviso.estado" required clearable variant="outlined" class="mb-4"></v-select>

            
                <v-btn class="mt-2" type="submit" color="primary" block large>Enviar</v-btn>
            
          
        </v-form>
      </v-card>
    </v-container>
  </div>

  <div v-else>
    <v-container fluid class="d-flex justify-center align-center">
      <v-card elevation="10" max-width="800" class="pa-8 rounded-xl" style="width: 90%;">
        <v-btn icon="mdi-arrow-left" size="small" class="mb-4" :to="{ name: 'lista-de-obras' }"></v-btn>

        <h3 class="text-h5 text-center font-weight-medium mb-6">Introduzca el trabajo realizado en la obra</h3>

        <v-form ref="form" @submit.prevent="validaYEnvia" >
         

            <v-text-field v-model="trabajo_realizado_obra.descripcion_trabajo_realizado"
              label="Introduce una descripción del trabajo que has realizado" required clearable variant="outlined"
              class="mb-4"></v-text-field>

            <v-card elevation="17" title="Ingresa los materiales usados">

              <v-select v-model="materialSeleccionado" label="Selecciona el material" :items="materiales"
                item-title="nombre" item-value="id" required clearable variant="outlined"
                class="mt-5 mb-5 ml-5 mr-5"></v-select>

              <v-text-field v-model="cantidadSeleccionada" label="Cantidad utilizada" type="number" required clearable
                variant="outlined" class="mt-5 mb-5 ml-5 mr-5" />

              <v-btn @click="agregarMaterial" color="primary" class=" mb-5 ml-5 mr-5">Añadir Material</v-btn>

         
              <v-list>
                <v-list-item v-for="(item, index) in materialesUsados" :key="index">
                  <v-list-item-title>
                    {{ obtenerNombreMaterial(item.id_material) }} - Cantidad: {{ item.cantidad }}
                  </v-list-item-title>
                  <v-btn @click="eliminarMaterial(index)" icon="mdi-delete" class="mt-2 mb-2"></v-btn>
                </v-list-item>
              </v-list>

            </v-card>

            <v-textarea v-model="trabajo_realizado_obra.observaciones"
              label="Introduzca alguna observación si es necesario" clearable variant="outlined"
              class="mb-4 mt-10"></v-textarea>

            <v-text-field v-model="trabajo_realizado_obra.fecha_atencion" type="date" label="Selecciona la fecha de atención "
              required clearable variant="outlined" class="mb-4" />

            <v-text-field v-model="trabajo_realizado_obra.horas_invertidas" type="number" label="Selecciona las horas trabajadas "
              required clearable variant="outlined" class="mb-4" />

            
                <v-btn class="mt-2" type="submit" color="primary" block large>Enviar</v-btn>
            

       
        </v-form>
      </v-card>
    </v-container>

  </div>

</template>

<script setup>
import { agregarMaterial, cantidadSeleccionada, materialesUsados, materialSeleccionado, obtenerNombreMaterial, eliminarMaterial,nombreMaterialesEnSelect } from '@/scripts/TrabajoRealizado/FormTrabajoRealizadoScript'


defineProps({
  trabajo_realizado_aviso: Object,
  trabajo_realizado_obra: Object,
  validaYEnvia: Function,
  materiales: Array,
  id: [String, Number],
  tipo: String
});

</script>

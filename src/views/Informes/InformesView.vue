<template>
  <v-container style="background-color: white;">
    <v-btn
      v-if="tipo === 'aviso'"
      icon="mdi-arrow-left"
      size="small"
      class="button-back"
      :to="{ name: 'lista-de-avisos' }"
    ></v-btn>
    <v-btn
      v-else
      icon="mdi-arrow-left"
      size="small"
      class="button-back"
      :to="{ name: 'lista-de-obras' }"
    ></v-btn>

    <v-btn @click="generarPDF" append-icon="mdi-download" variant="outlined"
      style="background-color: white; margin-left: 20px; margin-top: 20px; margin-bottom: 20px;">
      Descargar en PDF
    </v-btn>

    <v-btn @click="enviarCorreo" style="margin-left: 20px; margin-top: 20px; margin-bottom: 20px; background-color: white;"
      append-icon="mdi-email" variant="outlined">Enviar por Correo</v-btn>

    <div>
    
      <div v-if="tipo === 'aviso'">
        <div id="pdf-container">
          <h2 class="title">
            Informes del aviso: {{ trabajo_realizado_aviso[0]?.aviso?.nombre }}
          </h2>

          <div
            v-for="(trabajo, index) in trabajo_realizado_aviso"
            :key="index"
            class="table-container"
          >
            <h3 class="date">
              Generado el día: {{ trabajo?.fecha_atencion }}
            </h3>

            <table class="principal-table">
              <tbody>
                <tr><td>CLIENTE</td><td>{{ trabajo?.aviso?.cliente?.nombre }}</td></tr>
                <tr><td>DIRECCIÓN</td><td>{{ trabajo?.aviso?.cliente?.direccion }}</td></tr>
                <tr><td>FECHA</td><td>{{ trabajo?.fecha_atencion }}</td></tr>
                <tr><td>TRABAJADOR</td><td>{{ trabajo?.empleado?.nombre }}</td></tr>
                <tr><td>TRABAJO REALIZADO</td><td>{{ trabajo?.descripcion_trabajo_realizado }}</td></tr>
                <tr><td>OBSERVACIONES</td><td>{{ trabajo?.observaciones }}</td></tr>
                <tr>
                  <td>MATERIAL / MANO OBRA</td>
                  <td>
                    <table class="materials-table">
                      <thead>
                        <tr>
                          <th>Material</th>
                          <th>Cantidad</th>
                          <th>Unidad</th>
                          <th>Precio Unitario</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(materialUsado, i) in trabajo.material_usado" :key="i">
                          <td>{{ materialUsado.material.nombre }}</td>
                          <td>{{ materialUsado.cantidad }}</td>
                          <td>{{ materialUsado.material.unidad }}</td>
                          <td>{{ materialUsado.material.precio }},00€</td>
                          <td>{{ materialUsado.material.precio * materialUsado.cantidad }},00€</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

  
      <div v-else>
        <div id="pdf-container">
          <h2 class="title">
            Informes de la obra: {{ trabajo_realizado_obra[0]?.obra?.nombre }}
          </h2>

          <div
            v-for="(trabajo, index) in trabajo_realizado_obra"
            :key="index"
            class="table-container"
          >
            <h3 class="date">
              Generado el día: {{ trabajo?.fecha_atencion }}
            </h3>

            <table class="principal-table">
              <tbody>
                <tr><td>CLIENTE:</td><td>{{ trabajo?.obra?.cliente?.nombre }}</td></tr>
                <tr><td>DIRECCIÓN:</td><td>{{ trabajo?.obra?.cliente?.direccion }}</td></tr>
                <tr><td>FECHA:</td><td>{{ trabajo?.fecha_atencion }}</td></tr>
                <tr><td>TRABAJADOR:</td><td>{{ trabajo?.empleado?.nombre }}</td></tr>
                <tr><td>TRABAJO REALIZADO:</td><td>{{ trabajo?.descripcion_trabajo_realizado }}</td></tr>
                <tr><td>HORAS INVERTIDAS:</td><td>{{ trabajo?.horas_invertidas }}h</td></tr>
                <tr><td>OBSERVACIONES:</td><td>{{ trabajo?.observaciones }}</td></tr>
                <tr>
                  <td>MATERIAL / MANO OBRA:</td>
                  <td>
                    <table class="materiales-table">
                      <thead>
                        <tr>
                          <th>Material</th>
                          <th>Cantidad</th>
                          <th>Precio Unitario</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(materialUsado, i) in trabajo.material_usado" :key="i">
                          <td>{{ materialUsado.material.nombre }}</td>
                          <td>{{ materialUsado.cantidad }}</td>
                          <td>{{ materialUsado.material.precio }},00€</td>
                          <td>{{ materialUsado.material.precio * materialUsado.cantidad }},00€</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { generarPDF, enviarCorreo } from '@/scripts/Informes/InformesScript'
import '@/assets/style/informe.css'

const props = defineProps({
  trabajo_realizado_aviso: Array,
  trabajo_realizado_obra: Array,
  tipo: String,
})
</script>

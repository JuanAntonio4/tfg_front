<template>
  <v-container style="background-color: white;">
    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px; margin-top: 20px; margin-bottom: 20px;"
      :to="{ name: 'lista-de-avisos' }"></v-btn>

    <v-btn @click="generarPDF" append-icon="mdi-download" variant="outlined"
      style="background-color: white; margin-left: 20px; margin-top: 20px; margin-bottom: 20px;">Descargar en PDF</v-btn>
      
    <v-btn @click="enviarCorreo" style="margin-left: 20px;margin-top: 20px ;margin-bottom: 20px; background-color: white;"
      append-icon="mdi-email" variant="outlined">Enviar por Correo</v-btn>

    <v-divider></v-divider>

    <div v-for="(trabajo, index) in trabajo_realizado_aviso" :key="index">
      <div id="pdf-content" style="margin-top: 20px;" v-if="trabajo.estado === 'FINALIZADO'">

        <div class="d-flex justify-space-between align-center mb-6">
          <v-img :src="logo" alt="Logo" style="max-width: 200px;" />
          <div style="text-align: right;">
            <strong>EDISONING S.L.</strong><br />
            Av. Mar del Sur, 11312 Torreguadiaro, Cádiz (Sotogrande)<br />
            Teléfono de contacto: +34 956 615 694<br />
            Whatsapp: +34 673 50 40 08<br />
            Email: edisoning@edisoning.com
          </div>
        </div>

        <v-divider></v-divider>


        <div class="d-flex justify-space-between mb-6">
          <div>
            <strong>{{ trabajo?.id_aviso?.cliente?.nombre }}</strong><br />
            {{ trabajo?.aviso?.cliente?.direccion }}<br />
            España
          </div>
          <div>
            <strong>Presupuesto</strong><br />
            Nº: {{ trabajo?.id_aviso }}<br />
            Fecha: {{ trabajo?.fecha_atencion }}<br />
          </div>
        </div>

        <v-divider></v-divider>


        <table>
          <tbody>
            <tr>
              <td class="cabecera1">CLIENTE</td>
              <td class="celda1">{{ trabajo?.aviso?.cliente?.nombre }}</td>
            </tr>
            <tr>
              <td class="cabecera2">DIRECCIÓN</td>
              <td class="celda2">{{ trabajo?.aviso?.cliente?.direccion }}</td>
            </tr>
            <tr>
              <td class="cabecera3">FECHA</td>
              <td class="celda3">{{ trabajo?.fecha_atencion}}</td>
            </tr>
            <tr>
              <td class="cabecera4">TRABAJADOR</td>
              <td class="celda4">{{ trabajo?.empleado?.nombre }}</td>
            </tr>
            <tr>
              <td class="cabecera5">TRABAJO REALIZADO</td>
              <td class="celda5">{{ trabajo?.descripcion_trabajo_realizado}}</td>
            </tr>
            <tr>
              <td class="cabecera6">MATERIAL<br>MANO OBRA<br></td>
              <td class="celda6">

                <table style="width: 100%; border-collapse: collapse; border: none;">
                  <thead>
                      <tr>
                        <th>Material</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                  <template v-for="(trabajos, index) in trabajo_realizado_aviso" :key="index">
                    <template v-for="(materialUsado) in trabajos.material_usado">
                      <tr>
                        <td style="text-align: left; width: 20% ;border: none;">{{ materialUsado.material.nombre }}</td>
                        <td style="text-align: center; border: none;white-space: nowrap;">{{ materialUsado.cantidad }}</td>
                        <td style="text-align: center; border: none;white-space: nowrap;">{{ materialUsado.material.unidad }}</td>
                        <td style="text-align: left; width: 7%; border: none;">{{ materialUsado.material.precio }},00</td>
                        <td style="text-align: left; padding-left: 30px; border: none;">{{ materialUsado.material.precio * materialUsado.cantidad }},00</td>
                      </tr>

                    </template>

                  </template>

                </table>

                <div style="margin-top: 30px; display: flex; flex-direction: column; align-items: flex-end; text-align: right;">
                  <div style="margin-bottom: 4px;">
                    <span style="font-weight: normal;">Subtotal sin IVA</span>
                    <span style="margin-left: 30px;">{{ calcularTotalMateriales().toLocaleString('es-ES', { minimumFractionDigits: 2 })}} €</span>
                  </div>
                  <div style="margin-bottom: 4px;">
                    <span style="font-weight: normal;">IVA 21% de {{ calcularTotalMateriales().toLocaleString('es-ES', {
                      minimumFractionDigits: 2 }) }}</span>
                    <span style="margin-left: 30px;">{{ calcularIVA().toLocaleString('es-ES', {
                      minimumFractionDigits: 2
                      }) }} €</span>
                  </div>
                  <div style="font-weight: bold; font-size: 1.1rem;">
                    <span>Total EUR</span>
                    <span style="margin-left: 30px;">{{ calcularTotalConIVA().toLocaleString('es-ES', {
                      minimumFractionDigits: 2 }) }}
                      €</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="cabecera7">OBSERVACIONES</td>
              <td class="celda7">{{ trabajo_realizado_aviso?.observaciones }}</td>
            </tr>
            <tr>
              <td class="cabecera8">TIPO DE DOCUMENTO</td>
              <td class="celda8">Presupuesto</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </v-container>



</template>

<script setup>
import "@/assets/style/presupuesto.css";
import { generarPDF, enviarCorreo, calcularTotalMateriales, calcularIVA, calcularTotalConIVA } from "@/scripts/Presupuestos/PresupuestosScript";
import logo from '@/assets/LOGO-EDISONING.jpg';

const props = defineProps({
  trabajo_realizado_aviso: Array,
});

</script>

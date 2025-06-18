<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid>
    <v-row class="fill-height" no-gutters>
      <v-col cols="12" md="6" class="left-panel d-flex align-center justify-center">
        <v-responsive aspect-ratio="1" max-width="80%">
          <v-img :src="logo" contain />
        </v-responsive>
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-center right-panel">
        <v-card class="card-login" elevation="10">
          <v-card-title class="text-center">
            <h3>Iniciar sesión</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" @submit.prevent="login">
              <v-text-field
                v-model="datosLogin.username"
                label="Correo electrónico"
                required
                clearable
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="datosLogin.password"
                :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                @click:append="visible = !visible"
                label="Contraseña"
                required
                clearable
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-btn class="button-login" type="submit" block>Iniciar sesión</v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <p>¿Aún no tienes cuenta?</p>
            <v-btn text :to="{ name: 'formulario-empleado' }" color="primary">Regístrate</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import logo from '@/assets/LOGO-EDISONING.jpg';
import '@/assets/style/login.css';

const visible = ref(false);

defineProps({
  datosLogin: Object,
  login: Function,
});
</script>

<template>

    <LoginView :datosLogin="datosLogin" :login="login"/>

</template>

<script setup>
import LoginView from '@/views/Login/LoginView.vue';
import { datosLogin, login, setupLogin} from '@/scripts/Login/LoginScript';

setupLogin();

</script>


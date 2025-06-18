<template>

 <v-container fluid class="d-flex justify-center align-center" style="min-height: 100vh;">
    <v-card elevation="10" max-width="800" class="pa-8 rounded-xl" style="width: 90%;">
  <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px; margin-top: 20px;" :to="{ name: 'lista-de-obras' }"></v-btn>

  <h3 class="text-h5 text-center font-weight-medium mb-6">
        {{ id ? `Edita la obra : ${obra.nombre}` : 'Crea una nueva obra' }}
      </h3>

    <v-form ref="form" @submit.prevent="validaYEnvia">
        <v-container>
            <v-text-field v-model="obra.nombre"  label="Introduce el nombre/identificador de la obra"
            required clearable variant="outlined" class="mb-4"></v-text-field>

            <v-select v-model="obra.id_cliente" label="Selecciona un cliente" :items="clientes" item-title="nombre"
            item-value="id"  required clearable variant="outlined" class="mb-4"></v-select>

            <v-text-field v-model="obra.fecha_prevista_fin" type="date" label="Selecciona una fecha de finalicación prevista"
            required clearable variant="outlined" class="mb-4" />

            <v-row justify="center">
                <v-col cols="auto">
                    <v-btn class="mt-2" type="submit" color="primary">{{ id ? 'Guardar cambios' : 'Enviar' }}</v-btn>
                </v-col>
            </v-row>

        </v-container>
    </v-form>
</v-card>
</v-container>

</template>

<script setup>

defineProps({
    obra: Object,
    clientes: Array,
    validaYEnvia: Function,
    id: [String, Number],
})

</script>
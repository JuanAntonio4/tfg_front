import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput';


const vuetify = createVuetify({
    components:{
      ...components,
      VDateInput
    },
    directives,
    theme:{
        defaultTheme:'light'
    },
    icons: {
      defaultSet: 'mdi', 
    },

  })

const pinia = createPinia()
const app = createApp(App)

app.use(pinia);
app.use(router)
app.use(vuetify)


app.mount('#app')

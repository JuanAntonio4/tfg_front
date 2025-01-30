// import './assets/main.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
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
        defaultTheme:'dark'
    },
    icons: {
      defaultSet: 'mdi', 
    },

  })

const app = createApp(App)

app.use(router)
app.use(vuetify)


app.mount('#app')

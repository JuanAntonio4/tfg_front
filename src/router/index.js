import { createRouter, createWebHistory } from 'vue-router'

import ListaAvisosComponent from '@/components/Avisos/ListaAvisosComponent.vue'
import FormAvisosComponent from '@/components/Avisos/FormAvisosComponent.vue'
import ListaObrasComponent from '@/components/Obras/ListaObrasComponent.vue'
import FormObrasComponent from '@/components/Obras/FormObrasComponent.vue'
import ListaEmpleadosComponent from '@/components/Empleados/ListaEmpleadosComponent.vue'
import FormEmpleadosComponent from '@/components/Empleados/FormEmpleadosComponent.vue'
import ListaClientesComponent from '@/components/Clientes/ListaClientesComponent.vue'
import FormClienteComponent from '@/components/Clientes/FormClienteComponent.vue'
import LoginComponent from '@/components/Login/LoginComponent.vue'
import PresupuestosComponent from '@/components/Presupuestos/PresupuestosComponent.vue'
import InformesComponent from '@/components/Informes/InformesComponent.vue'
import FormTrabajoRealizadoComponent from '@/components/TrabajoRealizado/FormTrabajoRealizadoComponent.vue'
import VistaPrincipal from '@/views/VistaPrincipal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {path: '/',
      name: 'login', 
      component: LoginComponent},

    {path: '/menu-principal',
      name: 'menu-principal',
      component: VistaPrincipal},
      
    {path: '/lista-de-avisos',
      name: 'lista-de-avisos', 
      component: ListaAvisosComponent},

    {path: '/lista-de-obras',
      name: 'lista-de-obras', 
      component: ListaObrasComponent},

    {path: '/lista-de-empleados',
      name: 'lista-de-empleados', 
      component: ListaEmpleadosComponent},

    {path: '/lista-de-clientes',
      name: 'lista-de-clientes', 
      component: ListaClientesComponent},

    {path: '/formulario-aviso/:id?',
      name: 'formulario-aviso', 
      component: FormAvisosComponent},

    {path: '/formulario-obra/:id?',
      name: 'formulario-obra', 
      component: FormObrasComponent},

    {path: '/formulario-empleado/:id?',
      name: 'formulario-empleado', 
      component: FormEmpleadosComponent},

    {path: '/formulario-cliente/:id?',
      name: 'formulario-cliente', 
      component: FormClienteComponent},

    {path: '/introducir-trabajo/:id/:tipo',
      name: 'introducir-trabajo', 
      component: FormTrabajoRealizadoComponent},

    {path: '/presupuesto-aviso/:id',
      name: 'presupuesto-aviso', 
      component: PresupuestosComponent},

    {path: '/informes/:id/:tipo',
      name: 'informes', 
      component: InformesComponent},

  ],
})


export default router

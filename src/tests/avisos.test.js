import { describe, test, expect } from 'vitest'
import avisosAPI from '@/api/avisosAPI'
import empleadosAPI from '@/api/empleadosAPI'


describe(' - Tests de integración con la API para Avisos', () => {

/********************************************************************************************** */
test('Obtener todos los avisos', async () => {
  const datosLogin={
      username: 'pruebaasIntegracion-12345@gmail.com',
      password: 'holahola'
  }
  const loginResponse = await empleadosAPI.login(datosLogin);
  const token = loginResponse.token; 

  const avisos = await avisosAPI.getAvisos(token)

  expect(Array.isArray(avisos)).toBe(true)
  expect(avisos.length).toBeGreaterThan(0)
  expect(avisos[0]).toHaveProperty('id')
  expect(avisos[0]).toHaveProperty('nombre')
})

/********************************************************************************************** */

test('Obtener un aviso por su identificador (Id)', async () => {
  const datosLogin={
      username: 'pruebaasIntegracion-12345@gmail.com',
      password: 'holahola'
  }
  const loginResponse = await empleadosAPI.login(datosLogin);
  const token = loginResponse.token; 
  const avisoId = 4; 

  const aviso = await avisosAPI.getAvisoPorId(avisoId,token)

  expect(aviso).toBeDefined()
  expect(aviso.id).toBe(avisoId)
  expect(aviso).toHaveProperty('id')
  expect(aviso).toHaveProperty('nombre')
})

/********************************************************************************************** */

test('Obtener un aviso por el empleado asignado', async () => {
  const datosLogin={
      username: 'pruebaasIntegracion-12345@gmail.com',
      password: 'holahola'
  }
  const loginResponse = await empleadosAPI.login(datosLogin);
  const token = loginResponse.token; 
  const id_empleado = 1; 

  const avisos = await avisosAPI.getAvisosPorEmpleado(id_empleado,token)

  expect(Array.isArray(avisos)).toBe(true)
  expect(avisos.length).toBeGreaterThan(0)
  expect(avisos[0]).toHaveProperty('id')
  expect(avisos[0]).toHaveProperty('nombre')
  expect(avisos[0]).toHaveProperty('empleado')
})

/********************************************************************************************** */

test('Creación de un aviso', async () => {
  const datosLogin={
      username: 'pruebaasIntegracion-12345@gmail.com',
      password: 'holahola'
  }
  const loginResponse = await empleadosAPI.login(datosLogin);
  const token = loginResponse.token; 
  const avisoParaCrear = {
              nombre: 'Arreglo de cuadro eléctrico en el sótano',
              descripcion: 'El cuadro eléctrico del sótano no funciona correctamente y necesita ser revisado.',
              id_empleado: 1,
              id_cliente: 7, 
              fecha: '2025-06-09',
              prioridad: 'URGENTE',
              estado: 'EN_PROCESO'
          };

  const avisoCreado = await avisosAPI.crearAviso(avisoParaCrear,token)

  expect(avisoCreado[0]).toHaveProperty('id')
  expect(avisoCreado[0].cliente).toBe(avisoParaCrear.cliente)
  expect(avisoCreado[0].descripcion).toBe(avisoParaCrear.descripcion)

  await avisosAPI.eliminarAviso(avisoCreado[0].id,token)
  const avisoEliminado = await avisosAPI.getAvisoPorId(avisoCreado[0].id,token)

  expect(avisoEliminado).toBeUndefined()
})

/********************************************************************************************** */

test('Edición de un aviso', async () => {
  const datosLogin={
      username: 'pruebaasIntegracion-12345@gmail.com',
      password: 'holahola'
  }
  const loginResponse = await empleadosAPI.login(datosLogin);
  const token = loginResponse.token; 
  const avisoParaCrear = {
              nombre: 'Arreglo de cuadro eléctrico en el sótano',
              descripcion: 'El cuadro eléctrico del sótano no funciona correctamente y necesita ser revisado.',
              id_empleado: 1,
              id_cliente: 7, 
              fecha: '2025-06-09',
              prioridad: 'URGENTE',
              estado: 'EN_PROCESO'
          };

  const avisoCreado = await avisosAPI.crearAviso(avisoParaCrear,token)

  expect(avisoCreado[0]).toHaveProperty('id')
  expect(avisoCreado[0].cliente).toBe(avisoParaCrear.cliente)
  expect(avisoCreado[0].descripcion).toBe(avisoParaCrear.descripcion)

  const avisoParaEditar = {
      descripcion: 'Eso es una prueba de edición',

  };

  const avisoEditado  = await avisosAPI.editarAviso(avisoCreado[0].id,avisoParaEditar,token)

  expect(avisoEditado[0].descripcion).not.toBe(avisoParaCrear.descripcion)
  expect(avisoEditado[0].id).toBe(avisoCreado[0].id)

  await avisosAPI.eliminarAviso(avisoEditado[0].id,token)
  const avisoEliminado = await avisosAPI.getAvisoPorId(avisoEditado[0].id,token)

  expect(avisoEliminado).toBeUndefined()


})

/********************************************************************************************** */

test('Eliminación de un aviso', async () => {
  const datosLogin={
      username: 'pruebaasIntegracion-12345@gmail.com',
      password: 'holahola'
  }
  const loginResponse = await empleadosAPI.login(datosLogin);
  const token = loginResponse.token; 
  const avisoParaCrear = {
              nombre: 'Arreglo de cuadro eléctrico en el sótano',
              descripcion: 'El cuadro eléctrico del sótano no funciona correctamente y necesita ser revisado.',
              id_empleado: 1,
              id_cliente: 7, 
              fecha: '2025-06-09',
              prioridad: 'URGENTE',
              estado: 'EN_PROCESO'
          };

  const avisoCreado = await avisosAPI.crearAviso(avisoParaCrear,token)

  expect(avisoCreado[0]).toHaveProperty('id')
  expect(avisoCreado[0].cliente).toBe(avisoParaCrear.cliente)
  expect(avisoCreado[0].descripcion).toBe(avisoParaCrear.descripcion)

  await avisosAPI.eliminarAviso(avisoCreado[0].id,token)

  const avisoEliminado = await avisosAPI.getAvisoPorId(avisoCreado[0].id,token)

  expect(avisoEliminado).toBeUndefined()


})

/********************************************************************************************** */

test('Envío de correo de asignación de un aviso a un empleado', async () => {
  const datosLogin={
      username: 'pruebaasIntegracion-12345@gmail.com',
      password: 'holahola'
  }
  const loginResponse = await empleadosAPI.login(datosLogin);
  const token = loginResponse.token; 
  const avisoParaCrear = {
              nombre: 'Prueba Correo',
              descripcion: 'PruebaCorreo',
              id_empleado: 1,
              id_cliente: 7, 
              fecha: '2025-06-09',
              prioridad: 'URGENTE',
              estado: 'EN_PROCESO'
          };

  const avisoCreado = await avisosAPI.crearAviso(avisoParaCrear,token)

  expect(avisoCreado[0]).toHaveProperty('id')
  expect(avisoCreado[0].cliente).toBe(avisoParaCrear.cliente)
  expect(avisoCreado[0].descripcion).toBe(avisoParaCrear.descripcion)

  const empleadoAsignado = await empleadosAPI.getEmpleadoPorId(avisoCreado[0].id_empleado, token);

    const contenidoParaCorreo = {
                aviso: {
                  id: avisoCreado[0].id,
                  nombre: avisoCreado[0].nombre,
                  descripcion: avisoCreado[0].descripcion,
                  fecha: avisoCreado[0].fecha,
                  prioridad: avisoCreado[0].prioridad,
                  estado: avisoCreado[0].estado,
                  id_cliente: avisoCreado[0].id_cliente,
                  cliente: { nombre: 'Empresa de prueba', direccion: 'Direccion de prueba' }, 
                },
                empleado: {
                    id: empleadoAsignado.id,
                    nombre: empleadoAsignado.nombre,
                    correo: empleadoAsignado.correo
                }
          };



  const enviarcorreo = await avisosAPI.enviarCorreoAvisoCreado(contenidoParaCorreo);
  
  expect(enviarcorreo).toHaveProperty('id')


  await avisosAPI.eliminarAviso(avisoCreado[0].id,token)
  const avisoEliminado = await avisosAPI.getAvisoPorId(avisoCreado[0].id,token)
  expect(avisoEliminado).toBeUndefined()


})
  


})

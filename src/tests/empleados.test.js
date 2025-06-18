import { describe, test, expect } from 'vitest'
import empleadosAPI from '@/api/empleadosAPI'


describe(' - Tests de integración con la API para Empleados', () => {

/********************************************************************************************** */

test('Realizar Login', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);

    expect(loginResponse.token).toBeDefined()
    expect(loginResponse).toHaveProperty('token')
    expect(loginResponse.usuario).toHaveProperty('correo')

})

/********************************************************************************************** */

test('Realizar Registro', async () => {
     const empleadoParaRegistrar = {
             nombre: 'Prueba',
             usuario: 'prueba1',
             clave: 'contraseña2',
             correo: 'prueba@gmail.com',
             telefono: '123456789',
             rol: 'TRABAJADOR',
             
   
           };

    const { uuid_auth } = await empleadosAPI.registrarEmpleado(empleadoParaRegistrar);
    const datosLogin={

    username: 'prueba@gmail.com',
    password: 'contraseña2'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token;
    await empleadosAPI.eliminarEmpleado(uuid_auth, token)

})

/********************************************************************************************** */

test('Obtener todos los empleados', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 

    const empleados = await empleadosAPI.getEmpleados(token)

    expect(Array.isArray(empleados)).toBe(true)
    expect(empleados.length).toBeGreaterThan(0)
    expect(empleados[0]).toHaveProperty('id')
    expect(empleados[0]).toHaveProperty('nombre')
    expect(empleados[0]).toHaveProperty('correo')

})



/********************************************************************************************** */

test('Obtener un empleado por su identificador (Id)', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const empleadoId = 6;

    const empleado = await empleadosAPI.getEmpleadoPorId(empleadoId, token)

    expect(empleado).toBeDefined()
    expect(empleado.id).toBe(empleadoId)
    expect(empleado).toHaveProperty('id')
    expect(empleado).toHaveProperty('nombre')
    expect(empleado).toHaveProperty('correo')
})

/********************************************************************************************** */

test('Edición de un empleado', async () => {
        const empleadoParaRegistrar = {
             nombre: 'Prueba',
             usuario: 'prueba1',
             clave: 'contraseña2',
             correo: 'prueba@gmail.com',
             telefono: '123456789',
             rol: 'TRABAJADOR',
             
           };

    const { uuid_auth, empleado } = await empleadosAPI.registrarEmpleado(empleadoParaRegistrar);

    const datosLogin={
    username: 'prueba@gmail.com',
    password: 'contraseña2'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token;

    const empleadoEditar = {
             nombre: 'Prueba editadaaaa',
             
           };
    const empleadoEditado  = await empleadosAPI.editarEmpleado(empleado.id,empleadoEditar,token)

    expect(empleadoEditado).toBeDefined()
    expect(empleadoEditado[0].id).toBe(empleado.id)

    await empleadosAPI.eliminarEmpleado(uuid_auth, token)



})




})
import { describe, test, expect } from 'vitest'
import clientesAPI from '@/api/clientesAPI'
import empleadosAPI from '@/api/empleadosAPI'


describe(' - Tests de integración con la API para Clientes', () => {

/********************************************************************************************** */

test('Obtener todos los clientes', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 

    const clientes = await clientesAPI.getClientes(token)

    expect(Array.isArray(clientes)).toBe(true)
    expect(clientes.length).toBeGreaterThan(0)
    expect(clientes[0]).toHaveProperty('id')
    expect(clientes[0]).toHaveProperty('nombre')

})

/********************************************************************************************** */

test('Obtener un cliente por su identificador (Id)', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const clienteId = 11;

    const cliente = await clientesAPI.getClientePorId(clienteId, token)

    expect(cliente.id).toBe(clienteId)
    expect(cliente).toHaveProperty('nombre')
})

/********************************************************************************************** */

test('Creación de un cliente', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const clienteACrear = {
                nombre: 'Prueba',
                direccion: 'Direccion de prueba',
            };

    const clienteCreado = await clientesAPI.crearCliente(clienteACrear, token)

    expect(clienteCreado[0].nombre).toBe(clienteACrear.nombre)
    expect(clienteCreado[0]).toHaveProperty('nombre')

    await clientesAPI.eliminarCliente(clienteCreado[0].id, token)
})

/********************************************************************************************** */

test('Edición de un cliente', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const clienteACrear = {
                nombre: 'Prueba',
                direccion: 'Direccion de prueba',
            };

    const clienteCreado = await clientesAPI.crearCliente(clienteACrear, token)

    expect(clienteCreado[0].nombre).toBe(clienteACrear.nombre)
    expect(clienteCreado[0]).toHaveProperty('nombre')

        const clienteAEditar = {
                nombre: 'Prueba Editando'
            };

    const clienteEditado = await clientesAPI.editarCliente(clienteCreado[0].id, clienteAEditar, token)

    expect(clienteEditado[0].nombre).toBe(clienteAEditar.nombre)
    expect(clienteEditado[0]).toHaveProperty('nombre')

    await clientesAPI.eliminarCliente(clienteCreado[0].id, token)
})

/********************************************************************************************** */

test('Eliminación de un cliente', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const clienteACrear = {
                nombre: 'Prueba',
                direccion: 'Direccion de prueba',
            };

    const clienteCreado = await clientesAPI.crearCliente(clienteACrear, token)

    expect(clienteCreado[0].nombre).toBe(clienteACrear.nombre)
    expect(clienteCreado[0]).toHaveProperty('nombre')

    await clientesAPI.eliminarCliente(clienteCreado[0].id, token)

    const clienteEliminado = await clientesAPI.getClientePorId(clienteCreado[0].id, token)

    expect(clienteEliminado).toBeUndefined()
    
})


})
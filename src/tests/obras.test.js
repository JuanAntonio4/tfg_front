import { describe, test, expect } from 'vitest'
import obrasAPI from '@/api/obrasAPI'
import empleadosAPI from '@/api/empleadosAPI'


describe(' - Tests de integración con la API para Obras', () => {

/********************************************************************************************** */

  test('Obtener todos las obras', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 

    const obras = await obrasAPI.getObras(token)

    expect(Array.isArray(obras)).toBe(true)
    expect(obras.length).toBeGreaterThan(0)
    expect(obras[0]).toHaveProperty('id')
    expect(obras[0]).toHaveProperty('nombre')
  })

  /********************************************************************************************** */

  test('Obtener una obra por su identificador (Id)', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const obraId = 12;

    const obra = await obrasAPI.getObraPorId(obraId,token)

    expect(obra.id).toBe(obraId)
    expect(obra).toHaveProperty('nombre')
  })

/********************************************************************************************** */

  test('Creación de una obra', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const obraACrear = {
              nombre: 'BDD-21',
              id_cliente: 15,
              fecha_prevista_fin: '2025-06-13',
    
            };

    const obraCreada = await obrasAPI.crearObra(obraACrear,token)

    expect(obraCreada[0]).toHaveProperty('id')
    expect(obraCreada[0].nombre).toBe(obraACrear.nombre)

    await obrasAPI.eliminarObra(obraCreada[0].id,token)
  })
  
/********************************************************************************************** */
  test('Edición de una obra', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const obraACrear = {
              nombre: 'BDD-21',
              id_cliente: 15,
              fecha_prevista_fin: '2025-06-13',
    
            };

    const obraCreada = await obrasAPI.crearObra(obraACrear,token)

    expect(obraCreada[0]).toHaveProperty('id')
    expect(obraCreada[0].nombre).toBe(obraACrear.nombre)

      const obraAEditar = {
              nombre: 'BDFQ-88'
            };

     const obraEditada = await obrasAPI.editarObra(obraCreada[0].id,obraAEditar,token)

    expect(obraEditada[0]).toHaveProperty('nombre')
    expect(obraEditada[0].nombre).toBe(obraAEditar.nombre)

    await obrasAPI.eliminarObra(obraCreada[0].id,token)

  
  })

/********************************************************************************************** */

  test('Eliminación de una obra', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 
    const obraACrear = {
              nombre: 'BDD-21',
              id_cliente: 15,
              fecha_prevista_fin: '2025-06-13',
    
            };

    const obraCreada = await obrasAPI.crearObra(obraACrear,token)

    expect(obraCreada[0]).toHaveProperty('id')
    expect(obraCreada[0].nombre).toBe(obraACrear.nombre)

    await obrasAPI.eliminarObra(obraCreada[0].id,token)
    const obraEliminada = await obrasAPI.getObraPorId(obraCreada[0].id,token)
    expect(obraEliminada).toBeUndefined()

  
  })



})
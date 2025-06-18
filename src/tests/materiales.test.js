import { describe, test, expect } from 'vitest'
import materialesAPI from '@/api/materialesAPI'
import empleadosAPI from '@/api/empleadosAPI'


describe(' - Tests de integración con la API para Materiales', () => {

/********************************************************************************************** */
  test('Obtener todos los materiales', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token; 

    const materiales = await materialesAPI.getMateriales(token)

    expect(Array.isArray(materiales)).toBe(true)
    expect(materiales.length).toBeGreaterThan(0)
    expect(materiales[0]).toHaveProperty('id')
    expect(materiales[0]).toHaveProperty('nombre')
    expect(materiales[0]).toHaveProperty('precio')
  })

})
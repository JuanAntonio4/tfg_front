import { describe, test, expect } from 'vitest'
import trabajoRealizadoObraAPI from '@/api/trabajoRealizadoObraAPI'
import obrasAPI from '@/api/obrasAPI'
import empleadosAPI from '@/api/empleadosAPI'


describe(' - Tests de integración con la API para Trabajo Realizado en Avisos', () => {

/********************************************************************************************** */
test('Crear trabajajo realizado en una obra', async () => {
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

    const trabajoFormateado = {
        descripcion_trabajo_realizado: 'Prueba',
        observaciones: 'Prueba',
        horas_invertidas: 5,
        id_obra: obraCreada[0].id,
        id_empleado: loginResponse.usuario.is,
        estado: 'FINALIZADO',
        fecha_atencion:'2026-06-14',

        };

    const trabajoCreado = await trabajoRealizadoObraAPI.crearTrabajoRealizadoObra(trabajoFormateado,token)

    expect(trabajoCreado[0]).toHaveProperty('id')
    expect(trabajoCreado[0]).toHaveProperty('descripcion_trabajo_realizado')
    expect(trabajoCreado[0]).toHaveProperty('id_obra')

    await obrasAPI.eliminarObra(obraCreada[0].id,token)
})

/********************************************************************************************** */
test('Crear materiales usados para un trabajo de una obra', async () => {
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
     const trabajoFormateado = {
        descripcion_trabajo_realizado: 'Prueba',
        observaciones: 'Prueba',
        horas_invertidas: 5,
        id_obra: obraCreada[0].id,
        id_empleado: loginResponse.usuario.is,
        estado: 'FINALIZADO',
        fecha_atencion:'2026-06-14',

        };

    const trabajoCreado = await trabajoRealizadoObraAPI.crearTrabajoRealizadoObra(trabajoFormateado,token)

    expect(trabajoCreado[0]).toHaveProperty('id')
    expect(trabajoCreado[0]).toHaveProperty('descripcion_trabajo_realizado')
    expect(trabajoCreado[0]).toHaveProperty('id_obra')

      const materialUsado = {
            id_trabajo_realizado_obra: trabajoCreado[0].id,
            id_material: 1,
            cantidad: 24
        };

    const materialesUsadoCreados = await trabajoRealizadoObraAPI.crearMaterialesUsados(trabajoCreado[0].id, [materialUsado],token)

    expect(materialesUsadoCreados[0]).toHaveProperty('id')
    expect(materialesUsadoCreados[0]).toHaveProperty('id_material')
    expect(materialesUsadoCreados[0]).toHaveProperty('id_trabajo_realizado_obra')
    expect(materialesUsadoCreados[0]).toHaveProperty('cantidad')
   
    await trabajoRealizadoObraAPI.eliminarMaterialUsado(materialesUsadoCreados[0].id,token)
    await obrasAPI.eliminarObra(obraCreada[0].id,token)
 
    
})

/********************************************************************************************** */
test('Obtener trabajos realizados en obras', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token;
    const obraID = 3

    const trabajoObtenido = await trabajoRealizadoObraAPI.obtenerTrabajosPorObraInformes(obraID,token)
    expect(trabajoObtenido[0]).toHaveProperty('id')
    expect(trabajoObtenido[0]).toHaveProperty('descripcion_trabajo_realizado')
    expect(trabajoObtenido[0]).toHaveProperty('obra')
   
})






})
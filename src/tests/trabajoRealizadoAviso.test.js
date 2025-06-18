import { describe, test, expect,vi } from 'vitest'
import trabajoRealizadoAvisoAPI from '@/api/trabajoRealizadoAvisoAPI'
import avisosAPI from '@/api/avisosAPI'
import empleadosAPI from '@/api/empleadosAPI'



describe(' - Tests de integración con la API para Trabajo Realizado en Avisos', () => {

/********************************************************************************************** */
test('Crear trabajajo realizado en un aviso', async () => {
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
    const trabajoFormateado = {
            descripcion_trabajo_realizado: 'Prueba',
            observaciones: 'Prueba',
            estado: 'EN_PROCESO',
            id_aviso: avisoCreado[0].id,
            id_empleado: loginResponse.usuario.id,
            fecha_atencion: '2025-06-14',
        };

    const trabajoCreado = await trabajoRealizadoAvisoAPI.crearTrabajoRealizadoAviso(trabajoFormateado,token)

    expect(trabajoCreado[0]).toHaveProperty('id')
    expect(trabajoCreado[0]).toHaveProperty('descripcion_trabajo_realizado')
    expect(trabajoCreado[0]).toHaveProperty('id_aviso')

    await avisosAPI.eliminarAviso(avisoCreado[0].id,token)
})

/********************************************************************************************** */
test('Crear materiales usados para un trabajo de un aviso', async () => {
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
    const trabajoFormateado = {
            descripcion_trabajo_realizado: 'Prueba',
            observaciones: 'Prueba',
            estado: 'EN_PROCESO',
            id_aviso: avisoCreado[0].id,
            id_empleado: loginResponse.usuario.id,
            fecha_atencion: '2025-06-14',
        };

    const trabajoCreado = await trabajoRealizadoAvisoAPI.crearTrabajoRealizadoAviso(trabajoFormateado,token)

    expect(trabajoCreado[0]).toHaveProperty('id')
    expect(trabajoCreado[0]).toHaveProperty('descripcion_trabajo_realizado')
    expect(trabajoCreado[0]).toHaveProperty('id_aviso')

      const materialUsado = {
            id_trabajo_realizado_aviso: trabajoCreado[0].id,
            id_material: 1,
            cantidad: 24
        };

    const materialesUsadoCreados = await trabajoRealizadoAvisoAPI.crearMaterialesUsados(trabajoCreado[0].id, [materialUsado],token)

    expect(materialesUsadoCreados[0]).toHaveProperty('id')
    expect(materialesUsadoCreados[0]).toHaveProperty('id_material')
    expect(materialesUsadoCreados[0]).toHaveProperty('id_trabajo_realizado_aviso')
    expect(materialesUsadoCreados[0]).toHaveProperty('cantidad')
   
    await trabajoRealizadoAvisoAPI.eliminarMaterialUsado(materialesUsadoCreados[0].id,token)
    await avisosAPI.eliminarAviso(avisoCreado[0].id,token)
 
    
})

/********************************************************************************************** */
test('Obtener trabajos realizados en avisos', async () => {
    const datosLogin={
        username: 'pruebaasIntegracion-12345@gmail.com',
        password: 'holahola'
    }
    const loginResponse = await empleadosAPI.login(datosLogin);
    const token = loginResponse.token;
    const avisoID = 2

    const trabajoObtenido = await trabajoRealizadoAvisoAPI.obtenerTrabajosPorAvisoPresupuestos(avisoID,token)

    expect(trabajoObtenido[0]).toHaveProperty('id')
    expect(trabajoObtenido[0]).toHaveProperty('descripcion_trabajo_realizado')
    expect(trabajoObtenido[0]).toHaveProperty('aviso')
   
})


})
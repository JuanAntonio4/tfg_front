export default {

    validate: function (trabajo_realizado_aviso, materialesUsados) {
        let errores = [];

        let descripcionTrabajoRealizado = trabajo_realizado_aviso.descripcion_trabajo_realizado;
        let observaciones = trabajo_realizado_aviso.observaciones;
        let fecha = trabajo_realizado_aviso.fecha_atencion;
        let estado = trabajo_realizado_aviso.estado;

 
        if (descripcionTrabajoRealizado === ""  || estado === "" || fecha === "") {

            errores.push("Todos los campos son obligatorios menos el campo observaciones");
            return errores

        }else if(materialesUsados.length === 0){
            errores.push("La lista de materiales usados no puede ser vacía");
            return errores
        }

        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9, ]+$/.test(descripcionTrabajoRealizado))) {

            errores.push("El campo 'descripción del trabajo' no puede contener caracteres especiales a exepción de la ','")

        } 

        let fechaActual = new Date();
        let fechaFormulario = new Date(fecha)

        fechaActual.setHours(0, 0, 0, 0);
        fechaFormulario.setHours(0, 0, 0, 0);

        if (fechaFormulario < fechaActual) {
            errores.push("La fecha no puede ser anterior al día de hoy")
        }

        return errores;
    },





};
export default {

    validate: function (aviso) {
        let errores = [];

        let nombre = aviso.nombre;
        let descripcion = aviso.descripcion;
        let empleado = aviso.id_empleado;
        let cliente = aviso.id_cliente;
        let fecha = aviso.fecha;
        let prioridad = aviso.prioridad;
        let estado = aviso.estado;

        if (nombre === "" || descripcion === "" || !empleado || !cliente ||
            (fecha === "" || !fecha) || prioridad === "" || estado === "") {

            errores.push("Todos los campos son obligatorios");
            return errores
        }

        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9, ]+$/.test(nombre))) {

            errores.push("El campo 'nombre del aviso' no puede contener caracteres especiales a expeción de ','")

        } 


        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,. ]+$/.test(descripcion))) {

            errores.push("El campo 'descripción para el aviso' no puede contener caracteres especiales")

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
export default {

    validate: function (obra) {
        let errores = [];

        let nombre = obra.nombre;
        let cliente = obra.id_cliente;
        let fechaPrevistaFin = obra.fecha_prevista_fin;

        if (nombre === ""   || !cliente || fechaPrevistaFin === "" ) {

            errores.push("Todos los campos son obligatorios");
            return errores
        }

        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 -]+$/.test(nombre))) {

            errores.push("El campo 'nombre/identificador de la obra' no puede contener caracteres especiales que no sean '-'")

        } 

        let fechaActual = new Date();
        let fechaFormulario = new Date(fechaPrevistaFin)

        fechaActual.setHours(0, 0, 0, 0);
        fechaFormulario.setHours(0, 0, 0, 0);

        if (fechaFormulario < fechaActual) {
            errores.push("La fecha no puede ser anterior al día de hoy")
        }

        return errores;
    },





};
export default {

    validate: function (cliente) {
        let errores = [];

        let nombre = cliente.nombre;
        let direccion = cliente.direccion;
  
        if (nombre === ""   || direccion === "" ) {
            errores.push("Todos los campos son obligatorios");
            return errores
        }

        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre))) {

            errores.push("El campo 'nombre del cliente' no puede contener caracteres especiales o números.")

        }

        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9, ]+$/.test(direccion))) {

            errores.push("El campo 'direccion' no puede contener caracteres especiales que no sean ','")
        }

 
        return errores;
    },


};


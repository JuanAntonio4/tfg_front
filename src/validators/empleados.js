export default {

    validate: function (empleado) {
        let errores = [];

        let nombre = empleado.nombre;
        let usuario = empleado.usuario;
        let clave = empleado.clave;
        let correo = empleado.correo;
        let telefono = empleado.telefono;
        let rol = empleado.rol;


        if (nombre === ""   || usuario === "" || clave === "" || correo === "" || telefono === "" || rol === "") {

            errores.push("Todos los campos son obligatorios");
            return errores
        }

        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre))) {

            errores.push("El campo 'nombre completo del empleado' no puede contener caracteres especiales o números.")

        }


        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/.test(usuario))) {

            errores.push("El campo 'nombre de usuario' no puede contener caracteres especiales o espacios.")
        }

        if (clave !=null && clave.length < 5) {

            errores.push("El campo 'contraseña' debe contener 5 caracteres como mínimo")
        }


        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._+-]+@[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.-]+\.[a-zA-Z]{2,4}$/.test(correo))) {

            errores.push("El correo electrónico no cumple con el formato correcto")
        }

        if (!(/^[0-9]{9}$/.test(telefono))) {

            errores.push("El teléfono no permite caracteres y debe tener 9 números")
        }



        return errores;
    },


};


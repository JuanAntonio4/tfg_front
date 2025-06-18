import { BASE_URL, requestOptions, getToken} from "../../common";
import { supabase } from "@/supabase"; 
import axios from "axios";
import { supabaseAdmin } from '@/supabaseAdmin';

export default {

    getEmpleados: async function (token) {
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.get(`${BASE_URL}/empleado`, requestOptions);
        return response.data

    },

    getEmpleadoPorId: async function(id, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.get(`${BASE_URL}/empleado?id=eq.${id}` , requestOptions);
        return response.data[0]
    },

    editarEmpleado: async function(id, empleado, token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.patch(`${BASE_URL}/empleado?id=eq.${id}`, empleado , requestOptions);
        return response.data
    },

    eliminarEmpleado: async function(uuid_auth,token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        await axios.delete(`${BASE_URL}/empleado?uuid_auth=eq.${uuid_auth}` , requestOptions);
        await supabaseAdmin.auth.admin.deleteUser(uuid_auth);
    },

    login: async function (datosLogin) {
        try {
            const { data: authData } = await supabase.auth.signInWithPassword({
                email: datosLogin.username,
                password: datosLogin.password,
            });

             const requestOptions1 = {
            headers: getToken(authData) 
            };

            let empleadoLogueado = await axios.get(`${BASE_URL}/empleado?uuid_auth=eq.${authData.user.id}`, requestOptions1);
            const empleadoEncontrado = empleadoLogueado.data[0]

            return {
                token: authData.session.access_token,
                usuario: {
                    id: empleadoEncontrado.id,
                    nombre: empleadoEncontrado.nombre,
                    rol: empleadoEncontrado.rol,
                    correo: authData.user.email
                }
            };

        } catch (error) {
            if (error.message && (error.message.includes('Invalid login credentials') || error.message.includes('AuthApiError'))) {
                throw new Error("Credenciales inválidas");
            }
            throw error;
        }
    },

    registrarEmpleado: async function (empleado) {
    const { data: authData } = await supabase.auth.signUp({
        email: empleado.correo, 
        password: empleado.clave,
    });

    const token = authData.session?.access_token;

     requestOptions.headers.Authorization = `Bearer ${token}`;
    const empleadoParaAsignar= {
            nombre: empleado.nombre,
            usuario: empleado.usuario, 
            correo: empleado.correo,
            telefono: empleado.telefono,
            rol: empleado.rol,
            uuid_auth: authData.user.id 
    }

    const { data: empleadoCreado }= await axios.post(`${BASE_URL}/empleado`, empleadoParaAsignar , requestOptions);
      return {
        uuid_auth: authData.user.id,
        empleado: empleadoCreado[0], 
    };
}


};
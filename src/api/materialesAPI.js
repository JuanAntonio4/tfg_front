import { BASE_URL, requestOptions } from "../../common";
import axios from "axios";


export default{

    getMateriales: async function(token){
        requestOptions.headers.Authorization = `Bearer ${token}`;
        let response = await axios.get(`${BASE_URL}/material`, requestOptions);
        return response.data
    },


};
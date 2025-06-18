export const BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`;
export const BASE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

export const requestOptions = {
    headers:{
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
    }

};


export function getToken (authdata){
    return{
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${authdata.session.access_token}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
    }

};







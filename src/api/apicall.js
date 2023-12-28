import { URL, GET_METHOD, POST_METHOD, PUT_METHOD, DELETE_METHOD} from "../utils/constants/constants";

//Apicall estandar con los llamados a la api, contiene los metodos GET, POST, PUT y DELETE y posibilidades
//Por si se envia un archivo

export default async function apiCall(endpoint, method, data) {
    if (method === GET_METHOD) {
        try {
            const response = await fetch(URL + endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: data ? JSON.stringify(data) : null,
            });

            console.log(response)
    
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
    
            const json = await response.json();
            return json;
        } catch (error) {
            console.error("API call error:", error);
            throw error;
        }
    }
    else if (method === POST_METHOD) {
            const response = await fetch(URL + endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            return json;
    }    
    else if (method === PUT_METHOD) {
        const response = await fetch(URL + endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    }
    else if (method === DELETE_METHOD) {
        const response = await fetch(URL + endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    }
    else {
        console.log("Method not allowed");
    }

}
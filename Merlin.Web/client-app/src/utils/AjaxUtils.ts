// import { fetch } from 'domain-task';


/* new get method */
export async function get(url: string): Promise<any> {
    return await sendRequest('GET', url);
}

/* old get method */
// export async function get(url: string): Promise<any> {
//     await refreshAccessToken();

//     return await fetch(url, {method: 'GET', headers: getHeaders()});
// }

export async function post(url: string, data: any): Promise<any> {
    return await sendRequest('POST', url, data);
}

export async function put(url: string, data: any): Promise<any> {
    return await sendRequest('PUT', url, data);
}

export async function remove(url: string, data: any = undefined): Promise<any> {
    return await sendRequest('DELETE', url, data);
}


export async function uploadFile(url: string, formData: any): Promise<any> {
    try {

        const headers = getHeaders();
        // headers['content-type'] = 'multipart/form-data';
        delete headers['content-type'];

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': getBearerToken()
            },
            credentials: 'include'
        });

        // TODO:  Need to handle 401 when bearer token is not valid from the server-side

        throwIfError(response);

        return Promise.resolve(await getJson(response));
    } catch (errors) {
        return Promise.reject(await getJson(errors));
    }
}

export function throwIfError(response: any): any {
    switch (response.status) {
        case 400:
        case 401:
        case 403:
        case 404:
        case 415:
        case 500:
            throw response;
        default:
            return response;
    }
}

async function sendRequest(method: string, url: string, data?: any): Promise<any> {
    try {

        let response = undefined;

        if (method === 'GET') {
            response = await fetch(url, {
                method: 'GET',
                headers: getHeaders()
            });
        } else {
            response = await fetch(url, {
                body: JSON.stringify(data),
                cache: 'no-cache',
                method: method,
                headers: getHeaders()

            });
        }

        // TODO:  Need to handle 401 when bearer token is not valid from the server-side

        throwIfError(response);

        return Promise.resolve(await getJson(response));
    } catch (errors) {
        return Promise.reject(await getJson(errors));
    }
}

export async function getJson(response: any) {
    try {
        return await response.json();
    } catch (err) {
        return '';
    }
}

function getBearerToken() {
    if (window && window.sessionStorage) {
        return `Bearer ${sessionStorage.getItem('token')}`;
    }
    return '';
}

export function getHeaders() {
    return {
        'content-type': 'application/json',
        'Authorization': getBearerToken()
    };
}

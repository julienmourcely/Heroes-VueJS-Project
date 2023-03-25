import axios from 'axios'
const myaxios = axios.create({
    baseURL: 'https://apidemo.iut-bm.univ-fcomte.fr/herocorp',
    withCredentials: true,
});

export const get = (url, params) => {
    return myaxios.get(url, { params })
}

export const post = (url, data, params) => {
    return myaxios.post(url, data, {params})
}

export const put = (url, data, params) => {
    return myaxios.put(url, data, {params})
}

export const patch = (url, data, params) => {
    return myaxios.patch(url, data, {params})
}

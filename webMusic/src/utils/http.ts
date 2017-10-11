import axios, { AxiosRequestConfig } from "axios"
const address = "/api/"
export const post = (url: string, data?: any, config?: AxiosRequestConfig) => {
    return new Promise<any>((resolve, reject) => {
        axios.post(`${address}${url}`, data, config).then(x => {
            if (x.status == 200) {
                resolve(x.data.data)
            } else {
                reject(x.data);
            }
        }).catch(e => {
            reject(e);
        })
    })
}
export const get = (url: string, config?: AxiosRequestConfig) => {
    return new Promise<any>((resolve, reject) => {
        axios.get(`${address}${url}`, config).then(x => {
            if (x.status == 200) {
                resolve(x.data.data)
            } else {
                reject(x.data);
            }
        }).catch(e => {
            reject(e);
        })
    })
}
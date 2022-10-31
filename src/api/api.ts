import { IRowScheme, UpdateRowScheme } from './../shared/models/Row.interface';
import axios from "axios";


const BASE_URL = 'http://185.244.172.108:8081/'

const outlayStringController = axios.create({
    baseURL: BASE_URL,
    timeout: 30000
})

const OUTLAY_API = {

    async getTreeRows (eID : string) {
        const response = (await outlayStringController.get(`v1/outlay-rows/entity/${eID}/row/list`)).data
        
        return response
    },

    async createRowInEntity (eID : string, rowInEntity: IRowScheme) {
        const response = (await outlayStringController.post(`v1/outlay-rows/entity/${eID}/row/create`, rowInEntity)).data

        return response
    },

    async updateRow (eID : string, rID : number, updateRequest : UpdateRowScheme) {
        const response = (await outlayStringController.post(`v1/outlay-rows/entity/${eID}/row/${rID}/update`, updateRequest)).data

        return response
    },

    async deleteRow (eID : string, rID : number) {
        const response = (await outlayStringController.delete(`v1/outlay-rows/entity/${eID}/row/${rID}/delete`)).data

        return response
    }
}


export default OUTLAY_API
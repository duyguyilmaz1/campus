
import axios from "axios"
import { config } from "../helpers/config"
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl;

export const getManagersByPage = async (page=0, size=20, sort="name", type="asc") => { 
    const resp = await axios.get(`${API_URL}/dean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
        headers: getAuthHeader()
    });
    const data = resp.data;
    return data;
}

export const createManager = async (payload) => { //admin create etmek icin olusturudk (new-admin-form). payload formikten gelen datalarıdır
    const resp = await axios.post(`${API_URL}/dean/save`, payload, {
        headers: getAuthHeader() //burası auth user a ait oldğunu belirtir bu alanın
    });
    const data = resp.data;
    return data;
}

export const deleteManager = async (id) => { 
    const resp = await axios.delete(`${API_URL}/dean/delete/${id}`, {
        headers: getAuthHeader()
    });
    const data = resp.data;
    return data;
}

export const updateManager = async (payload) => {  //normalde id yi ayri yazmistik ama payload icinde oldugu icin asagida payload icindeki id yi aldik 
    const resp = await axios.put(`${API_URL}/dean/update/${payload.userId}`, payload, { // update metodu için id verdik 
        headers: getAuthHeader() //burası auth user a ait oldğunu belirtir bu alanın
    });
    const data = resp.data;
    return data;
}

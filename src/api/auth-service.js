import axios from "axios"
import { config } from "../helpers/config"

const API_URL = config.api.baseUrl;

export const login = async (payload) => {//hangi kullanicnin login olg bilgilerini doner
    const resp = await axios.post(`${API_URL}/auth/login`, payload);
    const data = resp.data;
    return data;
}
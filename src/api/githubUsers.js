import axios from "axios";

export const api = axios.create({
    baseURL:"https://api.github.com"
})

export const getUsers = async ()=>{
    const res = await api.get("/users")
    return res.data
}

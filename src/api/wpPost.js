import axios from "axios";

const wpapi = axios.create({
    baseURL:"http://localhost/blog/wp-json/wp/v2"
})
export const getWpposts = async ()=>{ 
    const res = await wpapi.get("/posts?_embed")
    return res.data
}
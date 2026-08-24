import axios from "axios";

export const userApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const getUsersData = async ()=>{
    const res = await userApi.get("/posts");
    return res.data
}

export const deleteUserData= async (id)=>{
    const res = await userApi.delete(`/posts/${id}`)
    return res.data
}
export const updateUserData = async ({ id, formData }) => {
  const res = await userApi.patch(`/posts/${id}`, formData);
  return res.data;
};

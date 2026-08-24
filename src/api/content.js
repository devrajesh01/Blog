import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async (pageNumber) => {
  const response = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
  return response.data;
};
export const getPost = async (id)=>{
  const res = await api.get(`/posts/${id}`)
  return res.data

}

// delete post
export const deletePost = async (id)=>{
  const res = await api.delete(`/posts/${id}`)
  return res;
}
// update post
export const updatePost = async(id)=>{
  const res = await api.patch(`/posts/${id}`, {title: "i have updated"})
  return res 
}

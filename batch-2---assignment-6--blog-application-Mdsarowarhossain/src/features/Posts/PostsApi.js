import axiosInstance from "../../utlis/aciosInstance"

 const getPosts = async ()=>{
    let resposne = await axiosInstance.get(`/blogs`)
    return resposne.data;
}
export default getPosts;
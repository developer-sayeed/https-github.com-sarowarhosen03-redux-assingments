import axiosInstance from "../../utlis/aciosInstance"

 const getPost = async (id)=>{
    let resposne = await axiosInstance.get(`/blogs/${id}`);
    return resposne.data;
}
export default getPost;
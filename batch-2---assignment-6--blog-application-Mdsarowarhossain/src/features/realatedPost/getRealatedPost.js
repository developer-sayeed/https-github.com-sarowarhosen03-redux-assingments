import axiosInstance from "../../utlis/aciosInstance"

 const getRealatedPosts = async ({tags,id})=>{

    const limit = 5;
    let queryString =
        tags?.length > 0
            ? tags.map((tag) => `tags_like=${tag}`).join("&") +
              `&id_ne=${id}&_limit=${limit}`
            : `id_ne=${id}&_limit=${limit}`;
    let resposne = await axiosInstance.get(`/blogs?${queryString}`)
    return resposne.data;
}
export default getRealatedPosts;
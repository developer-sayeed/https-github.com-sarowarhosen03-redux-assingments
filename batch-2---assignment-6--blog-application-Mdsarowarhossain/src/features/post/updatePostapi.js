import axiosInstance from "../../utlis/aciosInstance";

export const updatePostApi = async (id, payload) => {
 
  let response = await axiosInstance.patch(`/blogs/${id}`, {
    ...payload,
  });

  return response.data;
};

import axios from '../../utils/axiosInstance'

//create job 
export const addJob = async (data)=>{
    let response = await axios.post('/jobs',{
        ...data
    });
    return response.data;
    }

    //fetch job
export const fetchJobs = async () => {
  const response = await axios.get("/jobs");

  return response.data;
};

//update job
export const updateJob = async ({ id, data }) => {
  const response = await axios.put(`/jobs/${id}`, {
    ...data,
  });
  return response.data;
};


//delete job
export const deleteJob = async id => {
  const response = await axios.delete(`/jobs/${id}`);
  return response.data;
};


//get target editing  job
export const getTargetJob = async (id) => {
  const response = await axios.get(`/jobs/${id}`);
  return response.data;
};


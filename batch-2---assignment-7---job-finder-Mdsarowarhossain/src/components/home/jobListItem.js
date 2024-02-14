import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteJobAsync } from "../../features/Jobs/jobSlice";

export default function JobListItem({job}) {
  const usedisptech = useDispatch();
  const {title,type,salary,deadline,id} = job;
  const navigat = useNavigate();
//deside3 job type style 
let jobTypeClass= '';
switch (type) {
    case 'Full Time':
        jobTypeClass='#FF8A00';
        break;
        case 'Internship':
        jobTypeClass='#FF5757';
        break;
        case 'Remote':
        jobTypeClass='#56E5C4'
        break;

    default:
        break;
}

 //handel Delete
  const handelDelete = (id)=>{
    usedisptech(deleteJobAsync(id));
  }

//handel Edit

const handelEdit = (id)=>{
  
    navigat(`/editJob/${id}`)
  }

  

  return (
    <div className="lws-single-job">
      <div className="flex-1 min-w-0">
        <h2 className="lws-title">{title}</h2>
        <div className="job-footers">
          <div className="lws-type">
            {/* <!-- Fulltime - #FF8A00,  --><!-- Internship - #FF5757,  --><!-- Remote - #56E5C4,  --> */}
            <i className={`fa-solid fa-stop !text-[${jobTypeClass}] text-lg mr-1.5`}></i>
           {type}
          </div>
          <div className="lws-salary">
            <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5"></i>
            BDT {salary}
          </div>
          <div className="lws-deadline">
            <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5"></i>
            Closing on {deadline}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <button onClick={(e)=>handelEdit(id)} type="button" className="lws-edit btn btn-primary">
            <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2"></i>
            Edit
          </button>
        </span>

        <span className="sm:ml-3">
          <button onClick={(e)=>handelDelete(id)} type="button" className="lws-delete btn btn-danger ">
            <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2"></i>
            Delete
          </button>
        </span>
      </div>
    </div>
  );
}

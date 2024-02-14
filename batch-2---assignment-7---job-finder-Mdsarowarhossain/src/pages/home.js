import React, { useEffect } from "react";
import HomeSearchBar from "../components/home/HomeSearchBar";
import JobListItem from "../components/home/jobListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobAsync } from "../features/Jobs/jobSlice";
export default function Home() {
  const usedispetch = useDispatch();
  const { isLoading, isError, jobs, sortText, searhText, type } = useSelector(
    (state) => state.jobs
  );
  useEffect(() => {
    usedispetch(fetchJobAsync());
  }, [usedispetch]);
  //handelsort

  const handelSort = (jobList) => {
    let sortArrray = jobList;
    if (sortText === "Salary (High to Low)") {
      sortArrray = sortArrray.sort((a, b) => b.salary - a.salary);
    }
    if (sortText === "Salary (Low to High)") {
      sortArrray = sortArrray.sort((a, b) => a.salary - b.salary);
    }
    if (searhText !== "") {
      let qu = searhText.toLowerCase();
      sortArrray = sortArrray.filter((jobItem) =>
        jobItem.title.toLowerCase().startsWith(qu)
      );
    }
    if (type !== "") {
      sortArrray = sortArrray.filter(
        (jobItem) => type === jobItem.type.replace(/\s+/g, "").toLowerCase()
      );
    }
    return sortArrray;
  };
  //deside what to render

  let content = "";

  if (!isLoading && isError) {
    content = (
      <p
        style={{
          color: "red",
        }}
      >
        Error Ocaurd while fetching Job Deatels
      </p>
    );
  }
  if (!isLoading && !isError && jobs.length === 0) {
    content = <p style={{ color: "white" }}>No Job Available </p>;
  }

  if (!isLoading && !isError && jobs.length !== 0) {
    const jobList = handelSort([...jobs]);
    content = jobList.map((job) => <JobListItem key={job?.id} job={job} />);
  }

  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
    <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
      <HomeSearchBar />

      <div className="jobs-list">{content}</div>
    </main>
  </div>
  );
}

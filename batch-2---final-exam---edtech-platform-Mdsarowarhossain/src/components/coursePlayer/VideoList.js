import React from "react";
import { Link } from "react-router-dom";
import Error from "../ui/Error";
import { SmallLoader } from "../ui/SmallLoader";
export default function VideoList({
  status: isLoading,
  error,
  videos,
  selectedVideoId,
}) {
  //  decide what to render
  let content;
  if (isLoading) {
    content = <SmallLoader />;
  }
  if (!isLoading && error) {
    content = <Error message="Error ocaurd while fetching Videos" />;
  }
  if (!isLoading && !error && videos.length === 0) {
    content = <p className="lg:text-2xl font-bold ">No Video Found</p>;
  }
  if (!isLoading && !error && videos.length > 0) {
    if (selectedVideoId === undefined) selectedVideoId = videos[0].id;

    content = videos.map((video) => {
      if (video.id === selectedVideoId) {
        //its The Current Playing Video
        return (
          <div
            key={video.id}
            className="w-full flex flex-row gap-2 cursor-pointer   p-2 py-3 bg-slate-700 "
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
            <Link to={`/course/${video.id}`}>
              <div clas="flex flex-col w-full">
                <p className="text-slate-50 text-sm font-medium">
                  {video.title}
                </p>

                <div>
                  <span className="text-gray-400 text-xs mt-1">
                    {video.duration + " mins"}
                  </span>
                  <span className="text-gray-400 text-xs mt-1"> | </span>
                  <span className="text-gray-400 text-xs mt-1">
                    {video.views + " views"}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        );
      }
      return (
        <div
          key={video.id}
          className="w-full flex flex-row gap-2 cursor-pointer  hover:bg-slate-600  p-2"
        >
          {/* <!-- Thumbnail --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
          {/* <!-- Description --> */}
          <Link to={`/course/${video.id}`}>
            <div clas="flex flex-col w-full">
              <p className="text-slate-50 text-sm font-medium">{video.title}</p>

              <div>
                <span className="text-gray-400 text-xs mt-1">
                  {video.duration + " mins"}
                </span>
                <span className="text-gray-400 text-xs mt-1"> | </span>
                <span className="text-gray-400 text-xs mt-1">
                  {video.views + " views"}
                </span>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}

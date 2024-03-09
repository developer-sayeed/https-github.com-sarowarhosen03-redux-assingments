import React, { useState } from "react";
import { useDispatch } from "react-redux";

import ContentLoader from "../../components/ui/ContentLoader";
import Error from "../../components/ui/Error";
import VideoItem from "../../components/VideoItem";
import Modal from "../../components/ui/Modal";
import { adminApi } from "../../features/admin/adminApi";
import { useGetVideosQuery } from "../../features/student/studentApi";
import VideoForm from "../../components/form/VideoForm";

const AdminVideos = () => {
  document.title = `${process.env.SITE_TITLE} | Admin Manage Videos`;

  const dispetch = useDispatch();
  const [opend, setOpend] = useState(false);
  const [videoData, setVideoData] = useState({});
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  const handelDelete = (id) => {
    dispetch(adminApi.endpoints.deleteVideo.initiate(id));
  };
  const controlMoadal = () => {
    setOpend((prev) => !prev);
  };

  //Delete What To Render
  let VideosContent = null,
    loadingState = null;

  if (isLoading) {
    loadingState = <ContentLoader />;
  } else if (!isLoading && isError) {
    loadingState = <Error message="Error Ocard While Fetching Videos" />;
  } else if (!isLoading && !isError && videos.length === 0) {
    loadingState = <Error message="No Video Found" />;
  }
  if (!isLoading && !isError && videos.length > 0) {
    loadingState = null;
    VideosContent = videos.map((video) => (
      <VideoItem
        setVideoData={setVideoData}
        onDelete={handelDelete}
        key={video.id}
        video={video}
        controlMoadal={controlMoadal}
      />
    ));
  }

  return (
    <section className="py-6 bg-primary">
      {loadingState}
      <Modal open={opend} fullHeight={true} control={controlMoadal} height={90}>
        <VideoForm videoData={videoData} control={controlMoadal} />
      </Modal>
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button
              onClick={() => {
                setVideoData({});
                controlMoadal();
              }}
              className="btn ml-auto"
            >
              Add Video
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Description</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">
                {VideosContent}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminVideos;

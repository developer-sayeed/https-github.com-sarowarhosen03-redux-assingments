import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SingelVideo from "../../components/coursePlayer/SingelVideo";
import VideoList from "../../components/coursePlayer/VideoList";
import { useGetVideosQuery } from "../../features/student/studentApi";

const CoursePlayer = () => {
  const { data: videos, isLoading, isError, isSuccess } = useGetVideosQuery();
  const { id } = useParams();
  
  // find the current video and render it
  const [currentVideo, setCurrentVideo] = useState({});
  useEffect(() => {
    if (isSuccess && videos.length > 0) {
      const video = videos.find((video) => video.id == id) || videos[0];
      setCurrentVideo(video);
    }
  }, [isSuccess, videos, id]);
  

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <SingelVideo video={currentVideo} />
          <VideoList
            error={isError}
            selectedVideoId={currentVideo?.id}
            videos={videos}
            status={isLoading}
          />
        </div>
      </div>
    </section>
  );
};
export default CoursePlayer;

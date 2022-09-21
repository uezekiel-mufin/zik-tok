import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../type";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";

type VideosProps = {
  videos: Video[];
};

const Home = ({ videos }: VideosProps) => {
  console.log(videos);
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text='No videos' />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: { videos: data },
  };
};

export default Home;

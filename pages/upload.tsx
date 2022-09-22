import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { Circles } from "react-loader-spinner";
import { topics } from "../utils/constants";

const UploadScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile }: any = useAuthStore();
  const router = useRouter();

  const handleUpload = (e: any) => {
    setIsLoading(true);
    setWrongFileType(false);
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (!fileTypes.includes(selectedFile.type)) {
      setWrongFileType(true);
      setIsLoading(false);
      console.log("file type not supported");
      return;
    }

    client.assets
      .upload("file", selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((data) => {
        setVideoAsset(data);
        setIsLoading(false);
      });

    console.log("upoloaded successfully");
  };

  const handleFileUpload = async () => {
    if (category && caption && videoAsset) {
      console.log(category, caption, videoAsset);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post("http://localhost:3000/api/post", document);

      router.push("/");
    }
  };
  return (
    <div className='flex w-full  justify-center py-12 items-center'>
      <div className='flex bg-white rounded-lg'>
        <div className=''>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400'>
              Post a video to your account
            </p>
          </div>
          <div className=' mb-8 mt-10 gap-8 md:flex'>
            <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none w-[260px] h-[400px] md:h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
              {isLoading ? (
                <div className='w-full h-screen flex justify-center items-center  bg-[#f3f0ee] '>
                  <Circles
                    height='80'
                    width='80'
                    color='#F51977'
                    ariaLabel='circles-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                    visible={true}
                  />
                </div>
              ) : (
                <div>
                  {videoAsset ? (
                    <video
                      src={videoAsset.url}
                      controls
                      loop
                      className='rounded-xl bg-black'
                    >
                      file upoloaded
                    </video>
                  ) : (
                    <label className='cursor-pointer'>
                      <div className='flex flex-col items-center justify-center h-full'>
                        <div className='flex flex-col items-center justify-center'>
                          <p className='font-bold text-xl'>
                            <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                          </p>
                          <p className='text-xl font-semibold'>upload video</p>
                        </div>
                        <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                          MP4 or WebM or ogg <br />
                          720x1280 or higher <br />
                          up to 10 minutes <br />
                          Less than 2GB
                        </p>
                        <p className='bg-[#F51997] mb-8 md:mb-o text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                          Select file
                        </p>
                      </div>
                      <input
                        type='file'
                        className="w-0 h-0 type='file id='upload-video "
                        onChange={handleUpload}
                      />
                    </label>
                  )}
                </div>
              )}
            </div>
            <div className='mt-8'>
              <div className='flex flex-col gap-1 mb-2 capitalize font-semibold '>
                <label htmlFor=''>caption</label>
                <input
                  type='text'
                  className='border p-1 rounded-sm font-light'
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1 mb-2 capitalize font-semibold '>
                <label htmlFor=''>choose a topic</label>
                <select
                  name=''
                  value={category}
                  id=''
                  className='border p-2 font-light text-sm capitalize  '
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {topics.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className='grid grid-cols-2 gap-8 mt-8 justify-between'>
                <button className='border p-1 rounded-md text-sm transition-all duration-300 ease-linear hover:scale-110 px-4'>
                  Discard
                </button>
                <button
                  onClick={handleFileUpload}
                  className='border p-1 rounded-md text-sm transition-all duration-300 ease-linear hover:scale-110 px-4 bg-[#F51997] text-white'
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          {wrongFileType && (
            <p className='text-center text-base text-red-500 font-semibold mt-1 '>
              please select a video file
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;

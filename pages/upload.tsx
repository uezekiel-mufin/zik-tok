import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { Circles } from "react-loader-spinner";

const UploadScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();
  const [wrongFileType, setWrongFileType] = useState(false);

  const handleUpload = (e: any) => {
    setIsLoading(true);
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
  return (
    <div className='flex w-full h-full'>
      <div className='bg-white rounded-lg'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400'>
              Post a video to your account
            </p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <div className='w-full h-screen flex justify-center items-center  bg-[#f3f0ee] '>
                <Circles
                  height='80'
                  width='80'
                  color='#cea792'
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
                    className='rounded-xl h-[350px] mt-16 bg-black'
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
                      <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
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
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;

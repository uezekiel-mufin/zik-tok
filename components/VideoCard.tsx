import React, { useState } from "react";
import { Video } from "../type";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

type singleVideoProps = {
  post: Video;
};
const VideoCard = ({ post }: singleVideoProps) => {
  const [videoButton, setVideoButton] = useState(false);
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href='/'>
              <a>
                <Image
                  src={post.postedBy.image}
                  alt='profile photo'
                  layout='responsive'
                  width={62}
                  height={62}
                  className='rounded-full'
                />
              </a>
            </Link>
          </div>
          <div>
            <Link href='/'>
              <div className='flex gap-2 items-center '>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName}{" "}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative'>
        <div className='rounded-3xl px-8'>
          <Link href='/'>
            <video
              src={post.video.asset.url}
              controls={videoButton}
              onMouseOver={() => setVideoButton(true)}
              onMouseLeave={() => setVideoButton(false)}
              className='w-full  max-h-[530px] rounded-2xl cursor-pointer bg-gray-100 transition-all duration-300 ease-linear'
            ></video>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

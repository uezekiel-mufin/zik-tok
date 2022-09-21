import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;
  const [topicClicked, setTopicClicked] = useState(false);
  const activeTopic =
    "xl:border-2 hover:bg-primary xl:border-[#f51977] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#f51977]";
  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6 '>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex flex-col xl:justify-start items-start xl:flex-row gap-3 flex-wrap '>
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <a className={topic === item.name ? activeTopic : topicStyle}>
              <span className='font-bold text-2xl xl:text-md'>{item.icon}</span>
              <span className='font-medium text-md hidden md:block capitalize'>
                {item.name}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;

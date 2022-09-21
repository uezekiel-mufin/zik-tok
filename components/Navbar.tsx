import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { addUser, userProfile, removeUser } = useAuthStore();
  console.log(userProfile);

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 '>
      <Link href='/'>
        <a className='w-[100px] md:w-[130px]  cursor-pointer'>
          <Image src={Logo} alt='Tiktik' layout='responsive' />
        </a>
      </Link>
      <div>search</div>
      <div>
        {userProfile ? (
          <div className='flex items-center gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl md:text-4xl' />
                <span className='hidden md:block'>upload</span>
              </button>
            </Link>
            {userProfile && (
              <Link href='/'>
                <a className=' w-8 h-8'>
                  <Image
                    src={userProfile.image}
                    alt='profile photo'
                    layout='responsive'
                    width={62}
                    height={62}
                    className='rounded-full'
                  />
                </a>
              </Link>
            )}
            <button
              type='button'
              className='pr-2'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color='red' fontSize={25} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              createOrGetUser(credentialResponse, addUser);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { addUser, userProfile } = useAuthStore();

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
          <div>{userProfile.userName}</div>
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

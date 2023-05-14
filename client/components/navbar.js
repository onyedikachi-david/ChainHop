import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "./customButton";
import Image from "next/image";
import { logo, menu, search, thirdweb } from "../public/assets";
import { navlinks } from "../constants";

function NavBar() {
  const router = useRouter();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const address = "0xajjkasjiosjdmUWEIJNJKJKSASD";

  return (
    <div className="fixed mb-[35px] flex w-screen flex-col-reverse md:flex-row">
      <div className="ml-auto mr-auto flex h-[52px] max-w-[458px] flex-row justify-center rounded-[100px] bg-[#1c1c24] py-2 pl-4 pr-2 lg:flex-1">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"
        />

        <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#4acd8d]">
          <Image
            src={search}
            alt="search"
            className="h-[15px] w-[15px] object-contain"
          />
        </div>
      </div>

      <div className="mx-10 hidden flex-row justify-end gap-4 sm:flex">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) router.push("createCampaign");
            else "connect()";
          }}
        />

        <Link href="/profile">
          <div className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[#2c2f32]">
            <Image
              src={thirdweb}
              alt="user"
              className="h-[60%] w-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="relative flex items-center justify-between sm:hidden">
        <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]">
          <Image
            src={logo}
            alt="user"
            className="h-[60%] w-[60%] object-contain"
          />
        </div>

        <Image
          src={menu}
          alt="menu"
          className="h-[34px] w-[34px] cursor-pointer object-contain"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute left-0 right-0 top-[60px] z-10 bg-[#1c1c24] py-4 shadow-secondary ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  router.push(link.link);
                }}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.name}
                  className={`h-[24px] w-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue text-[14px] font-semibold ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="mx-4 flex">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) router.push("createCampaign");
                else "connect()";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { navlinks } from "../constants";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import React, { useState } from "react";
import { NavBar } from "../components";
import { logo, sun } from "../public/assets";
import Layout from "../components/layout";
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] hover:bg-[#2c2f32] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex items-center justify-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <Image src={imgUrl} alt="fund_logo" className="h-1/2 w-1/2" />
    ) : (
      <Image
        src={imgUrl}
        alt="fund_logo"
        className={`h-1/2 w-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const SideBar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
      <Link href="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
        <div className="flex flex-col items-center justify-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  router.push(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
      <NavBar />
      <Link href="/home">Home</Link>
    </div>
  );
}

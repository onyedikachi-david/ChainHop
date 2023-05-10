import { useState } from "react";
import { navlinks } from "../constants";
import { logo, sun } from "../public/assets";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { Link } from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";

function SideBar() {
  const pathname = usePathname();
  return (
    <>
      <div>Hello</div>
      {navlinks.map((link) => {
        const isActive = pathname.startsWith(link.link);
        return (
          <div
            className={isActive ? " text-blue-600" : "text-black"}
            key={link.name}
          >
            {link.disabled ? (
              <span>{link.name}</span>
            ) : (
              <Link href={link.link} key={link.name}>
                {link.name}
              </Link>
            )}
          </div>
        );
      })}
    </>
  );
}

export default SideBar;

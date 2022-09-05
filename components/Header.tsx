import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { selectCartItems } from "../slices/cartSlice";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const items = useSelector(selectCartItems);

  return (
    <header className="sticky top-0 z-[100] bg-bg">
      <div className="wrapper flex w-full items-center justify-between py-2">
        <div className="flex items-center md:w-1/5">
          <Link href="/">
            <div className="hover-effect relative h-10 w-5">
              <Image
                src="/images/apple-logo.png"
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>
        <div className="hidden grow items-center justify-center space-x-6 md:flex">
          <a className="headerLink">Product</a>
          <a className="headerLink">Explore</a>
          <a className="headerLink">Support</a>
          <a className="headerLink">Business</a>
        </div>
        <div className="flex w-1/5 items-center justify-end space-x-6">
          <MagnifyingGlassIcon className="hover-effect h-6 shrink-0" />
          <Link href="/checkout">
            <div className="relative">
              <div className="gradient-bg absolute -top-1 -right-2 z-10 flex h-4 w-4 items-center  justify-center rounded-full text-[9px] font-semibold text-white">
                {items.length}
              </div>
              <ShoppingBagIcon className="hover-effect h-6 shrink-0" />
            </div>
          </Link>
          {!session ? (
            <UserIcon
              className="hover-effect h-6 shrink-0"
              onClick={() => signIn()}
            />
          ) : (
            <div className="relative h-[38px] w-[38px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full">
              <Image
                src={session?.user?.image || ""}
                alt=""
                onClick={() => signOut()}
                objectFit="contain"
                layout="fill"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

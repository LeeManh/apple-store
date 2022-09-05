import Image from "next/image";
import React from "react";

const Landing = () => {
  return (
    <section className="sticky top-0 left-0 z-[10]">
      <div className="wrapper flex-items-center h-screen flex-col justify-between md:flex-row">
        <div className="flex-items-center mx-auto flex-col  pt-4 text-center md:w-1/2 md:items-start md:text-start ">
          <h1 className="title flex flex-col space-y-4">
            <span className="gradient-bg bg-clip-text text-transparent">
              Powered
            </span>
            <span>By intellect</span>
            <span>Driven by values</span>
          </h1>
          <div className="flex-items-center mt-10 flex-col space-y-4 md:flex-row md:space-x-6 lg:space-x-8 lg:space-y-0">
            <button className="button">Buy now</button>
            <a className="link w-fit">Learn more</a>
          </div>
        </div>

        <div className="flex w-full md:w-1/2">
          <div className="relative mx-auto h-[28rem] w-[28rem] lg:h-[30rem] lg:w-[30rem]">
            <Image
              src="/images/iphone.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

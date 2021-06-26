import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Banner = () => {
  return (
    <section className="text-black-400 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Share your thoughts
            <br className="hidden lg:inline-block" />
            with others
          </h1>
          <p className="mb-8 leading-relaxed text-xl">
            Addabazz is a plateform where everyone can share their own thoughts and incredible ideas with all and can also gain knowledge by reading others post 
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Player
            autoplay
            loop
            src="https://assets1.lottiefiles.com/private_files/lf30_sxji3ajq.json"
            style={{ height: "300px", width: "300px" }}
          >
          </Player>
        </div>
      </div>
    </section>
  );
};

export default Banner;
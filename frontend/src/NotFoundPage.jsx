import React from "react";
import notfound from "../src/assets/notfound.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div className="h-screen bg-[#DFAA4E] text-gray-900">
        {/* Top-centered text */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center mt-8">
          <h1 className="lg:text-3xl md:text-3xl text-xl font-bold text-red-700 whitespace-nowrap mt-14">404 Page Not Found</h1>
        </div>

        <div className="h-full flex items-center justify-center">
          <div className="grid content-center gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center">
            <div className="justify-self-center text-center lg:text-left">
              <p className="pb-2 font-semibold lg:mt-0 md:mt-0 mt-10">Error 404</p>
              <h1 className="pb-4 text-5xl font-bold lg:text-6xl">Hey Buddy</h1>
              <p className="pb-8 md:px-0 px-4 font-semibold">
                We can't seem to find the page, <br />
                you are looking for or you are not authorized to view it.
              </p>
              <Link to="/login">
                <div className="inline-flex items-center justify-center rounded-full bg-gray-900 md:py-4 py-2.5 md:px-8 px-5 font-bold text-white cursor-pointer hover:scale-105 duration-300">
                  Go to Log in
                </div>
              </Link>
            </div>

            <div className="justify-self-center relative">
              <img
                src={notfound}
                className="w-64 md:w-96 lg:w-[400px] animate-[bounceImage_2s_infinite]"
                alt="Not Found"
              />
              <div className="absolute top-full left-[20%] transform mt-[-2rem] h-14 md:h-16 w-36 md:w-64 rounded-[50%] bg-gray-900/30 blur-md animate-[shadowScale_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes bounceImage {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes shadowScale {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(0.8);
              opacity: 0.7;
            }
          }
        `}
      </style>
    </>
  );
};

export default NotFoundPage;

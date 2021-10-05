import React from "react";

const HomeTopBanner = () => {
  return (
    <div
      className="bg-blue-200 bg-cover bg-fixed bg-center bg-no-repeat rounded-b-xl px-0"
      style={{
        backgroundImage: `url("https://i.ibb.co/KWyrQLQ/bc625798239927-5ed7bc86159b6-1.jpg")`,
      }}
    >
      <div className="container flex justify-between align-bottom pt-80">
        <div className=" lg:pl-7">
          <div className=" lg:text-8xl md:text-5xl sm:text-4xl font-fatKidFont">
            Seize Your <em className=" text-ferrariRed">Pandemic Vacation</em>
          </div>
          <div className="lg:text-2xl md:text-md sm:text-md font-semibold">
            Discover books to guide you on the road to self-care.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTopBanner;

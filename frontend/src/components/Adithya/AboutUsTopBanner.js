import React from "react";

const AboutUsTopBanner = () => {
  return (
    <>
      <div
        className="bg-blue-200 bg-cover bg-fixed bg-center bg-no-repeat rounded-xl"
        style={{
          backgroundImage: `url("https://i.ibb.co/R2RrvBx/d0f15f126079525-612632f249798.jpg")`,
          height: "70vh",
        }}
      ></div>
      <div className="container py-8 px-10 md:py-24">
        <div className=" font-semibold opacity-80 text-md mb-8 md:mb-20">
          Welcome to the world of{" "}
          <strong className="text-black">APURU POTH</strong>.
          <p>
            Explore the topics and categories on this page to learn more about
            how we partner with authors all around this little island and still
            expanding along with international communities.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUsTopBanner;

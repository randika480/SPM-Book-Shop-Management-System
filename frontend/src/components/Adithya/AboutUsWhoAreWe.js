import React from "react";

const AboutUsWhoAreWe = () => {
  const aboutPageData = {
    aboutStories: [
      {
        imgSrc: "https://i.ibb.co/r4DsZT0/a6cee135252495-56effd656c0f4.jpg",
        content:
          "With a rich history dating back to the 2000s, our expansive publishing portfolio contains books and products for readers of all ages at every stage of life. We’re also proud to count more than 80 Nobel Prize laureates and hundreds of the world’s most widely read authors as part of the Apuru Publishers family. Apuru Publishers is a cultural institution dedicated to serving our communities beyond the books we publish. Through our campaigns, partnerships, and internal initiatives, we strive to shape a more equitable, diverse, and sustainable world. Click here to view our global 2020 Social Impact report.",
        heading: "Our Story",
        contentAlign: "left",
      },
      {
        imgSrc: "https://i.ibb.co/9YyrZ1g/9c433b121645725-60ca0aa318883.jpg",
        content:
          "Apuru Publishers is the international home to more than 300 editorially and creatively independent publishing imprints. Our mission is to ignite a universal passion for reading by creating books for everyone. We believe that books, and the stories and ideas they hold, have the unique capacity to connect us, change us, and carry us toward a better future for generations to come.",
        heading: "Our Vision",
        contentAlign: "right",
      },
      {
        imgSrc:
          "https://i.ibb.co/vv8cTzd/illustrations-20111109-1237758453.png",
        content:
          "Our dedicated team of publishing professionals is committed to helping authors realize their very best work and to finding innovative new ways of bringing stories and ideas to audiences worldwide. By leveraging our global reach, embracing new technologies, and collaborating with authors at every stage of the publishing process—from editorial and design, to sales and marketing, to production and distribution—we aim to provide them with the greatest platform possible. At the same time, we fiercely protect our authors’ intellectual property and champion freedom of expression, ensuring that their voices carry beyond the page and into the folds of communities and societies around the globe.",

        heading: "How do we drive impact ?",
        contentAlign: "left",
      },
    ],
  };

  return (
    <div>
      {aboutPageData?.aboutStories?.map((story, index) => {
        return (
          <div key={index} className="lg:mb-16">
            {(index + 1) % 2 === 0 && (
              <div className="p-3 flex flex-col lg:flex-row justify-around">
                <div className="mt-10 m-auto mb-3 w-2/4 flex justify-center">
                  <img
                    className=" align-middle text-right rounded-xl"
                    src={story.imgSrc}
                    alt="About us"
                    width="80%"
                    height="80%"
                    border="0"
                  />
                </div>
                <div className="p-3 items-center m-auto lg:pl-20 lg:w-1/2">
                  <div className="text-center mb-3 lg:text-left lg:text-5xl font-semibold font-medievalFont">
                    {story.heading || ""}
                  </div>
                  <div className=" mt-5 font-contentFont">{story.content}</div>
                </div>
              </div>
            )}
            {(index + 1) % 2 === 1 && (
              <div className="p-3 flex flex-col-reverse lg:flex-row justify-around ">
                <div className={`p-3 lg:pr-20 m-auto items-center lg:w-1/3`}>
                  <div className="text-center mb-3 lg:text-left lg:text-5xl font-semibold font-medievalFont">
                    {story.heading || ""}
                  </div>
                  <div className=" mt-5 font-contentFont">{story.content}</div>
                </div>
                {story.content?.length < 3 ? (
                  <div className="mt-10 m-auto mb-3 w-2/4 flex justify-center">
                    <img
                      className="m-0 rounded-xl"
                      src={story.imgSrc}
                      alt="About us"
                      width="80%"
                      height="80%"
                      border="0"
                    />
                  </div>
                ) : (
                  <div className="sm:hidden lg:block p-0 m-auto w-1/2">
                    <img
                      className="m-0 rounded-xl"
                      src={story.imgSrc}
                      alt="About us"
                      width="80%"
                      height="80%"
                      border="0"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AboutUsWhoAreWe;

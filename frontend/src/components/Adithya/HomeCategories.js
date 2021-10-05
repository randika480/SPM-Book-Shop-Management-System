import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {
  Novels,
  Historical,
  Literary,
  MilitaryWestern,
  Romance,
  Spiritual,
  WomenFiction,
  SciFiFantasy,
} from "../../svg/categories";
const HomeCategories = () => {
  const dummyBooks = [
    { title: "Novels", icon: "Novels" },
    { title: "Historical", icon: "Historical" },
    { title: "Literary", icon: "Literary" },
    { title: "Military & Western", icon: "MilitaryWestern" },
    { title: "Romance", icon: "Romance" },
    { title: "Spiritual", icon: "Spiritual" },
    { title: "Women's Fiction", icon: "WomenFiction" },
    { title: "Sci-Fi & Fantasy", icon: "SciFiFantasy" },
  ];
  return (
    <>
      <div className=" w-11/12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  lg:gap-6 md:gap-4 sm:gap-3 m-auto">
        {dummyBooks.map((item, index) => (
          <div key={index} className="text-center m-6 ">
            <Card
              onClick={() => {
                window.location = `category/books/${item.title}`;
              }}
              className="bg-gradient-to-t from-blueSapphire to-prussianBlue opacity-90 hover:opacity-100"
            >
              <CardActionArea
                style={{
                  maxWidth: 350,
                  height: 150,
                  color: "white",
                  fontWeight: 400,
                  fontSize: "1.3rem",
                }}
              >
                <div className="flex justify-center">
                  {item.title}
                  <p> &nbsp; &nbsp;</p>
                  {item.icon === "Novels" && <Novels />}
                  {item.icon === "Historical" && <Historical />}
                  {item.icon === "Literary" && <Literary />}
                  {item.icon === "MilitaryWestern" && <MilitaryWestern />}
                  {item.icon === "Romance" && <Romance />}
                  {item.icon === "Spiritual" && <Spiritual />}
                  {item.icon === "WomenFiction" && <WomenFiction />}
                  {item.icon === "SciFiFantasy" && <SciFiFantasy />}
                </div>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
      <div className="w-11/12 m-auto">
        <button className="text-center text-2xl border border-2 px-3 py-1 font-boldTallFont rounded bg-gamboge opacity-90 hover:opacity-100">
          View All
        </button>
      </div>
    </>
  );
};

export default HomeCategories;

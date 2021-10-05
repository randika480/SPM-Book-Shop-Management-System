import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Image } from "cloudinary-react";
import axios from "axios";

const HomeCarousal = () => {
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const getAllBooks = async () => {
      await axios
        .get("http://localhost:6500/matrix/api/inventoryManager/get-books")
        .then((res) => {
          setBookData(res?.data?.allBooks);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
    getAllBooks();
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
  };

  return (
    <div className="grid-flow-col col-span-2 pt-4">
      <div className="mx-20">
        {bookData && (
          <Slider {...settings}>
            {bookData.map((item, index) => {
              if (item.bookImage?.imagePublicId && index < 6) {
                return (
                  <div key={index}>
                    <Image
                      className="rounded"
                      cloudName="grid1234"
                      publicId={item.bookImage.imagePublicId}
                      onClick={() => {
                        window.location = `/book/${item.ISBN}`;
                      }}
                    />
                  </div>
                );
              }
            })}
          </Slider>
        )}
      </div>
      <div className="text-center text-2xl mt-8">
        <button className="border border-2 px-3 py-1 font-boldTallFont rounded bg-gamboge">
          Explore
        </button>
      </div>
    </div>
  );
};

export default HomeCarousal;

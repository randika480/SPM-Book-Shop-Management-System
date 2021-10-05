import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";
import ClampLines from "react-clamp-lines";
import Select from "react-select";
import Hidden from "@material-ui/core/Hidden";
import Header from "../components/Adithya/Header";
import Footer from "../components/Adithya/Footer";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  paginationButton: {
    width: "80%",
    height: "40px",
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    paddingTop: "10px",

    "& a": {
      margin: "3px",
      border: "1px solid #065774",
      color: "#065774",
      padding: "5px",
      borderRadius: "5px",
      cursor: "ponter",
    },

    "& a:hover": {
      color: "white",
      backgroundColor: "#065774",
    },
  },
});

const AllProducts = () => {
  const { catname } = useParams();

  const classes = useStyles();
  const [searchTerm, setsearchTerm] = useState(catname);
  const [products, setproducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [options, setOptions] = useState([]);
  let filterd = false;

  useEffect(() => {
    const getNewsletterItems = async () => {
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getProducts")
          .then((res) => {
            let testLables = [];
            let testProducts = [];
            for (let i = 0; i < res.data.Products.length; i++) {
              if (res.data.Products[i].category) {
                testProducts.push(res.data.Products[i]);
                testLables.push(res.data.Products[i].category.toLowerCase());
              }
            }

            setproducts(testProducts);
            let data = [];
            let uniqueLables = testLables.filter((c, index) => {
              return testLables.indexOf(c) === index;
            });
            uniqueLables.map((item) => {
              let category = {
                value: item,
                label: item,
              };
              data.push(category);
              return 0;
            });

            setOptions(data);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getNewsletterItems();
  }, []);

  const bookPerPage = 5;
  let pageVisited = pageNumber * bookPerPage;

  const displayBooks = products
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
      return null;
    })
    .slice(pageVisited, pageVisited + bookPerPage)
    .map((book, index) => {
      return (
        <div className="w-full m-auto h-full mb-1  " key={index}>
          <div className="lg:w-1/5 md:w-1/2 sm:w-full h-max  float-left mb-5 mt-5 p-4">
            <div className="w-full h-max shadow-lg">
              <p className="font-fatKidFont  text-lg mb-3 text-center">
                {book.publishingTitle}
              </p>
              <div
                className=" h-52 w-48  m-auto "
                onClick={() => {
                  window.location = `/book/${book.ISBN}`;
                }}
              >
                {book.bookImage && (
                  <Image
                    className="w-full h-full object-contain "
                    cloudName="grid1234"
                    publicId={book.bookImage.imagePublicId}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </div>
              <div className="w-full p-4">
                <div>
                  <p className="font-thinFont font-bold text-sm text-gray-600">
                    {book.translator}
                  </p>

                  <ClampLines
                    text={book.aboutBook}
                    id="really-unique-id"
                    lines={3}
                    ellipsis="....."
                    moreText=""
                    className="custom-class text-md font-medievalFont text-black"
                    innerElement="p"
                  />
                  {!book.discountPercentage.label && (
                    <p className="font-bold text-lg">
                      Rs.
                      {book.marketPrice}/=
                    </p>
                  )}
                  {book.discountPercentage.label && (
                    <p className="font-bold text-lg">
                      <del className="text-gray-400">Rs.{book.marketPrice}</del>{" "}
                      Rs.
                      {book.marketPrice -
                        (book.discountPercentage.regular * book.marketPrice) /
                          100}
                    </p>
                  )}

                  <div className="w-full h-10">
                    {book.discountPercentage.label && (
                      <div className="cursor-pointer w-max h-9 float-right bg-red rounded-3xl bg-ferrariRed p-2 transform hover:scale-110 motion-reduce:transform-none">
                        <p className="text-white font-bold text-sm">
                          {book.discountPercentage.label}{" "}
                          {book.discountPercentage.regular}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  let filterBooks = [];

  const getPageCount = () => {
    products
      .filter((val) => {
        if (searchTerm === "") {
          return val.length;
        } else if (
          val.category.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
        return 0;
      })
      .map((filterBook, index) => {
        filterBooks.push(filterBook);
        return 0;
      });
  };

  let pageCount = 0;
  if (searchTerm) {
    getPageCount();
    pageCount = Math.ceil(filterBooks.length / bookPerPage);
  } else {
    pageCount = Math.ceil(products.length / bookPerPage);
  }

  const changePage = ({ selected }) => {
    if (filterd) {
      setPageNumber(0);
    } else {
      setPageNumber(selected);
    }
  };
  return (
    <>
      <Header />
      <div className="w-full  h-full p-1">
        <div className="w-full h-16">
          <div className=" w-full float-left">
            <h1 className="text-4xl font-bold mb-5   lg:pl-8 pt-3 font-thinFont ml-3">
              Categories
            </h1>
          </div>
        </div>
        <Hidden only={["lg", "xl"]}>
          <div>
            <Select
              options={options}
              onChange={(event) => {
                filterd = true;
                changePage(filterd);
                setsearchTerm(event.value);
              }}
              className="basic-multi-select"
            />
          </div>
        </Hidden>
        <Hidden only={["md", "sm", "xs"]}>
          <div className="w-full h-16 bg-yellow-400 p-3  ">
            {options.map((offers, index) => {
              return (
                <div>
                  {offers.value
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) && (
                    <div className="cursor-pointer w-max h-9 bg-red rounded-3xl bg-ferrariRed p-2 pl-4 pr-4 float-left ml-3 transform hover:scale-110 motion-reduce:transform-none">
                      <p
                        className="text-white font-bold text-center text-sm"
                        onClick={() => {
                          filterd = true;
                          changePage(filterd);
                          setsearchTerm(offers.value);
                        }}
                      >
                        {offers.value.toUpperCase()}
                      </p>
                    </div>
                  )}
                  {!offers.value
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) && (
                    <div className="cursor-pointer w-max h-9 bg-red rounded-3xl bg-halloweenOrange p-2 pl-4 pr-4 float-left ml-3 transform hover:scale-110 motion-reduce:transform-none bg-opacity-50">
                      <p
                        className="text-white font-bold text-center text-sm"
                        onClick={() => {
                          filterd = true;
                          changePage(filterd);
                          setsearchTerm(offers.value);
                        }}
                      >
                        {offers.value.toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Hidden>

        {filterBooks.length > 0 && (
          <div className="mb-4 w-full h-max ">{displayBooks}</div>
        )}
        {filterBooks.length <= 0 && (
          <div style={{ height: "30vh" }}>
            {" "}
            <p className="font-fatKidFont text-4xl mb-3 text-center">
              No Item Awailable
            </p>
          </div>
        )}

        {filterBooks.length <= 0 && (
          <div className="w-max">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={classes.paginationButton}
              previousLinkClassName={classes.previousBttn}
              nextLinkClassName={classes.nextBttn}
              disabledClassName={classes.paginationDisabled}
              activeLinkClassName={classes.paginationActive}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;

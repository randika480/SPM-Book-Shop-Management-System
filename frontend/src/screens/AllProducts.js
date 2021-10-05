import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";
import ClampLines from "react-clamp-lines";
import Header from "../components/Adithya/Header";
import Footer from "../components/Adithya/Footer";
import SearchIcon from "@material-ui/icons/Search";
import ReplayIcon from "@material-ui/icons/Replay";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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
  const classes = useStyles();
  const [searchTerm, setsearchTerm] = useState("");
  const [products, setproducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  let filterd = false;

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getProducts")
          .then((res) => {
            setproducts(res.data.Products);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getAllBooks();
  }, []);

  const bookPerPage = 5;
  let pageVisited = pageNumber * bookPerPage;

  const displayBooks = products
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.publishingTitle.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
      return null;
    })
    .slice(pageVisited, pageVisited + bookPerPage)
    .map((book, index) => {
      return (
        <div key={index} className="w-2/3 m-auto h-auto mb-5">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} md={3}>
              <div className=" m-1">
                <div
                  className="h-48 w-32 m-auto"
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
              </div>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <div className=" m-1 pt-8">
                <h1 className=" lg:text-xl md:text-m sm:text-sm text-left text-halloweenOrange font-bold font-boldTallFont">
                  {book.publishingTitle}
                </h1>
                <div className="w-2/3">
                  <p className="object-cover font-contentFont lg:text-lg md:text-sm sm:text-xs ">
                    <ClampLines
                      text={book.aboutBook}
                      id="really-unique-id"
                      lines={3}
                      ellipsis="....."
                      moreText=""
                      className="custom-class text-md font-medievalFont text-black"
                      innerElement="p"
                    />
                  </p>
                </div>
                <div className="w-2/3 ">
                  <div className="w-max mr-3 float-left mt-1">
                    {!book.discountPercentage.label && (
                      <p className="font-bold text-lg">
                        Rs.
                        {book.marketPrice}/=
                      </p>
                    )}
                    {book.discountPercentage.label && (
                      <p className="font-bold text-lg">
                        <del className="text-gray-400">
                          Rs.{book.marketPrice}
                        </del>{" "}
                        Rs.
                        {book.marketPrice -
                          (book.discountPercentage.regular * book.marketPrice) /
                            100}
                      </p>
                    )}
                  </div>
                  {book.discountPercentage.label && (
                    <div className="w-max bg-ferrariRed float-left h-8 rounded-full p-3 pt-1 text-white font-bold">
                      {book.discountPercentage.label}{" "}
                      {book.discountPercentage.regular}%
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>

          <Divider />
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
          val.publishingTitle.toLowerCase().includes(searchTerm.toLowerCase())
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
      filterd = false;
    } else {
      setPageNumber(selected);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full  h-full p-1">
        <div className="w-full  h-16 p-1">
          <h1 className="text-4xl   font-bold mb-5   pl-8 pt-3 font-thinFont">
            BOOKSHELF
          </h1>

          <div className="lg:w-2/3 md:w-full sm:w-full m-auto">
            <div className="w-max mb-1 p-1 rounded-lg  h-14  bg-lightSilver">
              <div className="w-2/3 h-16" style={{ float: "left" }}>
                <input
                  type="text"
                  className="w-60 h-11 p-5 rounded-3xl"
                  id="code"
                  placeholder="Search Book Name Here"
                  value={searchTerm}
                  onChange={(event) => {
                    filterd = true;
                    changePage(filterd);
                    setsearchTerm(event.target.value);
                  }}
                  style={{ float: "left" }}
                ></input>
              </div>
              {searchTerm && (
                <ReplayIcon
                  style={{ float: "left" }}
                  className="m-3 cursor-pointer"
                  onClick={() => {
                    setsearchTerm("");
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 w-full h-max ">{displayBooks}</div>

        <div className="w-max float-right pr-96">
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
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";
import Header from "../components/Adithya/Header";
import Footer from "../components/Adithya/Footer";

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
      margin: "8px",
      border: "1px solid #065774",
      color: "#065774",
      padding: "10px",
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
  const [newsletterItems, setNewsletterItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const bookPerPage = 4;
  const pageVisited = pageNumber * bookPerPage;

  const displayBooks = newsletterItems
    .slice(pageVisited, pageVisited + bookPerPage)
    .map((book, index) => {
      if (index % 2 === 0) {
        return (
          <div
            key={index}
            className="p-5 w-2/3 m-auto h-auto mb-5 bg-gray-400 shadow-2xl transform hover:scale-110 motion-reduce:transform-none rounded-tl-3xl rounded-br-3xl"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} md={3}>
                <div className=" m-1">
                  <div className="h-48 w-32 m-auto">
                    <Image
                      className="w-full h-full object-contain "
                      cloudName="grid1234"
                      publicId={book.coverImage.imagePublicId}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <div className=" m-1">
                  <h1 className=" lg:text-xl md:text-m sm:text-sm text-left font-bold font-fatKidFont text-blueSapphire">
                    {book.title}
                  </h1>
                  <h1 className="lg:text-m md:text-sm sm:text-xs text-left text-gray-500 font-bold font-boldTallFont ">
                    {book.tag}
                  </h1>
                  <p className="object-cover font-contentFont lg:text-l md:text-sm sm:text-xs text-white">
                    {book.description}
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      } else {
        return (
          <div
            key={index}
            className="p-5 w-2/3 m-auto h-auto mb-5  shadow-2xl transform hover:scale-110 motion-reduce:transform-none rounded-tr-3xl rounded-bl-3xl bg-gamboge bg-opacity-70"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={9} md={9}>
                <div className=" m-1">
                  <h1 className=" lg:text-xl md:text-m sm:text-sm text-left  font-bold font-fatKidFont text-blueSapphire">
                    {book.title}
                  </h1>
                  <h1 className="lg:text-m md:text-sm sm:text-xs text-left text-gray-500 font-bold font-boldTallFont ">
                    {book.tag}
                  </h1>
                  <p className="object-cover font-contentFont lg:text-l md:text-sm sm:text-xs ">
                    {book.description}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div className=" m-1">
                  <div className="h-48 w-32 m-auto">
                    <Image
                      className="w-full h-full object-contain "
                      cloudName="grid1234"
                      publicId={book.coverImage.imagePublicId}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      }
    });

  const pageCount = Math.ceil(newsletterItems.length / bookPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const getNewsletterItems = async () => {
      let array = [];
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getNewsletters")
          .then((res) => {
            for (let i = res.data.Newsletters.length - 1; i >= 0; i--) {
              array.push(res.data.Newsletters[i]);
            }
            setNewsletterItems(array);
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

  return (
    <>
      <Header />
      <div className="w-full  h-max p-1 mb-3">
        <h1 className="text-4xl  mb-5   pl-8 pt-3 font-boldTallFont">
          Newsletter
        </h1>

        {displayBooks}

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
      <Footer />
    </>
  );
};

export default AllProducts;

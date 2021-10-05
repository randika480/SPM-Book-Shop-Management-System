import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import ReplayIcon from "@material-ui/icons/Replay";
import * as Yup from "yup";
import { Formik } from "formik";
import { Image } from "cloudinary-react";

const validationSchema = Yup.object({
  lable: Yup.string()
    .trim()
    .uppercase()
    .required("Discount Lable  is required"),
  regularPercentage: Yup.number()
    .positive()
    .integer()
    .min(1, "Please enter a valid percentage")
    .required("Regular Percentage number is required"),
  bulkPercentage: Yup.number()
    .positive()
    .integer()
    .min(1, "Please enter a valid percentage")
    .required("Bulk Percentage is required"),
});

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

const Discount = () => {
  const classes = useStyles();

  // const [checked, setChecked] = React.useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  let selectedBook = [];
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);

  const bookPerPage = 10;
  const pageVisited = pageNumber * bookPerPage;

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  const addDiscount = async (values) => {
    if (selectedBook.length > 0) {
      let dataObject = {
        regular: values.regularPercentage,
        bulk: values.bulkPercentage,
        label: values.lable.toUpperCase(),
        BIDs: selectedBook,
      };

      try {
        await axios
          .put(
            "http://localhost:6500/matrix/api/admin/addDiscountsForSelected",
            dataObject
          )
          .then(() => {
            window.location.reload(false);
          });
      } catch (err) {
        alert("error :" + err);
      }
    } else {
      alert("Please select at least one book!!");
    }
  };

  const displayBooks = products
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.BookName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
      return null;
    })
    .slice(pageVisited, pageVisited + bookPerPage)
    .map((book, index) => {
      return (
        <div
          className="w-1/4 h-full mb-4 "
          style={{ float: "left" }}
          key={index}
        >
          <div className="w-full h-full">
            <div>
              <Checkbox
                style={{ float: "left" }}
                inputProps={{
                  "aria-label": "uncontrolled-checkbox",
                }}
                onClick={() => {
                  selectedBook.push(book._id);
                }}
              />
            </div>

            <div className="w-4/5 h-full">
              <div className=" h-full ">
                {book.bookImage && (
                  <Image
                    className="w-full h-full object-contain "
                    cloudName="grid1234"
                    publicId={book.bookImage.imagePublicId}
                    style={{ width: "70%", height: "150px" }}
                  />
                )}
              </div>

              <div className="w-full h-max ml-10">
                <h1 className="  font-boldTallFont">{book.publishingTitle}</h1>
              </div>
              <div className="w-full h-max ml-10">
                {book.discountPercentage.label && (
                  <h1 className=" text-white font-boldTallFont bg-red-700 rounded-2xl w-max p-1">
                    {book.discountPercentage.label}
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(products.length / bookPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getProducts")
          .then((res) => {
            setProducts(res.data.Products);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl h-16 text-center text-white font-bold mb-1 bg-prussianBlue pt-4 rounded-lg">
        Add Discounts
      </h1>

      <div className="mt-5">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <div className="w-full m-auto h-auto mb-5 bg-lightSilver ml-12">
                <div className="w-full m-auto mt-5 bg-white p-5 rounded-lg shadow-lg">
                  <div className="mt-4">
                    <Formik
                      initialValues={{
                        lable: "",
                        regularPercentage: "0",
                        bulkPercentage: "0",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={async (values) => {
                        // console.log(values);
                        // alert(values.regularPercentage);
                        addDiscount(values);
                      }}
                    >
                      {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                      }) => (
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit();
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item md={4}>
                              <div>
                                <h1 className="text-l text-left text-black font-bold mb-5 ">
                                  Regular Percentage
                                </h1>
                              </div>
                            </Grid>
                            <Grid item md={6}>
                              <div>
                                <input
                                  className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                    errors.regularPercentage &&
                                    touched.regularPercentage
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } text-base`}
                                  id="regularPercentage"
                                  type="text"
                                  placeholder=""
                                  onChange={handleChange("regularPercentage")}
                                  value={values.regularPercentage}
                                />
                                {errors.regularPercentage &&
                                touched.regularPercentage ? (
                                  <div className="text-red-500 text-xs mt-1 md:text-sm">
                                    {errors.regularPercentage}
                                  </div>
                                ) : null}
                              </div>
                            </Grid>
                            <Grid item md={4}>
                              <div>
                                <h1 className="text-l text-left text-black font-bold mb-5">
                                  Bulk Percentage
                                </h1>
                              </div>
                            </Grid>
                            <Grid item md={6}>
                              <div>
                                <input
                                  className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                    errors.bulkPercentage &&
                                    touched.bulkPercentage
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } text-base`}
                                  id="bulkPercentage"
                                  type="text"
                                  placeholder=""
                                  onChange={handleChange("bulkPercentage")}
                                  value={values.bulkPercentage}
                                />
                                {errors.bulkPercentage &&
                                touched.bulkPercentage ? (
                                  <div className="text-red-500 text-xs mt-1 md:text-sm">
                                    {errors.bulkPercentage}
                                  </div>
                                ) : null}
                              </div>
                            </Grid>
                            <Grid item md={4}>
                              <div>
                                <h1 className="text-l text-left text-black font-bold mb-5 ">
                                  lable
                                </h1>
                              </div>
                            </Grid>
                            <Grid item md={6}>
                              <div>
                                {" "}
                                <input
                                  className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                    errors.lable && touched.lable
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  } text-base`}
                                  id="lable"
                                  type="text"
                                  placeholder=""
                                  onChange={handleChange("lable")}
                                  value={values.lable}
                                />
                                {errors.lable && touched.lable ? (
                                  <div className="text-red-500 text-xs mt-1 md:text-sm">
                                    {errors.lable}
                                  </div>
                                ) : null}
                              </div>
                            </Grid>

                            <Grid item md={12}>
                              <div className="w-max m-auto">
                                <button
                                  type="submit"
                                  className="object-center focus:outline-none bg-gamboge text-snow-900 text-base rounded border hover:border-transparent w-32 h-10"
                                  style={{
                                    boxShadow:
                                      "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                    float: "right",
                                    color: "white",
                                  }}
                                >
                                  ADD
                                </button>
                              </div>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <div>
        

              <div className="w-2/3 mb-1 p-1 bg-blueSapphire rounded-lg  h-14 bg-opacity-30 m-auto">
               
                <div className="w-4/5 h-16" style={{ float: "left" }}>
                  <input
                    type="text"
                    className="w-full h-11 p-5 rounded-3xl"
                    id="code"
                    placeholder="Search book name here"
                    value={searchTerm}
                    onChange={(event) => {
                      setsearchTerm(event.target.value);
                    }}
                    style={{ float: "left" }}
                  ></input>
                </div>
                <ReplayIcon
                  style={{ float: "left" }}
                  className="m-3"
                  onClick={() => {
                    setsearchTerm("");
                  }}
                />
              </div>

              <div
                className=" border-gray-300 border-2  m-auto p-2 pt-10 bg-white overflow-y-auto"
                style={{ width: "50vw", maxHeight: "550px" }}
              >
                <div className="w-full  h-auto m-auto">
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
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Discount;

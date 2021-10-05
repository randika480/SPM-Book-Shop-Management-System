import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from '@material-ui/core/IconButton';
import Header from "../components/Adithya/Header";
import Footer from "../components/Adithya/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image } from "cloudinary-react";
import Checkout from "./Checkout";
import ClampLines from "react-clamp-lines";

const ShoppingCart = (props) => {
  const [emptyStorage, setEmptyStorage] = useState(true);
  const [cusCart, setCusCart] = useState(null);
  const [finalOrder, setFinalOrder] = useState([]);
  const [totAmount, setTotAmount] = useState(0);

  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    setEmptyStorage(true);
    const getCartData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      await axios
        .get(`http://localhost:6500/matrix/api/customer/getCartItems`, config)
        .then((res) => {
          console.log(res.data.cart);
          setCusCart(res.data.cart);

          // setEmptyStorage(false);
          if (res.data.cart.length > 0) {
            setEmptyStorage(false);
          }
        })
        .catch((err) => {
          alert("Error in order set : " + err);
        });
    };
    getCartData();
  }, []);

  const qutIncrease = (pID, unitPrice, bookName, weight) => {
    let tempQut = 0;
    let count = 0;
    finalOrder.forEach((item) => {
      if (item.productID === pID) {
        count = finalOrder.indexOf(item);
        tempQut = item.quantity;
        finalOrder.splice(count, 1);
      }
    });
    finalOrder.push({
      productID: pID,
      quantity: tempQut + 1,
      bookName: bookName,
      weight: weight,
    });
    setTotAmount(totAmount + unitPrice);

    console.log(finalOrder);
  };

  const qutDecrease = (pID, unitPrice, bookName, weight) => {
    let tempQut = 0;
    let count = 0;
    let stopProcess = false;
    finalOrder.forEach((item) => {
      count = finalOrder.indexOf(item);
      if (item.productID === pID) {
        tempQut = item.quantity;
        if (tempQut === 1) {
          //finalOrder.splice(count, 1);
          delete finalOrder[item];
          stopProcess = true;
        }
        finalOrder.splice(count, 1);
      }
    });
    if (!stopProcess) {
      finalOrder.push({
        productID: pID,
        quantity: tempQut - 1,
        bookName: bookName,
        weight: weight,
      });
      setTotAmount(totAmount - unitPrice);
    }
    setTotAmount(totAmount - unitPrice);

    console.log("finalOrder" + finalOrder);
  };

  // const proceedCheckout = (finalOrder,totAmount) =>{

  // }

  const removeFromCart = async (pID) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    const reqObj = { pid: pID };

    await axios
      .put(
        "http://localhost:6500/matrix/api/customer/removeCartItems",
        reqObj,
        config
      )
      .then((res) => {
        alert("Item removed from cart");
        window.location.reload();
      })
      .catch((err) => {
        alert("Error Occured!! " + err);
      });
  };

  return (
    <React.Fragment>
      <Header />
      <div className="flex w-full min-h-screen justify-center items-center ">
        <div className="w-full xl:max-w-6xl sm:max-w-xl md:max-w-3xl h-3/4 mt-6 mb-10 p-8 rounded-xl shadow-lg text-black bg-gamboge">
          <h1 className="font-boldTallFont font-semibold text-4xl">
            Shopping Cart
          </h1>
          <div className="flex flex-row space-x-6 bg mt-6">
            <div className="flex flex-col w-full lg:max-w-full lg:flex">
              {emptyStorage && <h2>Your Cart is Empty! </h2>}
              {!emptyStorage && (
                <>
                  {cusCart.map((item) => {
                    return (
                      <>
                        <div className="flex flex-row mt-3">
                          <div
                            key={item.productID}
                            className=" h-96 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                            title="Mountain"
                          >
                            <Image
                              cloudName="grid1234"
                              publicId={item.proImg}
                            />
                          </div>
                          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-8">
                              <div className="text-gray-900 font-bold text-xl mb-2">
                                {item.originalTitle}
                              </div>
                              <h5 className="text-gray-700 text-base mb-2">
                                {item.unitPrice}
                              </h5>
                              <p className="text-gray-700 text-base mb-2">
                                {item.originalAuthor}
                              </p>
                              {/* <p className="text-gray-700 text-base mb-2">
                   {item.aboutBook}
                  </p> */}
                              <ClampLines
                                text={item.aboutBook}
                                id="really-unique-id"
                                lines={2}
                                ellipsis="....."
                                moreText=""
                                className="custom-class text-md font-medievalFont text-black"
                                innerElement="p"
                              />
                              <div className="flex flex-row">
                                <div className="m-1">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      qutDecrease(
                                        item.productID,
                                        item.unitPrice,
                                        item.originalTitle,
                                        item.weight
                                      );
                                    }}
                                  >
                                    -
                                  </Button>
                                </div>

                                <div className="m-1">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      qutIncrease(
                                        item.productID,
                                        item.unitPrice,
                                        item.originalTitle,
                                        item.weight
                                      );
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>

                                <div className="m-1">
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    style={{ marginRight: "2rem" }}
                                    onClick={() => {
                                      removeFromCart(item.productID);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>

            <div className="bg-white rounded-md w-full h-96 mt-3">
              {finalOrder !== [] && (
                <div>
                  <h3 className="font-semibold text-lg mt-6 ml-6">
                    Order Histroy
                  </h3>

                  {finalOrder.map((x) => {
                    return (
                      <>
                        <p className=" ml-6 mt-2">Product Name: {x.bookName}</p>
                        <p className="mt-4 ml-6">Quntity: {x.quantity}</p>
                      </>
                    );
                  })}

                  <p className="mt-4 ml-6">Total :Rs. {totAmount}</p>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      marginLeft: "13rem",
                      marginTop: "7rem",
                      marginBotton: "2rem",
                    }}
                    onClick={() => {
                      props.history.push({
                        pathname: "/checkout",
                        finalOrder,
                        totAmount,
                      });
                    }}
                  >
                    Proceed to pay
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ShoppingCart;
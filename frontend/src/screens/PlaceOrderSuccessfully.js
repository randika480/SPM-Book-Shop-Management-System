import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Adithya/Header';
import Footer from '../components/Adithya/Footer';
import generatePDF from "../components/Deshani/OrderReport";

const PlaceOrderSuccessfully = (props) => {

  const productID = (props.location && props.location.proID) || {};

  const quantity = (props.location && props.location.qty) || {};

  const bookName = (props.location && props.location.bName) || {};

  const totAmount = (props.location && props.location.totalAmount) || {};

  const [order, setOrder] = useState("");
  const [orderData, setorderData] = useState([]);

  const getCustomer = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/matrix/api/customer/profile", config)
        .then((res) => {
          getOrder(res.data.customer._id);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const generatePDFReport = () => {
    generatePDF(orderData);
  };

  const getOrder = async (customer) => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getRegularOrders")
        .then((res) => {
          let order = [];
          for (let i = 0; i < res.data.orders.length; i++) {
            if (res.data.orders[i].buyerID === customer) {
              order.push(res.data.orders[i]);
            }
          }
          orderData.push(order[order.length - 1]);
          setOrder(order[order.length - 1]);
          console.log(orderData);
        })

        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

    return (
      <React.Fragment>
      <Header />
        <div className='flex w-full min-h-screen justify-center items-center '>
        <div className="w-full xl:max-w-6xl sm:max-w-xl md:max-w-3xl h-3/4 mt-6 mb-10 p-8 rounded-xl shadow-lg text-black bg-gamboge">
        <h1 className='font-boldTallFont font-semibold text-4xl'>Place Order Successfully</h1>
        <div className="flex flex-col space-y-6 mt-6">
        <div className="bg-white rounded-xl" >
        <h3 className='font-semibold text-lg mt-6 ml-6'>Order Summary</h3>
        <div className="flex flex-row grid-rows-2 ml-48">
        <div>
        <p className='mt-6 ml-6'>{bookName}</p>
        </div>
        <div className='mt-6 ml-96'>
        <p>{totAmount}</p>
        </div>
        </div>
        <div className="flex flex-row grid-rows-2 ml-48">
        <div>
        <p className='mt-6 ml-6'>Quantity</p>
        </div>
        <div className='mt-6' style={{marginLeft:"20rem"}}>
        <p>{quantity}</p>
        </div>
        </div>
        <div className="flex flex-row grid-rows-2 ml-48">
        <div>
        <p className='mt-6 ml-6 font-bold'>Total Price</p>
        </div>
        <div className='mt-6 ml-96'>
        <p className='ml-2 font-bold'>{totAmount}</p>
        </div>
        </div>
        <div  className="flex flex-row grid-rows-2 space-x-10 mt-8 mb-3" style={{marginLeft:"15rem"}}>
        <div>
        <button
              type="submit"
              className="focus:outline-none bg-blueSapphire text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12 font-bold text-white"
              style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }}
              onClick={() => {
                generatePDFReport();
              }}
            >
              Print Order Summary
        </button>
        </div>
        <div>
        <button
        type="submit"
        className="focus:outline-none bg-gray-500 text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12 font-bold text-white"
        style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }}
        onClick = {() =>{
          props.history.push({
            pathname: '/',
       
          });
        }}
      >
        Back to Home
        </button>
        </div>
        </div>
        </div>
        </div>
        </div>  
        </div>
        <Footer />
        </React.Fragment>
    )
}

export default PlaceOrderSuccessfully

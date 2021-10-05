import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ChangeAddressModal from "../components/Deshani/ChangeAddressModal";
import VisaCardModal from "../components/Deshani/VisaCardModal";
import Header from '../components/Adithya/Header';
import Footer from '../components/Adithya/Footer';
import RadioGroup from '@mui/material/RadioGroup';
import axios from "axios";
const Checkout = (props) => {

    const [changeAddressModalOpen,setChangeAddressModalOpen] = useState(false);
    const [visaCardModalOpen,setVisaCardModalOpen] = useState(false);
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [orderHistory,setOrderHistory] = useState([]);

    const order = (props.location && props.location.finalOrder) || {};

    const totalAmount = (props.location && props.location.totAmount) || {};

    const [selectedValue, setSelectedValue] = React.useState('cash on delivery');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if(selectedValue === 'cash on delivery'){
      setVisaCardModalOpen(true);
    
    }
  };

  // const orData = (orderHistory) =>{
  //   for(let i=0;i<orderHistory.length;i++){
  //       setOrderDetails(orderHistory[i].productID);
  //       setOrderDetails(orderHistory[i].quantity);
  //   }
  // } 

  const placeNewOrder = async (proID,qty,bName) => {
    let reqObj = {
      billAmount: totalAmount,
      orderData: {
        productID:proID,
        quantity:qty
      }
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios
        .post(
          "http://localhost:6500/matrix/api/customer/addOrder",
          reqObj,
          config
        )
        .then((res) => {
          alert("Your Order has been places Successfully!");
          props.history.push({
            pathname: '/order-success',
            proID,
            qty,
            bName,
            totalAmount
          });
        })
        .catch((err) => {
          alert("Error -" + err);
        });
    } catch (error) {
      alert("Error occured!!! : " + error);
    }
  };


    useEffect(() =>{
      const getCustomer = async() =>{
        const config ={
          headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
      };
      try{
        await axios
            .get("http://localhost:6500/matrix/api/customer/profile",config)
            .then((res) =>{
              
              setAddress(res.data.customer.address);
              setPhone(res.data.customer.phone);
              console.log(totalAmount);
              console.log(order);
              setOrderHistory(order);
            
            })
            .catch((err) =>{
              alert("Error occured!!! :"+err);
            });
      }catch(error){
        alert("Error occured!!! : " + error)
      }
    };
    getCustomer();
},[]);


    return (
      <React.Fragment>
      <Header />
        <div className='flex w-full min-h-screen justify-center items-center '>
        <div className="w-full xl:max-w-6xl sm:max-w-xl md:max-w-3xl h-3/4 mt-6 mb-10 p-8 rounded-xl shadow-lg text-black bg-gamboge">
        <h1 className='font-boldTallFont font-semibold text-4xl'>Checkout</h1>
        <div className='flex flex-row space-x-6 bg mt-6'>
        <div className="bg-white rounded-xl">
        <h3 className='font-semibold text-lg mt-6 ml-6'>Select a Payment Method</h3>
        <hr></hr>
        <Radio
        checked={selectedValue === 'credit card'}
        onChange={handleChange}
        value="credit card"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'Credit Card' }}
      />
      Credit Card
      <Radio
        checked={selectedValue === 'cash on delivery'}
        onChange={handleChange}
        value="cash on delivery"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'Cash On Delivery' }}
        style={{marginLeft:"20rem"}}
      />
      Cash on Delivery
        <img src="https://www.pngitem.com/pimgs/m/1-15888_transparent-visa-master-png-logo-visa-png-2019.png"  alt="Famous five book" className=" w-40 h-15 ml-10"></img>
      
        <p className='mt-6 ml-6 text-white'>
        Line 33:15:  Redundant alt attribute. Screen-readers already announce `img` tags as an image. 
        You don’t need to use the words `image`, `photo,` or `picture` 
        (or any specified custom words) in the alt prop
        </p>
        </div>
        <div className="bg-white rounded-xl  w-2/3">
        <h3 className='font-semibold text-lg mt-6 ml-6'>Billing Details</h3>
        <p className='mt-6 ml-6'>
        {address} </p>
        <p className='mt-6 ml-6'>
        Phone number - (+94) {phone}
        </p>
        <Button variant="contained" color="primary" style={{marginLeft:"5.7rem",marginTop:"1rem"}} 
        onClick={()=>{
          setChangeAddressModalOpen(true);
        }}
        >
          Change Address
          </Button>
        </div>
        </div> 
        <div className="flex flex-col space-y-6 mt-6">
        <div className="bg-white rounded-xl" >
        <h3 className='font-semibold text-lg mt-6 ml-6'>Order Summary</h3>
        {orderHistory.map((x) =>{
          return(
              <>
              <div className="flex flex-row grid-rows-2 ml-48">
              <div>
              <p className='mt-6 ml-6'>{x.bookName}</p>
              </div>
              <div className='mt-6 ml-96'>
              <p>{totalAmount}</p>
              </div>
              </div>
              <div className="flex flex-row grid-rows-2 ml-48">
              <div>
              <p className='mt-6 ml-6'>quantity</p>
              </div>
              <div className='mt-6' style={{marginLeft:"22rem"}}>
              <p>{x.quantity}</p>
              </div>
              </div>
              <div className="flex flex-row grid-rows-2 ml-48">
              <div>
              <p className='mt-6 ml-6 font-bold'>Delivery Fee</p>
              </div>
              <div className='mt-6 ml-80'>
              <p className='ml-2 font-bold'>200</p>
              </div>
              </div>
              <div className="flex flex-row grid-rows-2 ml-48">
              <div>
              <p className='mt-6 ml-6 font-bold'>Total Price</p>
              </div>
              <div className='mt-6' style={{marginLeft:"20.6rem"}}>
              <p className='ml-2 font-bold'>{totalAmount+200}</p>
              </div>
              </div>
              <div  className="flex flex-row grid-rows-2 mt-3 mb-3" style={{marginLeft:"23rem"}}>
              <button
                    type="submit"
                    className="focus:outline-none bg-blueSapphire text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12 font-bold text-white"
                    style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }} 
                    onClick={()=>{
                      placeNewOrder(x.productID,x.quantity,x.bookName);
                     
                    }}
                  >
                    Confirm Purchase
                  </button>
              </div>
              </>
          );
        })}
          
          
         
           
      
        </div>
        </div>   
        </div>
        {changeAddressModalOpen && (
          <ChangeAddressModal
          modalVisible={changeAddressModalOpen}
          setModalVisible={setChangeAddressModalOpen}
          cusAddress = {address} 
          />
        )}
        {visaCardModalOpen && (
          <VisaCardModal
          modalVisible={visaCardModalOpen}
          setModalVisible={setVisaCardModalOpen}
          orHistory = {orderHistory}
          totAmount ={totalAmount}
          />
        )
        }
        </div>
        <Footer />
        </React.Fragment>
    );
};

export default Checkout;

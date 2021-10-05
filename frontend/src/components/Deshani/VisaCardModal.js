import React,{useState} from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";


const validationSchema = Yup.object({
    cardnumber: Yup.number().required("Card Number is required"),
    expiryMonth: Yup.number().required("Expiry Month is required"),
    expiryYear:Yup.number().required("Expiry Year is required"),
    cvv:Yup.number().required("CVV number is required")
})
const VisaCardModal = ({modalVisible,setModalVisible,orHistory,totAmount}) => {

    // const [proID,setProID] = useState("");
    // const [qty,setQty] = useState("");
    const placeNewOrder = async () => {
        // for(let i=0;i<orHistory.length;i++){
        //     setProID(orHistory[i].productID);
        //     setQty(orHistory[i].)
        // }
        let reqObj = {
          billAmount: totAmount,
          orderData: orHistory
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
              window.location.href="/order-success";
            })
            .catch((err) => {
              alert("Error -" + err);
            });
        } catch (error) {
          alert("Error occured!!! : " + error);
        }
      };
    
    return (
        <div>
        <Modal
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        center
        styles={{
          modal: {
            border: "3px solid  black",
            borderRadius: "8px",
            maxWidth: "500px",
            width: "50%",
          },
        }}
        focusTrapped={true}
      >
        <div className="px-2 pt-8 pb-4 md:pb-7 md:px-8">
          <Formik
            initialValues={{ cardnumber: '',expiryMonth:'',expiryYear:'',cvv:''}}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log(values);
              placeNewOrder();
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex flex-col mb-6">
                <h1 className="mb-5 font-bold text-2xl">Enter Card Details</h1>
                  <div className="pb-6 md:pr-3 md:mb-0 w-full">
                  <div className="flex flex-row  space-x-4  mb-2 md:mb-6">
                    <label
                      className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                      htmlFor={"cardnumber"}
                    >
                      Card Number
                    </label>
                    <input
                    className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                      errors.cardnumber && touched.cardnumber
                        ? "border-red-500"
                        : "border-gray-600"
                    }  text-base`}
                      id="cardnumber"
                      type="text"
                      onChange={handleChange("cardnumber")}
                      value={values.cardnumber}
                      placeholder="374245455400126"
                    />
                    </div>
                    {errors.cardnumber && touched.cardnumber ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm ml-24">
                        {errors.cardnumber}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-row  space-x-4  mb-2 md:mb-6">
                  <label
                  className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                  htmlFor={"expiryMonth"}
                >
                  Expiry Date
                </label>
                <input
                className={`focus:outline-none w-10 h-7 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                  errors.expiryMonth && touched.expiryMonth
                    ? "border-red-500"
                    : "border-gray-600"
                }  text-base`}
                  id="expiryDate"
                  type="text"
                  placeholder="MM"
                  onChange={handleChange("expiryMonth")}
                  value={values.expiryMonth}
                  style={{marginLeft:"1.9rem"}}
                />
                {errors.expiryMonth && touched.expiryMonth ? (
                    <div className="text-red-500 text-xs mt-1 md:text-sm ml-24">
                      {errors.expiryMonth}
                    </div>
                  ) : null}
                <label>/</label>
                <input
                className={`focus:outline-none w-10 h-7 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                  errors.expiryYear && touched.expiryYear
                    ? "border-red-500"
                    : "border-gray-600"
                }  text-base`}
                  id="expiryDate"
                  type="text"
                  placeholder="YY"
                  onChange={handleChange("expiryYear")}
                  value={values.expiryYear}
                />
                {errors.expiryYear && touched.expiryYear ? (
                    <div className="text-red-500 text-xs mt-1 md:text-sm ml-24">
                      {errors.expiryYear}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-row  space-x-4 mt-3  mb-2 md:mb-6">
                <label
                  className="block text-sm font-medium leading-149 mb-3 md:text-lg "
                  htmlFor={"cvv"}
                >
                  CVV 
                </label>
                <input
                className={`focus:outline-none w-20 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange mr-10  ${
                  errors.cvv && touched.cvv
                    ? "border-red-500"
                    : "border-gray-600"
                }  text-base`}
                  id="expiryDate"
                  type="text"
                  placeholder="123"
                  onChange={handleChange("cvv")}
                  value={values.cvv}
                  style={{marginLeft:"4.5rem"}}
                />
                </div>
                {errors.cvv && touched.cvv ? (
                    <div className="text-red-500 text-xs mt-1 md:text-sm ml-24">
                      {errors.cvv}
                    </div>
                  ) : null}
                </div>
                
                <div className="flex flex-row  space-x-2  text-center mb-4 md:mb-6">
                  <button
                    type="submit"
                    className="focus:outline-none bg-yellow-500 text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12"
                    style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }}
                  >
                    Confirm Purchase
                  </button>
                  <button
                  type="submit"
                  className="focus:outline-none bg-gray-400 text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12"
                  style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }}
                  onClick={() => {
                    setModalVisible(false);
                  }}
                >
                  Cancel
                </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
        </div>
    )
}

export default VisaCardModal;

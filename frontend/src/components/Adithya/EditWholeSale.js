import React from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";

const validationSchema = Yup.object({
  shopName: Yup.string().trim().uppercase().required("Shop Name is required"),
  oderdate: Yup.string().trim().required("Date is required"),
  payment: Yup.number().required("Payment is required"),
  paymentStatus: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const EditWholeSale = ({ setModalVisible, modalVisible }) => {
  return (
    <Modal
      open={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      center
      styles={{
        modal: {
          border: "1px solid  gray",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "50%",
        },
      }}
      focusTrapped={true}
    >
      <div className="px-4 pt-6 pb-4 ">
        <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
          Update Invoice Details
        </h6>
        <hr></hr>

        <Formik
          initialValues={{
            shopName: "",
            oderdate: "",
            payment: "",
            paymentStatus: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <div className="grid grid-rows-7 gap-y-2 mt-2 justify-center ml-2">
                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label
                      className="block text-sm font-medium leading-149  md:text-lg"
                      htmlFor={"shopName"}
                    >
                      Shop Name :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                        errors.shopName && touched.shopName
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="shopName"
                      type="text"
                      placeholder="User Name"
                      onChange={handleChange("shopName")}
                      value={values.shopName}
                    />
                    {errors.shopName && touched.shopName ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.shopName}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label
                      className="block text-sm font-medium leading-149  md:text-lg"
                      htmlFor={"oderdate"}
                    >
                      Oder Date :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                        errors.oderdate && touched.oderdate
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="oderdate"
                      type="Date"
                      placeholder="dd/mm/yyyy"
                      onChange={handleChange("oderdate")}
                      value={values.oderdate}
                    />
                    {errors.oderdate && touched.oderdate ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.oderdate}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label className="block text-sm font-medium leading-149  md:text-lg ">
                      Payment :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                        errors.payment && touched.payment
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="payment"
                      type="Number"
                      placeholder="Rs.00.00"
                      onChange={handleChange("payment")}
                      value={values.payment}
                    />
                    {errors.payment && touched.payment ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.payment}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label
                      className="block text-sm font-medium leading-149  md:text-lg"
                      htmlFor={"province"}
                    >
                      Payment Status :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <select
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                        errors.paymentStatus && touched.paymentStatus
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="province"
                      type="text"
                      onChange={handleChange("paymentStatus")}
                      value={values.paymentStatus}
                    >
                      <option value="" disabled selected>
                        Select your option
                      </option>

                      <option value="CP">prepareing</option>
                      <option value="EP">process</option>
                    </select>
                    {errors.paymentStatus && touched.paymentStatus ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.paymentStatus}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="text-center mb-0 mt-6">
                <button
                  type="submit"
                  class="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
                  style={{
                    boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditWholeSale;

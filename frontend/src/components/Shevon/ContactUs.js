import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required"),
  mobileNum: Yup.number()
    .min(10, "InValid Number")
    .required("Mobile Number is required"),
  department: Yup.string().required("Department is required"),
  message: Yup.string().required("Message is required"),
});

const ContactUs = () => {
  const addinquir = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:6500/matrix/api/deliveryManager/addinquir",
        {
          email: values.email,
          mobileNumber: values.mobileNum,
          department: values.department,
          description: values.message,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 mt-4 mx-16 rounded-xl  border-0  shadow-md bg-blueSapphire bg-opacity-10">
        <div className="rounded-l-xl mr-2 mx-4 my-4 border-0  shadow-md bg-white">
          <h6 className="ml-4 mt-2 mb-2 font-black text-2xl">Inquire Form</h6>
          <h6 className="ml-4  mb-2 text-gray-400 font-black text-sm">
            We will get in touch with you shortly.
          </h6>
          <hr></hr>
          <div className="px-2 pt-6 pb-2 md:pb-7 md:px-8">
            <Formik
              initialValues={{
                email: "",
                mobileNum: "",
                department: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                console.log(values);
                addinquir(values);
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="flex flex-col mb-4">
                    <div className="flex ">
                      <div className=" ml-6 flex-initial">
                        <label
                          className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                          htmlFor={"email"}
                        >
                          Email
                        </label>
                      </div>
                      <div
                        className="flex-initial"
                        style={{ marginLeft: "108px" }}
                      >
                        <input
                          className={`focus:outline-none w-96 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                            errors.email && touched.email
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="email"
                          type="text"
                          placeholder="John@cargils.com"
                          onChange={handleChange("email")}
                          value={values.email}
                          style={{ width: "410px" }}
                        />
                        {errors.email && touched.email ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex mt-8">
                      <div className=" ml-6 flex-initial">
                        <label className="block text-sm font-medium leading-149 mb-3 md:text-lg">
                          Mobile Number
                        </label>
                      </div>
                      <div
                        className="flex-initial  "
                        style={{ marginLeft: "48px" }}
                      >
                        <input
                          className={`focus:outline-none w-96 h-8 pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver ${
                            errors.mobileNum && touched.mobileNum
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="mobileNum"
                          type="Number"
                          placeholder="7712345678"
                          onChange={handleChange("mobileNum")}
                          value={values.mobileNum}
                          style={{ width: "410px" }}
                        />
                        {errors.mobileNum && touched.mobileNum ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.mobileNum}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex mt-8">
                      <div className=" ml-6 flex-initial">
                        <label
                          className=" block text-sm font-medium leading-149 mb-3 md:text-lg"
                          htmlFor={"department"}
                        >
                          Department
                        </label>
                      </div>
                      <div
                        className="flex-initial"
                        style={{ marginLeft: "70px" }}
                      >
                        <select
                          className={`focus:outline-none w-96 h-8 pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver ${
                            errors.department && touched.department
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="department"
                          type="text"
                          onChange={handleChange("department")}
                          style={{ width: "410px" }}
                          defaultValue={"DEFAULT"}
                        >
                          <option value="DEFAULT" disabled>
                            Select your option
                          </option>
                          <option value="Account">Accounts Department</option>
                          <option value="Delivery">Delivery Department</option>
                          <option value="management">Management</option>
                        </select>

                        {errors.department && touched.department ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.department}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex mt-8">
                      <div className=" ml-6 flex-initial">
                        <label
                          className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                          htmlFor={"email"}
                        >
                          Your Message
                        </label>
                      </div>
                      <div className="flex-initial ml-14">
                        <textarea
                          className={`focus:outline-none  h-28 pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver  ${
                            errors.message && touched.message
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="message"
                          type="Textarea"
                          placeholder="Enter Your message"
                          onChange={handleChange("message")}
                          value={values.message}
                          style={{ width: "410px" }}
                        />
                        {errors.message && touched.message ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.message}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-4 mt-10">
                    <button
                      type="submit"
                      className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
                      style={{
                        boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>

        <div
          className="rounded-r-xl  bg-blue-400  ml-2 px-0 py-0  border-0  shadow-md bg-cover bg-center "
          style={{
            backgroundImage: `url("https://i.ibb.co/dL1WkDv/ww.jpg" )`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ContactUs;

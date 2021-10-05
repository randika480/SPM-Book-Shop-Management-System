import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object({
  userName: Yup.string().trim().uppercase().required("User Name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Please enter a valid password (min. 6 chars)")
    .required("Password is required"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  mobileNum: Yup.number()
    .positive()
    .integer()
    .min(10, "Please enter a valid phone number")
    .required("Phone number is required"),
});

const AddDPersonModal = ({
  setModalVisible,
  modalVisible,
  setSelectedRows,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [failAdded, setfailAdded] = useState(false);

  const addDperson = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:6500/matrix/api/auth/deliveryperson",
        {
          username: values.userName,
          email: values.email,
          password: values.confirmpassword,
          phone: values.mobileNum,
        }
      );
      setSelectedRows((selectedRows) => [
        ...selectedRows,
        {
          no: selectedRows.length + 1,
          userId: response.data.deliveryPerson._id,
          name: values.userName,
          email: values.email,
          mobile: values.mobileNum,
        },
      ]);
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);

      console.log(response);
      setIsAdded(true);
    } catch (error) {
      console.log(error);
      setfailAdded(true);
    }
  };

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
          Register New User
        </h6>
        <hr></hr>

        <Formik
          initialValues={{
            userName: "",
            email: "",
            mobileNum: "",
            password: "",
            confirmpassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
            addDperson(values);
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
                      htmlFor={"userName"}
                    >
                      UserName :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                        errors.userName && touched.userName
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="userName"
                      type="text"
                      placeholder="User Name"
                      onChange={handleChange("userName")}
                      value={values.userName}
                    />
                    {errors.userName && touched.userName ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.userName}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label
                      className="block text-sm font-medium leading-149  md:text-lg"
                      htmlFor={"email"}
                    >
                      Email :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="email"
                      type="text"
                      placeholder="John@cargils.com"
                      onChange={handleChange("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label className="block text-sm font-medium leading-149  md:text-lg ">
                      Mobile Number :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                        errors.mobileNum && touched.mobileNum
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="mobileNum"
                      type="Number"
                      placeholder="7712345678"
                      onChange={handleChange("mobileNum")}
                      value={values.mobileNum}
                    />
                    {errors.mobileNum && touched.mobileNum ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.mobileNum}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">Password :</div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2  border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="password"
                      type="password"
                      placeholder="*********"
                      onChange={handleChange("password")}
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">Confirm Password :</div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                        errors.confirmpassword && touched.confirmpassword
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="confirmpassword"
                      type="password"
                      placeholder="Re-enter password"
                      onChange={handleChange("confirmpassword")}
                      value={values.confirmpassword}
                    />
                    {errors.confirmpassword && touched.confirmpassword ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.confirmpassword}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {isAdded && <Alert severity="success">Successfully added</Alert>}
              {failAdded && (
                <Alert severity="error">
                  {values.destination} Delivery Person already exists
                </Alert>
              )}
              <div className="text-center mb-0 mt-6">
                <button
                  type="submit"
                  className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
                  style={{
                    boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                  }}
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddDPersonModal;

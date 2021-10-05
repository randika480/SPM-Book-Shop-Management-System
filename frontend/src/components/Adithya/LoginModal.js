import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Please enter a valid password (min. 6 chars)")
    .required("Password is required"),
});

const LoginModal = ({ setModalVisible, modalVisible }) => {
  //login configurations
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal
      open={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      center
      styles={{
        modal: {
          border: "2px solid  black",
          borderRadius: "8px",
          maxWidth: "300px",
          width: "50%",
        },
      }}
      focusTrapped={true}
    >
      <div className="px-2 pt-8 pb-4 md:pb-7 md:px-8">
        <Formik
          initialValues={{ email: "", password: "", role: "customer" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
            await axios
              .post("http://localhost:6500/matrix/api/auth/login", values)
              .then((res) => {
                localStorage.setItem("authToken", res.data.token);
                localStorage.setItem("userRole", res.data.user.role);
                setIsLoading(false);
                if (res.data.user.role === "customer") {
                  window.location = `/customer`;
                }
              })
              .catch((err) => {
                alert("Unauthorized access detected!");
                window.location = "/";
              });
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setIsLoading(true);
                handleSubmit();
              }}
            >
              <div className="flex flex-col mb-6">
                <div className="pb-6 md:pr-3 md:mb-0 w-full">
                  <label
                    className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                    htmlFor={"email"}
                  >
                    Email
                  </label>
                  <input
                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
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
                <div className="pb-6 md:pr-3 md:mb-0 w-full">
                  <label
                    className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                    htmlFor={"password"}
                  >
                    Password
                  </label>
                  <input
                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
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
              <div className="text-center mb-4 md:mb-6">
                {isLoading ? (
                  <ScaleLoader />
                ) : (
                  <button
                    type="submit"
                    className="focus:outline-none bg-yellow-500 text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12"
                    style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }}
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default LoginModal;

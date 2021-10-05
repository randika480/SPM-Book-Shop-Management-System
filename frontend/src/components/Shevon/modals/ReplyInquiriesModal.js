import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const ReplyInquiriesModal = ({
  setModalVisible,
  modalVisible,
  rowid,
  getemail,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const addreply = async (values) => {
    try {
      await axios.put(
        "http://localhost:6500/matrix/api/deliveryManager/addreply",
        {
          InquirID: rowid,
          replynote: values.message,
          email: getemail,
        }
      );

      setTimeout(() => {
        setModalVisible(false);
      }, 3000);

      setIsAdded(true);
    } catch (error) {
      console.log(error);
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
      <div className="px-4 pt-6 pb-4 md:pb-7 md:px-8">
        <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
          Reply For Inquiries
        </h6>
        <hr></hr>

        <Formik
          initialValues={{ email: getemail, message: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
            addreply(values);
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mt-2 ">
                <div className="grid grid-cols-4 px-2 py-2">
                  <div className="  ">
                    <label
                      className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                      htmlFor={"email"}
                    >
                      Email :
                    </label>
                  </div>

                  <div className=" col-span-3 ml-1">
                    <input
                      className={`focus:outline-none  h-8 w-full pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver  ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="email"
                      type="text"
                      placeholder="Enter email"
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

                <div className="grid grid-cols-4 px-2 py-2">
                  <div className="  ">
                    <label
                      className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                      htmlFor={"message"}
                    >
                      Message :
                    </label>
                  </div>

                  <div className="  col-span-3 ml-1">
                    <textarea
                      className={`focus:outline-none  h-32 w-full pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver  ${
                        errors.message && touched.message
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="message"
                      type="Textarea"
                      placeholder="Enter message"
                      onChange={handleChange("message")}
                      value={values.message}
                    />
                    {errors.message && touched.message ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.message}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {isAdded && (
                <Alert severity="success">Successfully Send Email</Alert>
              )}
              <div className="text-center mb-0 mt-4">
                <button
                  type="submit"
                  className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
                  style={{
                    boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default ReplyInquiriesModal;

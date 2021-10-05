import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

import * as Yup from "yup";
import { Formik } from "formik";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/[A-Z]/, "First letter should be capitalized")
    .required("User Name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),

  mobileNum: Yup.number()
    .positive()
    .integer()
    .min(10, "Please enter a valid phone number")
    .required("Phone number is required"),
  encImg: Yup.string().required("Required"),
});

const EditDpProfileModal = ({ setModalVisible, modalVisible }) => {
  const [file, setFile] = useState("");
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
          Edit profile Informations
        </h6>
        <hr></hr>

        <Formik
          initialValues={{ name: "", email: "", mobileNum: "", encImg: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (file[0] !== undefined) {
                  values.encImg = file[0].getFileEncodeDataURL();
                  handleSubmit();
                } else {
                  alert("Please Upload Cover Image");
                }
              }}
            >
              <div className="grid 2 gap-2">
                <div>
                  <div className=" grid w-50 p-1 h-20 float-center m-auto">
                    <div className=" border-lightSilver rounded-2xl border-4 m-1">
                      <FilePond
                        files={file}
                        onupdatefiles={setFile}
                        allowMultiple={false}
                        allowFileEncode={true}
                        maxFiles={1}
                        name="files"
                        credits={false}
                        labelIdle="Upload profile picture"
                        allowFileTypeValidation={true}
                        acceptedFileTypes={["image/*"]}
                        labelFileTypeNotAllowed={
                          "Please import valid profile picture"
                        }
                        allowImagePreview
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className=" gap-y-2 mt-0 justify-center ml-2">
                    <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                      <div className=" my-1">
                        <label
                          className="block text-sm font-medium leading-149  md:text-lg"
                          htmlFor={"userName"}
                        >
                          FullName :
                        </label>
                      </div>
                      <div className=" col-span-2">
                        <input
                          className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                            errors.name && touched.name
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="name"
                          type="text"
                          placeholder="Full Name"
                          onChange={handleChange("name")}
                          value={values.name}
                        />
                        {errors.name && touched.name ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.name}
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
                  </div>

                  <div className="text-center mb-0 mt-6">
                    <button
                      type="submit"
                      className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
                      style={{
                        boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditDpProfileModal;

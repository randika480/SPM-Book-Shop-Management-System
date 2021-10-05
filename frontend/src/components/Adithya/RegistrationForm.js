import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import PulseLoader from "react-spinners/PulseLoader";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

const validationSchema = Yup.object({
  username: Yup.string().trim().uppercase().required("User Name is required"),
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
  address: Yup.string().trim().required("Address is required"),
  phone: Yup.number()
    .positive()
    .integer()
    .min(10, "Please enter a valid phone number")
    .required("Phone number is required"),
  agreement: Yup.bool().oneOf(
    [true],
    "Please accept the agreement before proceeding"
  ),
});

const RegistrationForm = () => {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <div className="m-1">REGISTRATION</div>
        </Grid>
        <Hidden only={["md", "lg", "xl"]}>
          <Grid item xs={12} md={6}>
            <div className="border border-lightSilver rounded-2xl border-8 m-1">
              <FilePond
                onupdatefiles={setFile}
                allowMultiple={false}
                allowFileEncode={true}
                maxFiles={1}
                name="files"
                credits={false}
                labelIdle="Drag & Drop your files or click to Browse"
                allowFileTypeValidation={true}
                acceptedFileTypes={["image/*"]}
                labelFileTypeNotAllowed={"Please import valid profile picture"}
                required
                allowImagePreview
                className="border rounded-2xl"
                imagePreviewMinHeight={350}
              />
            </div>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmpassword: "",
              address: "",
              phone: "",
              agreement: false,
              ppEnc: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await axios
                .post("http://localhost:6500/matrix/api/auth/customer", values)
                .then((res) => {
                  console.log(res.data);
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsLoading(true);
                  if (file[0] !== undefined) {
                    values.ppEnc = file[0].getFileEncodeDataURL();
                    handleSubmit();
                  } else {
                    setIsLoading(false);
                    alert("Please Upload Cover Image");
                  }
                }}
              >
                <div className="m-1 lg:pl-6">
                  <Grid item xs={12} sm={9}>
                    <div className="lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"username"}
                      >
                        Username
                      </label>
                      <input
                        className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                          errors.username && touched.username
                            ? "border-red-500"
                            : "border-gray-600"
                        } text-base`}
                        id="username"
                        type="text"
                        placeholder="Enter you username"
                        onChange={handleChange("username")}
                        value={values.username}
                      />
                      {errors.username && touched.username ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.username}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className="lg:my-10 md:my-9 sm:my-6">
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
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className="lg:my-10 md:my-9 sm:my-6">
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
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className="lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"confirmpassword"}
                      >
                        Confirm Password
                      </label>
                      <input
                        className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
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
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className=" lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"address"}
                      >
                        Address
                      </label>
                      <input
                        className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                          errors.address && touched.address
                            ? "border-red-500"
                            : "border-gray-600"
                        } text-base`}
                        id="address"
                        type="text"
                        placeholder="Enter you delivery address"
                        onChange={handleChange("address")}
                        value={values.address}
                      />
                      {errors.address && touched.address ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.address}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className=" lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"phone"}
                      >
                        Phone
                      </label>
                      <input
                        className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                          errors.phone && touched.phone
                            ? "border-red-500"
                            : "border-gray-600"
                        } text-base`}
                        id="phone"
                        type="number"
                        placeholder="Enter you contact number"
                        onChange={handleChange("phone")}
                        value={values.phone}
                      />
                      {errors.phone && touched.phone ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.phone}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div>
                      <label>
                        <input
                          className={`focus:outline-none mr-4 border-b focus:border-blue-900 ${
                            errors.agreement && touched.agreement
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="agreement"
                          type="checkbox"
                          onChange={handleChange("agreement")}
                          value={values.agreement}
                        />
                        Do you agree with our privacy policies
                      </label>
                      {errors.agreement && touched.agreement ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.agreement}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className=" lg:my-10 md:my-9 sm:my-6">
                      {isLoading ? (
                        <PulseLoader loading={isLoading} size={12} />
                      ) : (
                        <button
                          type="submit"
                          className="focus:outline-none bg-yellow-500 text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12"
                          style={{
                            boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                          }}
                        >
                          SIGN UP
                        </button>
                      )}
                    </div>
                  </Grid>
                </div>
              </form>
            )}
          </Formik>
        </Grid>
        <Hidden only={["xs", "sm"]}>
          <Grid item xs={12} md={5}>
            <div className="mt-10">
              <FilePond
                onupdatefiles={setFile}
                allowMultiple={false}
                allowFileEncode={true}
                maxFiles={1}
                name="files"
                credits={false}
                labelIdle="Drag & Drop your files or click to Browse"
                allowFileTypeValidation={true}
                acceptedFileTypes={["image/*"]}
                labelFileTypeNotAllowed={"Please import valid profile picture"}
                required
                allowImagePreview
                className="border-8 border-lightSilver rounded-2xl"
                imagePreviewMinHeight={350}
              />
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default RegistrationForm;

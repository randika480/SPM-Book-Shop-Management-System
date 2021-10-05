import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

const validationSchema = Yup.object({
  role: Yup.string(),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Please enter a valid password (min. 6 chars)")
    .required("Password is required"),
});
const AdminLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="my-32">
      <Formik
        initialValues={{ email: "", password: "", role: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          await axios
            .post("http://localhost:6500/matrix/api/auth/login", values)
            .then((res) => {
              localStorage.setItem("authToken", res.data.token);
              localStorage.setItem("userRole", res.data.user.role);
              setIsLoading(false);
              if (res.data.user.role === "inventoryManager") {
                window.location = `/inventory`;
              } else if (res.data.user.role === "admin") {
                window.location = `/admin`;
              } else if (res.data.user.role === "deliveryManager") {
                window.location = `/delivery`;
              } else if (res.data.user.role === "deliveryPerson") {
                window.location = `/courier`;
              } else {
                window.location = `/admin-login`;
              }
            })
            .catch((err) => {
              alert("Unauthorized access detected!");
              window.location = "/admin-login";
            });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col mb-6 text-center items-center">
              <FormControl component="fieldset" style={{ marginBottom: "3vh" }}>
                <FormLabel component="legend">
                  Administration Acc. Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio required={true} />}
                    label="Admin"
                    id="role"
                    onChange={handleChange("role")}
                  />
                  <FormControlLabel
                    value="inventoryManager"
                    control={<Radio required={true} />}
                    label="Inventory Manager"
                    id="role"
                    onChange={handleChange("role")}
                  />
                  <FormControlLabel
                    value="deliveryManager"
                    control={<Radio required={true} />}
                    label="Delivery Manager"
                    id="role"
                    onChange={handleChange("role")}
                  />
                  <FormControlLabel
                    value="deliveryPerson"
                    control={<Radio required={true} />}
                    label="Delivery Person"
                    id="role"
                    onChange={handleChange("role")}
                  />
                </RadioGroup>
              </FormControl>

              <div className="pb-6 md:pr-3 md:mb-0 w-1/5">
                <TextField
                  variant="outlined"
                  label="Email"
                  id="email"
                  fullWidth
                  type="text"
                  InputLabelProps={{ style: { fontWeight: 600 } }}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="pb-6 md:pr-3 md:mb-0 w-1/5">
                <TextField
                  variant="outlined"
                  label="Password"
                  id="password"
                  fullWidth
                  type="password"
                  InputLabelProps={{ style: { fontWeight: 600 } }}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div className="mb-4 md:mb-6">
                {isLoading ? (
                  <ScaleLoader />
                ) : (
                  <button
                    type="submit"
                    className=" bg-yellow-500 text-snow-900 text-base rounded hover:bg-yellow-600 w-64 h-10 sm:w-80 sm:h-12"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdminLoginForm;

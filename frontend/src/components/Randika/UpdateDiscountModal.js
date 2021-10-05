import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import Icon from "@material-ui/core/Icon";

const validationSchema = Yup.object({
  lable: Yup.string()
    .trim()
    .uppercase()
    .required("Discount Lable  is required"),
  regularPercentage: Yup.number()
    .positive()
    .integer()
    .min(1, "Please enter a valid percentage")
    .required("Regular Percentage number is required"),
  bulkPercentage: Yup.number()
    .positive()
    .integer()
    .min(1, "Please enter a valid percentage")
    .required("Bulk Percentage is required"),
});

const SampleNewsletterModal = ({
  setModalVisible,
  modalVisible,
  setDiscountlable,
  bulkPercentage,
  regularPercentage,
  bookID,
  removeModalOpen,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const removeDiscount = async () => {
    let dataObject = {
      BID: bookID,
    };

    try {
      await axios
        .put(
          "http://localhost:6500/matrix/api/admin/removeDiscounts",
          dataObject
        )
        .then(() => {
          setIsAdded(true);
          setTimeout(() => {
            setModalVisible(false);
            window.location.reload(false);
          }, 3000);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const updateDiscount = async (values) => {
    let dataObject = {
      regular: values.regularPercentage,
      bulk: values.bulkPercentage,
      label: values.lable.toUpperCase(),
      BID: bookID,
    };

    try {
      await axios
        .put(
          "http://localhost:6500/matrix/api/admin/updateDiscounts",
          dataObject
        )
        .then(() => {
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
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
          //   border: "3px solid  black",
          borderRadius: "10px",
          maxWidth: "500px",
          width: "100%",
          marginTop: "5vw",
        },
      }}
      focusTrapped={true}
    >
      {!removeModalOpen && (
        <div className="m-auto">
          <h1 className="font-bold text-lg font-boldTallFont">
            Update Discount
          </h1>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={12}>
              <div>
                <div className="w-full  h-auto mb-5 bg-lightSilver m-auto">
                  <div className="w-full m-auto mt-5 bg-white p-5 rounded-lg shadow-lg">
                    <div className="mt-4">
                      <Formik
                        initialValues={{
                          lable: setDiscountlable,
                          regularPercentage: regularPercentage,
                          bulkPercentage: bulkPercentage,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                          updateDiscount(values);
                        }}
                      >
                        {({
                          handleChange,
                          handleSubmit,
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
                            <Grid container spacing={2}>
                              <Grid item md={4}>
                                <div>
                                  <h1 className="text-l text-left text-black font-bold mb-5 ">
                                    Regular Percentage
                                  </h1>
                                </div>
                              </Grid>
                              <Grid item md={6}>
                                <div>
                                  <input
                                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                      errors.regularPercentage &&
                                      touched.regularPercentage
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="regularPercentage"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("regularPercentage")}
                                    value={values.regularPercentage}
                                  />
                                  {errors.regularPercentage &&
                                  touched.regularPercentage ? (
                                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                                      {errors.regularPercentage}
                                    </div>
                                  ) : null}
                                </div>
                              </Grid>
                              <Grid item md={4}>
                                <div>
                                  <h1 className="text-l text-left text-black font-bold mb-5">
                                    Bulk Percentage
                                  </h1>
                                </div>
                              </Grid>
                              <Grid item md={6}>
                                <div>
                                  <input
                                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                      errors.bulkPercentage &&
                                      touched.bulkPercentage
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="bulkPercentage"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("bulkPercentage")}
                                    value={values.bulkPercentage}
                                  />
                                  {errors.bulkPercentage &&
                                  touched.bulkPercentage ? (
                                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                                      {errors.bulkPercentage}
                                    </div>
                                  ) : null}
                                </div>
                              </Grid>
                              <Grid item md={4}>
                                <div>
                                  <h1 className="text-l text-left text-black font-bold mb-5 ">
                                    lable
                                  </h1>
                                </div>
                              </Grid>
                              <Grid item md={6}>
                                <div>
                                  {" "}
                                  <input
                                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                      errors.lable && touched.lable
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="lable"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("lable")}
                                    value={values.lable}
                                  />
                                  {errors.lable && touched.lable ? (
                                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                                      {errors.lable}
                                    </div>
                                  ) : null}
                                </div>
                              </Grid>

                              <Grid item md={12}>
                                <div className="w-max m-auto">
                                  <button
                                    type="submit"
                                    className="object-center focus:outline-none bg-gamboge text-snow-900 text-base rounded border hover:border-transparent w-32 h-10"
                                    style={{
                                      boxShadow:
                                        "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                      float: "right",
                                      color: "white",
                                    }}
                                  >
                                    ADD
                                  </button>
                                </div>
                              </Grid>
                            </Grid>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      {removeModalOpen && (
        <div className="px-4 pt-6 pb-4 md:pb-7 md:px-8">
          <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
            Remove Discounts
          </h6>
          <hr></hr>
          <div className="text-center text-ferrariRed m-5 ">
            <Icon>
              <HighlightOffOutlinedIcon style={{ fontSize: 60 }} />
            </Icon>
          </div>

          <h6 className="text-center text-lg">
            Do you need to remove discount from this item?? This process cannot
            be undone.
          </h6>
          {isAdded && <Alert severity="success">Discount Removed</Alert>}
          <div className="text-center mt-8 grid grid-cols-2 gap-3">
            <div className="text-right">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  removeDiscount();
                }}
              >
                Agree
              </Button>
            </div>
            <div className="text-left">
              <Button
                autoFocus
                variant="contained"
                onClick={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SampleNewsletterModal;

import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PropagateLoader from "react-spinners/ScaleLoader";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Icon from "@material-ui/core/Icon";
import axios from "axios";

const validationSchema = Yup.object({
  retailShop: Yup.string().trim().uppercase(),
  invoiceId: Yup.string().trim(),
  notes: Yup.string().trim(),
  totalAmount: Yup.number(),
});

const InvoiceEditModal = ({ setModalVisible, modalVisible, invoiceId }) => {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    _id: "",
    retailShop: "",
    invoiceId: "",
    totalAmount: "",
    status: "",
    placedAt: "",
    notes: "",
    items: [],
  });
  const [confirmationModalOpen, setConfirmationModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const getInvoice = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get(
          `http://localhost:6500/matrix/api/inventoryManager/get-invoice/${invoiceId}`,
          config
        )
        .then((res) => {
          setInvoiceData((prevState) => {
            return {
              _id: res?.data?.invoice?._id,
              retailShop: res?.data?.invoice?.retailShop,
              invoiceId: res?.data?.invoice?.invoiceId,
              totalAmount: res?.data?.invoice?.payment.totalAmount,
              status: res?.data?.invoice?.payment.status,
              placedAt: res?.data?.invoice?.placedAt,
              notes: res?.data?.invoice?.notes,
              items: res?.data?.invoice?.items,
            };
          });
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
    getInvoice();
  }, []);

  const deleteInvoiceHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    await axios
      .delete(
        `http://localhost:6500/matrix/api/inventoryManager/delete-invoice/${invoiceData._id}`,
        config
      )
      .then((res) => {
        setIsDeleted(true);
        setTimeout(() => {
          setConfirmationModelOpen(false);
          setModalVisible(false);
        }, [2000]);
      })
      .catch((err) => {
        alert(err?.response?.data?.desc);
      });
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
          {isEdit ? "Update Details" : "Invoice Details"}
        </h6>
        <hr></hr>

        <Formik
          initialValues={{
            _id: "",
            retailShop: "",
            invoiceId: "",
            notes: "",
            totalAmount: "",
            status: "",
            items: [
              {
                productID: "",
                quantity: "",
              },
            ],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            values._id = invoiceData._id;
            if (!values.totalAmount) {
              values.totalAmount = invoiceData.totalAmount;
            }
            if (!values.status) {
              values.status = invoiceData.status;
            }
            if (!values.retailShop) {
              values.retailShop = invoiceData.retailShop;
            }
            if (!values.notes) {
              values.notes = invoiceData.notes;
            }
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
            await axios
              .put(
                "http://localhost:6500/matrix/api/inventoryManager/edit-invoice",
                values,
                config
              )
              .then((res) => {
                setLoading(false);
                alert(res.data.desc);
                resetForm();
                setIsEdit(false);
                setModalVisible(false);
              })
              .catch((err) => {
                setLoading(false);
                alert(err.response.data.desc);
              });
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
                      htmlFor={"retailShop"}
                    >
                      Retail Shop Name :
                    </label>
                  </div>

                  <div className=" col-span-2">
                    {!isEdit && (
                      <div className="my-1 block text-sm font-semibold leading-149  md:text-lg">
                        {invoiceData?.retailShop}
                      </div>
                    )}
                    {isEdit && (
                      <>
                        <input
                          className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                            errors.retailShop && touched.retailShop
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="retailShop"
                          type="text"
                          placeholder={invoiceData?.retailShop}
                          onChange={handleChange("retailShop")}
                          value={values.retailShop}
                        />
                        {errors.retailShop && touched.retailShop ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.retailShop}
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label
                      className="block text-sm font-medium leading-149  md:text-lg"
                      htmlFor={"invoiceId"}
                    >
                      Invoice Id :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    {!isEdit && (
                      <div className="my-1 block text-sm font-semibold leading-149  md:text-lg">
                        {invoiceData?.invoiceId}
                      </div>
                    )}
                    {isEdit && (
                      <>
                        <input
                          className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                            errors.invoiceId && touched.invoiceId
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="invoiceId"
                          type="text"
                          placeholder={invoiceData?.invoiceId}
                          onChange={handleChange("invoiceId")}
                          value={values.invoiceId}
                        />
                        {errors.invoiceId && touched.invoiceId ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.invoiceId}
                          </div>
                        ) : null}{" "}
                      </>
                    )}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label className="block text-sm font-medium leading-149  md:text-lg ">
                      Notes :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    {!isEdit && (
                      <div className="my-1 block text-sm font-semibold leading-149  md:text-lg">
                        {invoiceData?.notes}
                      </div>
                    )}
                    {isEdit && (
                      <>
                        <textarea
                          className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                            errors.notes && touched.notes
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="notes"
                          placeholder={invoiceData?.notes}
                          onChange={handleChange("notes")}
                          value={values.notes}
                        />
                        {errors.notes && touched.notes ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.notes}
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label className="block text-sm font-medium leading-149  md:text-lg ">
                      Total Amount :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    {" "}
                    {!isEdit && (
                      <div className="my-1 block text-sm font-semibold leading-149  md:text-lg">
                        {invoiceData?.totalAmount}
                      </div>
                    )}
                    {isEdit && (
                      <>
                        <input
                          className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                            errors.totalAmount && touched.totalAmount
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="totalAmount"
                          type="number"
                          placeholder={invoiceData?.totalAmount}
                          onChange={handleChange("totalAmount")}
                          value={values.totalAmount}
                        />
                        {errors.totalAmount && touched.totalAmount ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.totalAmount}
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label
                      className="block text-sm font-medium leading-149  md:text-lg"
                      htmlFor={"province"}
                    >
                      Payment Status:
                    </label>
                  </div>
                  <div className="col ">
                    {!isEdit && (
                      <div
                        className={`${
                          (invoiceData?.status === "Pending") | "pending" &&
                          "text-ferrariRed"
                        } ${
                          (invoiceData?.status !== "Pending") | "pending" &&
                          "text-green-900"
                        }  my-1 block text-sm font-semibold leading-149  md:text-lg`}
                      >
                        {invoiceData?.status}
                      </div>
                    )}
                    {isEdit && (
                      <>
                        <FormControl
                          component="fieldset"
                          size="small"
                          style={{ marginBottom: "3vh" }}
                        >
                          <RadioGroup
                            row
                            aria-label="status"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Pending"
                              control={<Radio size="small" required={true} />}
                              label="Pending"
                              id="role"
                              onChange={handleChange("status")}
                            />

                            <FormControlLabel
                              value="Paid"
                              control={<Radio size="small" required={true} />}
                              label="Paid"
                              id="role"
                              onChange={handleChange("status")}
                            />
                          </RadioGroup>
                        </FormControl>
                      </>
                    )}
                  </div>
                  {!isEdit && (
                    <div className="my-2 text-left col-span-3  font-mono text-prussianBlue ">
                      Placed at - {invoiceData.placedAt}
                    </div>
                  )}
                </div>
                {preview && invoiceData ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPreview(false);
                      }}
                      className="text-left  font-mono text-prussianBlue underline"
                    >
                      Hide
                    </button>
                    <textarea
                      className={`focus:outline-none w-full h-24 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      value={JSON.stringify(invoiceData.items, null, 4)}
                      readOnly
                    />
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPreview(true);
                    }}
                    className=" text-left font-mono text-prussianBlue underline"
                  >
                    Show Items
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {isEdit ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEdit(false);
                    }}
                    className="focus:outline-none bg-gray-400 font-semibold text-lg rounded py-2 px-6 mt-4"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                  >
                    CANCEL
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEdit(true);
                    }}
                    className="focus:outline-none bg-gamboge font-semibold text-lg rounded py-2 px-6 mt-4"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                  >
                    EDIT
                  </button>
                )}
                {isEdit ? (
                  <button
                    type="submit"
                    className="focus:outline-none bg-gamboge ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                  >
                    SAVE
                  </button>
                ) : (
                  <button
                    className="focus:outline-none bg-ferrariRed ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setConfirmationModelOpen(true);
                    }}
                  >
                    DELETE
                  </button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
      <Modal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModelOpen(false)}
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
            Delete Invoice
          </h6>
          <hr></hr>
          <div className="text-center text-ferrariRed m-5 ">
            <Icon>
              <HighlightOffOutlinedIcon style={{ fontSize: 60 }} />
            </Icon>
          </div>

          <h6 className="text-center text-lg">
            Do you want to delete these data? This process cannot be undone.
          </h6>
          {isDeleted && (
            <Alert severity="success">Item deleted successfully</Alert>
          )}
          <div className="text-center mt-8 grid grid-cols-2 gap-3">
            <div className="text-right">
              <Button
                variant="contained"
                style={{
                  background: "#EA2300",
                  color: "white",
                  fontWeight: 700,
                }}
                startIcon={<DeleteIcon />}
                onClick={deleteInvoiceHandler}
              >
                Agree
              </Button>
            </div>
            <div className="text-left">
              <Button
                autoFocus
                variant="contained"
                style={{
                  fontWeight: 700,
                }}
                onClick={() => {
                  setConfirmationModelOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default InvoiceEditModal;

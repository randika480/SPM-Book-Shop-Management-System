import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik, FieldArray, ErrorMessage } from "formik";
import PropagateLoader from "react-spinners/ScaleLoader";

import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@material-ui/core/TextField";

const validationSchema = Yup.object({
  retailShop: Yup.string().trim().uppercase().required("Shop Name is required"),
  invoiceId: Yup.string().trim().required("Date is required"),
  notes: Yup.string().trim(),
  totalAmount: Yup.number().required("Amount is required"),
});

const InvoiceAddModal = ({ setModalVisible, modalVisible }) => {
  const [allBooks, setAllBooks] = useState(null);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllBooks = async () => {
      await axios
        .get("http://localhost:6500/matrix/api/inventoryManager/get-books")
        .then((res) => {
          setAllBooks(res?.data?.allBooks);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
    getAllBooks();
  }, []);

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
          New Invoice
        </h6>
        <hr></hr>

        <Formik
          initialValues={{
            retailShop: "",
            invoiceId: "",
            notes: "",
            totalAmount: "",
            items: [
              {
                productID: "ID0",
                quantity: 0,
              },
            ],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
            await axios
              .post(
                "http://localhost:6500/matrix/api/inventoryManager/add-invoice",
                values,
                config
              )
              .then((res) => {
                setLoading(false);
                alert(res.data.desc);
                resetForm();
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
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                        errors.retailShop && touched.retailShop
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="retailShop"
                      type="text"
                      placeholder=""
                      onChange={handleChange("retailShop")}
                      value={values.retailShop}
                    />
                    {errors.retailShop && touched.retailShop ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.retailShop}
                      </div>
                    ) : null}
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
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                        errors.invoiceId && touched.invoiceId
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="invoiceId"
                      type="text"
                      placeholder=""
                      onChange={handleChange("invoiceId")}
                      value={values.invoiceId}
                    />
                    {errors.invoiceId && touched.invoiceId ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.invoiceId}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label className="block text-sm font-medium leading-149  md:text-lg ">
                      Notes :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <textarea
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                        errors.notes && touched.notes
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="notes"
                      placeholder=""
                      onChange={handleChange("notes")}
                      value={values.notes}
                    />
                    {errors.notes && touched.notes ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.notes}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className=" py-2 px-2 grid grid-cols-3 gap-x-2">
                  <div className=" my-1">
                    <label className="block text-sm font-medium leading-149  md:text-lg ">
                      Total Amount :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange ${
                        errors.totalAmount && touched.totalAmount
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="totalAmount"
                      type="number"
                      placeholder="Bill amount"
                      onChange={handleChange("totalAmount")}
                      value={values.totalAmount}
                    />
                    {errors.totalAmount && touched.totalAmount ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.totalAmount}
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
                      Order Items:
                    </label>
                  </div>
                  <div className="py-4 col-span-4 overflow-y-auto max-h-52">
                    <div>
                      <FieldArray name="items">
                        {({ insert, remove, push }) => (
                          <div>
                            {values.items.length > 0 &&
                              values.items.map((item, index) => (
                                <div
                                  className="grid grid-cols-2 gap-2 row mb-4"
                                  key={index}
                                >
                                  <div className="col">
                                    <Box>
                                      <FormControl fullWidth size="small">
                                        <InputLabel id="books">
                                          Books
                                        </InputLabel>
                                        {allBooks?.length > 0 && (
                                          <Select
                                            labelId={`items.${index}.productID`}
                                            id={`items.${index}.productID`}
                                            value={
                                              values.items[index].productID
                                            }
                                            label="Books"
                                            onChange={handleChange(
                                              `items.${index}.productID`
                                            )}
                                          >
                                            {allBooks.map((item) => {
                                              return (
                                                <MenuItem
                                                  key={item._id}
                                                  value={item._id}
                                                >
                                                  {item.publishingTitle}
                                                </MenuItem>
                                              );
                                            })}
                                          </Select>
                                        )}
                                      </FormControl>
                                    </Box>
                                    <ErrorMessage
                                      name={`items.${index}.productID`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>
                                  <div className="col">
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      fullWidth
                                      label="Quantity"
                                      name={`items.${index}.quantity`}
                                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                                        errors.invoiceId && touched.invoiceId
                                          ? "border-red-500"
                                          : "border-gray-600"
                                      } text-base`}
                                      type="number"
                                      onChange={handleChange(
                                        `items.${index}.quantity`
                                      )}
                                    />
                                    <ErrorMessage
                                      name={`items.${index}.quantity`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 space-x-2">
                                    <div className="col">
                                      <button
                                        type="button"
                                        className=" bg-ferrariRed hover:opacity-80 text-md text-white font-bold py-2 px-6 rounded-full"
                                        style={{
                                          boxShadow:
                                            "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                        }}
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                    <div className="col">
                                      {" "}
                                      <button
                                        type="button"
                                        className=" bg-prussianBlue hover:opacity-80 text-md text-white font-bold py-2 px-6 rounded-full"
                                        style={{
                                          boxShadow:
                                            "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                        }}
                                        onClick={() =>
                                          push({ productID: "", quantity: "" })
                                        }
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>
                {preview ? (
                  <>
                    <button
                      onClick={() => {
                        setPreview(false);
                      }}
                      className="text-left  font-mono text-prussianBlue underline"
                    >
                      Hide
                    </button>
                    <textarea
                      className={`focus:outline-none w-full h-24 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      value={JSON.stringify(values.items, null, 4)}
                      readOnly
                    />
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setPreview(true);
                    }}
                    className=" text-left font-mono text-prussianBlue underline"
                  >
                    Show
                  </button>
                )}
              </div>

              <div className="text-center mb-0 mt-6">
                <button
                  type="submit"
                  className=" bg-prussianBlue hover:opacity-80 text-md text-white font-bold py-2 px-6 rounded-full"
                  style={{
                    boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                  }}
                >
                  {!loading ? (
                    "SAVE"
                  ) : (
                    <PropagateLoader loading={loading} height={15} />
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default InvoiceAddModal;

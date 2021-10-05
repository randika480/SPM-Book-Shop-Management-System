import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object({
  dpID: Yup.string().trim().uppercase().required("delivery person is required"),
});

const EditDeliveryStatus = ({
  setModalVisible,
  modalVisible,
  orderID,
  setFetchedRows,
  setSelectedRows,
  selectedRow,
}) => {
  const [setDp, setsetDp] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const getAllDp = async () => {
      await axios
        .get("http://localhost:6500/matrix/api/deliveryManager/getalldp")
        .then((res) => {
          console.log(res.data.DeliveryPerson);
          setsetDp(res.data.DeliveryPerson);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
    getAllDp();
  }, []);

  const updateOrderStatus = async (values) => {
    try {
      await axios.put(
        "http://localhost:6500/matrix/api/deliveryManager/assigndp",
        {
          orderID: orderID,
          dpID: values.dpID,
          deliveryStatus: values.deliveryStatus,
        }
      );
      const filterFunc = (rows) => rows.filter((row) => row.code !== orderID);
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
      setIsAdded(true);
      setFetchedRows(filterFunc);
      setSelectedRows(filterFunc);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDpHistory = async (values) => {
    console.log(selectedRow);
    try {
      await axios.put(
        "http://localhost:6500/matrix/api/deliveryManager/addorder",
        {
          orderID: orderID,
          dpID: values.dpID,
          buyerID: selectedRow.buyerId,
          deliveryAddress: selectedRow.address,
          billAmount: selectedRow.price,
        }
      );
      const filterFunc = (rows) => rows.filter((row) => row.code !== orderID);
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
      setIsAdded(true);
      setFetchedRows(filterFunc);
      setSelectedRows(filterFunc);
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
      <div className="px-4 pt-6 pb-4 ">
        <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
          Update Details
        </h6>
        <hr></hr>

        <Formik
          initialValues={{
            dpID: "",
            deliveryStatus: "inTransit",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
            updateOrderStatus(values);
            updateDpHistory(values);
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
                  <div className=" my-2">
                    <label
                      className="block text-sm font-medium leading-149  md:text-lg"
                      htmlFor={"province"}
                    >
                      Delivery Person :
                    </label>
                  </div>
                  <div className=" col-span-2">
                    <Box>
                      <FormControl fullWidth size="small">
                        <InputLabel id="DeliveryPersonID">
                          DeliveryPersonID
                        </InputLabel>
                        {setDp.length > 0 && (
                          <Select
                            id="dpID"
                            value={values.dpID}
                            label="devlivery Person"
                            onChange={handleChange("dpID")}
                          >
                            {setDp.map((item) => {
                              return (
                                <MenuItem key={item._id} value={item._id}>
                                  {item.username}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        )}
                      </FormControl>
                    </Box>
                  </div>
                </div>
              </div>
              {isAdded && <Alert severity="success">Successfully added</Alert>}

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
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditDeliveryStatus;

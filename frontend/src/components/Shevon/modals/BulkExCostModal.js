import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object({
  bulkexpressprecentage: Yup.number().required(
    "bulkexpressprecentage is required"
  ),
});

const BulkExCostModal = ({
  setModalVisible,
  modalVisible,
  selectbulkExCost,
  setBulkExCost,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const updatePercentage = async (values) => {
    console.log(values);
    try {
      await axios.put(
        "http://localhost:6500/matrix/api/deliveryManager/editprecentage",

        {
          bulkexpressprecentage: values.bulkexpressprecentage,
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
          Update Express Percentage
        </h6>

        <hr></hr>

        <Formik
          initialValues={{ bulkexpressprecentage: selectbulkExCost }}
          validationSchema={validationSchema}
          onSubmit={updatePercentage}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col mb-6 ml-1 mt-10">
                <div className="flex mt-4">
                  <div className=" mx-8 flex-initial">
                    <label className="block text-sm font-medium leading-149 mb-3 md:text-lg">
                      Percentage(%) :
                    </label>
                  </div>
                  <div className="flex-initial" style={{ marginLeft: "20px" }}>
                    <input
                      className={`focus:outline-none w-56 h-8 pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver ${
                        errors.bulkexpressprecentage &&
                        touched.bulkexpressprecentage
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="bulkexpressprecentage"
                      type="Number"
                      placeholder="00.00"
                      onChange={handleChange("bulkexpressprecentage")}
                      value={values.bulkexpressprecentage}
                    />
                    {errors.bulkexpressprecentage &&
                    touched.bulkexpressprecentage ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.bulkexpressprecentage}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {isAdded && (
                <Alert severity="success">This is a success message!</Alert>
              )}

              <div className="text-center mb-4 mt-10">
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

export default BulkExCostModal;

import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object({
  destination: Yup.string()
    .matches(/[A-Z]/, "First letter should be capitalized")
    .required("Destination is required"),
  cost: Yup.number().positive().required("Cost is required"),
});

const AddStationCostModal = ({
  setModalVisible,
  modalVisible,
  setRailWays,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [failAdded, setfailAdded] = useState(false);

  return (
    <Modal
      open={modalVisible}
      onClose={() => {
        setModalVisible(false);
        setIsAdded(false);
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
          Add New Destination Station
        </h6>
        <hr></hr>

        <Formik
          initialValues={{ destination: "", cost: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await axios.put(
                "http://localhost:6500/matrix/api/deliveryManager/addrailway",
                values
              );
              setRailWays((railWays) => [...railWays, { ...values }]);
              setTimeout(() => {
                setModalVisible(false);
              }, 3000);
              setIsAdded(true);
            } catch (error) {
              console.log(error);
              setfailAdded(true);
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col mb-6 ml-1 mt-10">
                <div className="flex ">
                  <div className=" ml-6 flex-initial">
                    <label
                      className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                      htmlFor={"destination"}
                    >
                      Destination :
                    </label>
                  </div>
                  <div className="flex-initial" style={{ marginLeft: "54px" }}>
                    <input
                      className={`focus:outline-none w-56 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange  ${
                        errors.destination && touched.destination
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="destination"
                      type="text"
                      placeholder="Railway station name"
                      onChange={handleChange("destination")}
                      value={values.destination}
                    />
                    {errors.destination && touched.destination ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.destination}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex mt-6">
                  <div className=" ml-6 flex-initial">
                    <label className="block text-sm font-medium leading-149 mb-3 md:text-lg">
                      Cost(Rs) :
                    </label>
                  </div>
                  <div
                    className="flex-initial  "
                    style={{ marginLeft: "72px" }}
                  >
                    <input
                      className={`focus:outline-none w-56 h-8 pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver ${
                        errors.cost && touched.cost
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="cost"
                      type="Number"
                      placeholder="00.00"
                      onChange={handleChange("cost")}
                      value={values.cost}
                    />
                    {errors.cost && touched.cost ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.cost}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {isAdded && <Alert severity="success">Successfully added</Alert>}
              {failAdded && (
                <Alert severity="error">
                  {values.destination} Railway already exists
                </Alert>
              )}
              <div className="text-center mb-4 mt-10">
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

export default AddStationCostModal;

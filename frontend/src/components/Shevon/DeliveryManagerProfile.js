import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import EditDmProfileModal from "./modals/EditDmProfileModal";

const DeliveryManagerProfile = () => {
  const [editDmProfileOpen, setEditDmProfileOpen] = useState(false);
  return (
    <div>
      <Grid item xs={12}>
        <div className=" rounded-xl px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
          <header className="font-contentFont text-4xl mb-3 font-bold text-prussianBlue ">
            Profile Information
          </header>
        </div>
      </Grid>
      <div className="grid grid-row-3">
        <div className="rounded-xl my-1 mx-1 px-5 py-5   shadow-md bg-blueSapphire bg-opacity-10">
          <h6 className="ml-4 mt-0 mb-2 font-black text-lg">
            Personal Details
          </h6>

          <div className="grid grid-row-2">
            <div className="grid grid-cols-3 ">
              <div className="grid grid-rows-3">
                <div className="rounded-l-xl my-1 ml-10 mr-2 px-5 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className="font-black text-blueSapphire text-md">
                    FullName
                  </h6>
                </div>
                <div className="rounded-l-xl my-1 ml-10 mr-2 px-5 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-black text-blueSapphire text-md">
                    Email Address
                  </h6>
                </div>
                <div className="rounded-l-xl my-1 ml-10 mr-2 px-5 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-black text-blueSapphire text-md">
                    Mobile Number
                  </h6>
                </div>
              </div>

              <div className="col-span-2 grid grid-rows-3">
                <div className="rounded-r-xl my-1 mr-20 px-4 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-medium text-md">Shevon Krishmal</h6>
                </div>
                <div className="rounded-r-xl my-1  mr-20 px-4 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-medium text-md">
                    shevonkrishmal1998@gmail.com
                  </h6>
                </div>
                <div className="rounded-r-xl my-1  mr-20 px-4 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-medium text-md">+94776287052</h6>
                </div>
              </div>
            </div>

            <div className="rounded-xl mt-6 mb-0 text-right">
              <button
                className="bg-blueSapphire hover:bg-prussianBlue text-md text-white font-bold py-3 px-8 rounded-full"
                onClick={() => {
                  setEditDmProfileOpen(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl my-1 mx-1 px-5 py-5   shadow-md bg-prussianBlue bg-opacity-20">
          <h6 className="ml-4 mt-0 mb-2 font-black text-lg">Reset Password</h6>

          <div className="grid grid-row-2">
            <div className="grid grid-cols-3 ">
              <div className="grid grid-rows-2">
                <div className="rounded-l-xl my-1 ml-10 mr-2 px-5 py-6 shadow-md bg-white bg-opacity-20">
                  <h6 className="font-black text-blueSapphire text-md">
                    Old Password
                  </h6>
                </div>
                <div className="rounded-l-xl my-1 ml-10 mr-2 px-5 py-6 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-black text-blueSapphire text-md">
                    New Password
                  </h6>
                </div>
              </div>

              <div className="col-span-2 grid grid-rows-2">
                <div className="rounded-r-xl my-1 mr-20 px-4 py-4 shadow-md bg-white bg-opacity-20">
                  <input
                    className=" mx-0  bg-gray-300 appearance-none border-2 border-blueSapphire rounded w-80 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-prussianBlue "
                    id="password"
                    type="password"
                    placeholder="Enter Old Password"
                  ></input>
                </div>
                <div className="rounded-r-xl my-1  mr-20 px-4 py-4 shadow-md bg-white bg-opacity-20">
                  <input
                    className=" mx-0  bg-gray-300 appearance-none border-2 border-blueSapphire rounded w-80 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-prussianBlue"
                    id="newpassword"
                    type="password"
                    placeholder="Enter New Password"
                  ></input>
                </div>
              </div>
            </div>

            <div className=" mt-6 mb-0 text-right">
              <button className="bg-blueSapphire hover:bg-prussianBlue text-md text-white font-bold py-3 px-6 rounded-full">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {editDmProfileOpen && (
        <EditDmProfileModal
          modalVisible={editDmProfileOpen}
          setModalVisible={setEditDmProfileOpen}
        />
      )}
    </div>
  );
};

export default DeliveryManagerProfile;

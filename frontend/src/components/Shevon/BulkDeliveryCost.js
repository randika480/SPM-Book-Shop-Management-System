import React, { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import BulkCostEditModal from "./modals/BulkCostEditModal";
import BulkExCostModal from "./modals/BulkExCostModal";
import Icon from "@material-ui/core/Icon";

const BulkDeliveryCost = () => {
  const [bulkCostEditOpen, setbulkCostEditOpen] = useState(false);
  const [bulkExCostOpen, setBulkExCostEditOpen] = useState(false);

  const [bulkCost, setBulkCost] = useState([]);
  const [selectedBulkCost, setSelectedBulkCost] = useState();

  const [bulkExCost, setBulkExCost] = useState();
  const [selectbulkExCost, setSelectbulkExCost] = useState();

  const getBulk = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/matrix/api/deliveryManager/getCost"
      );
      setBulkCost(response.data.bulkcost);
      setBulkExCost(response.data.bulkexpressprecentage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBulk();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 ">
        <div
          className="rounded-xl   mt-2 mx-0 px-0 py-0  border-0  shadow-md bg-lightSilver bg-opacity-20 overflow-y-auto "
          style={{ height: "490px" }}
        >
          <div className="rounded-xl   my-2 mx-2 px-5 py-5  border-0  shadow-md bg-prussianBlue bg-opacity-20  ">
            <div className="grid grid-cols-2">
              <div>
                <h5 className="text-black mt-2">Express pecentage :</h5>
              </div>
              <div className="font-black ">
                <div className="grid grid-cols-2">
                  <div className="ml-32">
                    <h5 className="mr-14 mt-2"> {bulkExCost}% </h5>
                  </div>
                  <div className="text-right ">
                    <Icon
                      className="mr-2 hover:text-gamboge"
                      onClick={() => {
                        setbulkCostEditOpen(false);
                        setBulkExCostEditOpen(true);
                        setSelectbulkExCost(bulkExCost);
                      }}
                    >
                      <EditIcon />
                    </Icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h5 className="ml-4 mt-8 font-black">Cost per weight(kg)</h5>

          {bulkCost.map((bulkCost, index) => (
            <div
              className="rounded-xl   my-2 mx-2 px-5 py-5  border-0  shadow-md bg-blueSapphire "
              key={index}
            >
              <div className="grid grid-cols-2">
                <div>
                  <h5 className="text-white mt-2">{bulkCost.provincename} :</h5>
                </div>
                <div className="text-white ">
                  <div className="grid grid-cols-2">
                    <div className="ml-32">
                      <h5 className="mr-14 mt-2">Rs.{bulkCost.cost}.00</h5>
                    </div>
                    <div className="text-right">
                      <Icon
                        className="mr-2 hover:text-gamboge"
                        onClick={() => {
                          setBulkExCostEditOpen(false);
                          setbulkCostEditOpen(true);
                          setSelectedBulkCost(bulkCost);
                        }}
                      >
                        <EditIcon />
                      </Icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl   mt-2 ml-2 px-0 py-0  border-0  shadow-md bg-white bg-cover bg-center "
          style={{
            backgroundImage: `url("https://i.ibb.co/h2Y9KSW/courier-firm.jpg")`,
          }}
        ></div>
      </div>

      {bulkCostEditOpen && (
        <BulkCostEditModal
          modalVisible={bulkCostEditOpen}
          setModalVisible={setbulkCostEditOpen}
          selectedBulkCost={{ ...selectedBulkCost }}
          setBulkCost={setBulkCost}
        />
      )}

      {bulkExCostOpen && (
        <BulkExCostModal
          modalVisible={bulkExCostOpen}
          setModalVisible={setBulkExCostEditOpen}
          selectbulkExCost={selectbulkExCost}
          setBulkExCost={setBulkExCost}
        />
      )}
    </div>
  );
};

export default BulkDeliveryCost;

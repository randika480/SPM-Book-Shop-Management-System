import React, { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import RetailCostEdit from "./modals/RetailCostEditModal";
import RetailExCostModal from "./modals/RetailExCostModal";
import Icon from "@material-ui/core/Icon";

const RetailDeliveryCost = () => {
  const [retailCostEditOpen, setRetailCostEditOpen] = useState(false);
  const [retailExCostOpen, setRetailExCostEditOpen] = useState(false);

  const [retailCost, setRetailCost] = useState([]);
  const [selectedRetailCost, setSelectedRetailCost] = useState();

  const [retailExCost, setRetailExCost] = useState();
  const [selectretailExCost, setSelectretailExCost] = useState();

  const getRetail = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/matrix/api/deliveryManager/getCost"
      );
      console.log(response.data.retailexpressprecentage);
      setRetailCost(response.data.retailcost);
      setRetailExCost(response.data.retailexpressprecentage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRetail();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 ">
        <div
          className="rounded-xl   mt-2  mx-0 px-0 py-0  border-0  shadow-md bg-lightSilver  bg-opacity-20  overflow-y-auto"
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
                    <h5 className="mr-14 mt-2"> {retailExCost}%</h5>
                  </div>
                  <div className="text-right">
                    <Icon
                      className="mr-2 hover:text-gamboge"
                      onClick={() => {
                        setRetailCostEditOpen(false);
                        setRetailExCostEditOpen(true);
                        setSelectretailExCost(retailExCost);
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

          {retailCost.map((retailCost, index) => (
            <div
              className="rounded-xl   my-2 mx-2 px-5 py-5  border-0  shadow-md bg-blueSapphire "
              key={index}
            >
              <div className="grid grid-cols-2">
                <div>
                  <h5 className="text-white mt-2">
                    {retailCost.provincename} :
                  </h5>
                </div>
                <div className="text-white ">
                  <div className="grid grid-cols-2">
                    <div className="ml-32">
                      <h5 className="mr-14 mt-2">Rs.{retailCost.cost}.00</h5>
                    </div>
                    <div className="text-right">
                      <Icon
                        className="mr-2 hover:text-gamboge"
                        onClick={() => {
                          setRetailExCostEditOpen(false);
                          setRetailCostEditOpen(true);
                          setSelectedRetailCost(retailCost);
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
          className="rounded-xl mt-2 ml-2 px-0 py-0  border-0  shadow-md bg-white bg-cover bg-center "
          style={{
            backgroundImage: `url("https://i.ibb.co/3kVbFSv/Who-We-Serve-Courier-Service-1080x675.jpg")`,
          }}
        ></div>
      </div>

      {retailCostEditOpen && (
        <RetailCostEdit
          modalVisible={retailCostEditOpen}
          setModalVisible={setRetailCostEditOpen}
          selectedRetailCost={{ ...selectedRetailCost }}
          setRetailCost={setRetailCost}
        />
      )}

      {retailExCostOpen && (
        <RetailExCostModal
          modalVisible={retailExCostOpen}
          setModalVisible={setRetailExCostEditOpen}
          selectretailExCost={selectretailExCost}
          setRetailExCost={setRetailExCost}
        />
      )}
    </div>
  );
};

export default RetailDeliveryCost;

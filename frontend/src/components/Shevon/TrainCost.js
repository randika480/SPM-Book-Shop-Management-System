import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddStationCostModal from "./modals/AddStationCostModal";
import EditTrainCostModal from "./modals/EditTrainCostModal";
import DeleteTrainCostModal from "./modals/DeleteTrainCostModal";
import Icon from "@material-ui/core/Icon";

const TrainCost = () => {
  const [addTrainCostOpen, setAddTrainCostOpen] = useState(false);
  const [editTrainCostOpen, setEditTrainCostOpen] = useState(false);
  const [deletetrainCostOpen, setdeletetrainCostOpen] = useState(false);

  const [railWays, setRailWays] = useState([]);
  const [selectedRailWay, setSelectedRailWay] = useState();

  const getRailway = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/matrix/api/deliveryManager/getCost"
      );
      setRailWays(response.data.traincost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRailway();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2">
        <div
          className="rounded-xl   mt-2 mx-0 px-0 py-0  border-0  shadow-md bg-lightSilver bg-opacity-20 overflow-y-auto "
          style={{ height: "490px" }}
        >
          <h5 className="ml-4 mt-8 font-black">Cost per weight(1kg)</h5>
          <div className="rounded-xl   my-2 mx-2 px-5 py-5  border-0  shadow-md bg-prussianBlue bg-opacity-20  ">
            <div
              className="grid grid-cols-2"
              onClick={() => {
                setEditTrainCostOpen(false);
                setdeletetrainCostOpen(false);
                setAddTrainCostOpen(true);
              }}
            >
              <div>
                <h5 className="text-black font-black">
                  <Icon className="text-gray-500 mr-5 ">
                    <AddCircleRoundedIcon />
                  </Icon>
                  Add new
                </h5>
              </div>
            </div>
          </div>

          {railWays.map((railWay, index) => (
            <div
              className="rounded-xl   my-2 mx-2 px-5 py-4  border-0  shadow-md bg-blueSapphire "
              key={index}
            >
              <div className="grid grid-cols-2 ">
                <div>
                  <h5 className="text-white font-extrabold mt-2">
                    {railWay.destination}
                  </h5>
                </div>
                <div className="text-white ">
                  <div className="grid grid-cols-2">
                    <div className="ml-28">
                      <h5 className="mr-14 mt-2"> Rs.{railWay.cost}</h5>
                    </div>
                    <div className="text-right">
                      <Icon
                        className="mr-2 hover:text-gamboge"
                        onClick={() => {
                          setAddTrainCostOpen(false);
                          setdeletetrainCostOpen(false);
                          setEditTrainCostOpen(true);
                          setSelectedRailWay(railWay);
                        }}
                      >
                        <EditIcon />
                      </Icon>
                      <Icon
                        className="hover:text-red-600"
                        onClick={() => {
                          setAddTrainCostOpen(false);
                          setEditTrainCostOpen(false);
                          setdeletetrainCostOpen(true);
                          setSelectedRailWay(railWay);
                        }}
                      >
                        <DeleteForeverIcon />
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
            backgroundImage: `url("https://i.ibb.co/fFJyDtP/jd-5cc2b8c44c685.jpg")`,
          }}
        ></div>
      </div>

      {addTrainCostOpen && (
        <AddStationCostModal
          modalVisible={addTrainCostOpen}
          setModalVisible={setAddTrainCostOpen}
          setRailWays={setRailWays}
        />
      )}
      {editTrainCostOpen && selectedRailWay && (
        <EditTrainCostModal
          modalVisible={editTrainCostOpen}
          setModalVisible={setEditTrainCostOpen}
          selectedRailWay={{ ...selectedRailWay }}
          setRailWays={setRailWays}
        />
      )}

      {deletetrainCostOpen && (
        <DeleteTrainCostModal
          modalVisible={deletetrainCostOpen}
          setModalVisible={setdeletetrainCostOpen}
          selectedRailWay={{ ...selectedRailWay }}
          setRailWays={setRailWays}
        />
      )}
    </div>
  );
};

export default TrainCost;

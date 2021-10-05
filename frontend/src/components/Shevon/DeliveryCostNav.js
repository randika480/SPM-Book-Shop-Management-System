import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import RetailDeliveryCost from "./RetailDeliveryCost";
import BulkDeliveryCost from "./BulkDeliveryCost";
import TrainCost from "./TrainCost";

function DeliveryCostNav() {
  const [retailDeliveryCostOpen, setRetailDeliveryCostOpen] = useState(true);
  const [bulkDeliveryCostOpen, setBulkDeliveryCost] = useState(false);
  const [trainCostOpen, setTrainCostOpen] = useState(false);

  return (
    <div>
      <Grid item xs={12}>
        <div className=" rounded-xl px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
          {retailDeliveryCostOpen && (
            <header className="font-contentFont text-4xl mb-3 font-bold text-prussianBlue ">
              Retail Delivery Cost Managment
            </header>
          )}

          {bulkDeliveryCostOpen && (
            <header className="font-contentFont text-4xl mb-3 font-bold text-prussianBlue ">
              Bulk Delivery Cost Managment
            </header>
          )}

          {trainCostOpen && (
            <header className="font-contentFont text-4xl mb-3 font-bold text-prussianBlue ">
              Train cost for Bulk Deliveries
            </header>
          )}
          <hr></hr>

          <div className="grid grid-cols-3 gap-x-0">
            <div>
              <button
                className=" mt-5  mb-2 bg-blueSapphire hover:bg-prussianBlue text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  setRetailDeliveryCostOpen(true);
                  setTrainCostOpen(false);
                  setBulkDeliveryCost(false);
                }}
              >
                Retail Delivery Cost Management
              </button>
            </div>
            <div>
              <button
                className=" mt-5  mb-2 bg-blueSapphire hover:bg-prussianBlue text-white font-bold py-2 px-8 rounded-full"
                onClick={() => {
                  setRetailDeliveryCostOpen(false);
                  setTrainCostOpen(false);
                  setBulkDeliveryCost(true);
                }}
              >
                Bulk Delivery Cost Management
              </button>
            </div>

            <div>
              <button
                className=" mt-5 mb-2 bg-blueSapphire hover:bg-prussianBlue text-white font-bold py-2 px-8 rounded-full"
                onClick={() => {
                  setRetailDeliveryCostOpen(false);
                  setTrainCostOpen(true);
                  setBulkDeliveryCost(false);
                }}
              >
                Train Cost for Bulk Deliveries
              </button>
            </div>
          </div>
        </div>
      </Grid>

      {retailDeliveryCostOpen && <RetailDeliveryCost />}
      {bulkDeliveryCostOpen && <BulkDeliveryCost />}
      {trainCostOpen && <TrainCost />}
    </div>
  );
}

export default DeliveryCostNav;

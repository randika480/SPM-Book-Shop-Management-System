import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import AllOrders from "./AllOrders";
import InTransitOrders from "./InTransitOrders";
import PendingOrders from "./PendingOrders";
import DeliveredOrders from "./DeliveredOrders";

function DeliveryManagementNav() {
  const [allOrdersOpen, setAllOrdersOpen] = useState(true);
  const [inTransitOrdersOpen, setInTransitOrdersOpen] = useState(false);
  const [pendingOrdersOpen, setPendingOrdersOpen] = useState(false);
  const [deliveredOrdersOpen, setDeliveredOrdersOpen] = useState(false);

  return (
    <div>
      <Grid item xs={12}>
        <div className=" rounded-xl px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
          <header className="font-contentFont text-4xl mb-3 font-bold text-prussianBlue ">
            Delivery Managment
          </header>
          <hr></hr>

          <div className="grid grid-cols-4 gap-x-0">
            <div>
              <button
                className="mt-5  mb-2 bg-blueSapphire hover:bg-prussianBlue text-white font-bold py-2 px-12 rounded-full"
                onClick={() => {
                  setAllOrdersOpen(true);
                  setInTransitOrdersOpen(false);
                  setPendingOrdersOpen(false);
                  setDeliveredOrdersOpen(false);
                }}
              >
                All Orders Details
              </button>
            </div>
            <div>
              <button
                className="mt-5  mb-2 bg-blueSapphire hover:bg-prussianBlue text-white font-bold py-2 px-10 rounded-full"
                onClick={() => {
                  setAllOrdersOpen(false);
                  setInTransitOrdersOpen(true);
                  setPendingOrdersOpen(false);
                  setDeliveredOrdersOpen(false);
                }}
              >
                In Transit Order Details
              </button>
            </div>

            <div>
              <button
                className="mt-5 mb-2 bg-blueSapphire hover:bg-prussianBlue text-white font-bold py-2 px-6 rounded-full"
                onClick={() => {
                  setAllOrdersOpen(false);
                  setInTransitOrdersOpen(false);
                  setPendingOrdersOpen(true);
                  setDeliveredOrdersOpen(false);
                }}
              >
                Pending Delivery Order Details
              </button>
            </div>

            <div>
              <button
                className="mt-5 mb-2 bg-blueSapphire hover:bg-prussianBlue text-white font-bold py-2 px-6 rounded-full"
                onClick={() => {
                  setAllOrdersOpen(false);
                  setInTransitOrdersOpen(false);
                  setPendingOrdersOpen(false);
                  setDeliveredOrdersOpen(true);
                }}
              >
                Delivered Order History Details
              </button>
            </div>
          </div>
        </div>
      </Grid>

      {allOrdersOpen && <AllOrders />}
      {inTransitOrdersOpen && <InTransitOrders />}
      {pendingOrdersOpen && <PendingOrders />}
      {deliveredOrdersOpen && <DeliveredOrders />}
    </div>
  );
}

export default DeliveryManagementNav;

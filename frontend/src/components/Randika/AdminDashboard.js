import React from "react";
import Grid from "@material-ui/core/Grid";
import RevenueChart from "./RevenueChart";
import SalesChart from "./SalesChart";
import TodayBulkOrdersTable from "./TodayBulkOrdersTable";
import TodayCustomer from "./TodayCustomer";
import TodayRegularOrderTable from "./TodayRegularOrderTable";
import TodayRevenueChart from "./TodayRevenueChart";
import ToDoTable from "./ToDoTable";

const DeliveryDashboard = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={3}>
          <div className=" m-1">
            <TodayRevenueChart />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className=" m-1 w-full h-auto ">
            {" "}
            <RevenueChart />{" "}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <div className=" m-1 w-full h-auto ">
            <SalesChart />
          </div>
        </Grid>

        <Grid item xs={12} md={3}>
          <div className=" m-1">
            <TodayCustomer />
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className=" m-1 ">
            <ToDoTable />
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className=" m-1">
            {" "}
            <TodayRegularOrderTable />
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className=" m-1">
            {" "}
            <TodayBulkOrdersTable />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryDashboard;

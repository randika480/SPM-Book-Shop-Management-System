import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const TodayCustomer = () => {
  const [todayCustomers, settodayCustomers] = useState([]);
  const [todayCustomersTotal, settodayCustomersTotal] = useState([]);

  const getCustomers = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getNewUsers")
        .then((res) => {
          settodayCustomers(res.data.customers);
          let todayCus = [];
          let todayCustTot = 0;

          //get today regular orders
          for (let i = 0; i < res.data.customers.length; i++) {
            if (
              moment(res.data.customers[i].profileCreatedAt).format(
                "DD/MM/YYYY"
              ) === moment(new Date()).format("DD/MM/YYYY")
            ) {
              todayCus.push(res.data.customers[i]);
            }
          }

          //get today revenue from regular orders
          for (let i = 0; i < todayCus.length; i++) {
            todayCustTot++;
          }
          settodayCustomersTotal(todayCustTot);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const getLastDayCustomers = () => {
    let yesterdayBulk = [];
    let yesterdayCusTot = 0;

    //get yesterday bulk orders
    for (let i = 0; i < todayCustomers.length; i++) {
      if (
        moment(todayCustomers[i].placedAt).format("DD/MM/YYYY") ===
        moment(yesterday).format("DD/MM/YYYY")
      ) {
        yesterdayBulk.push(todayCustomers[i]);
      }
    }
    //get yesterday revenue from bulk orders
    for (let i = 0; i < yesterdayBulk.length; i++) {
      yesterdayCusTot++;
    }

    return yesterdayCusTot;
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="w-full pt-4 h-96 mb-5 bg-white shadow-2xl">
      <div className="w-4/5 m-auto h-full ">
        <h1 className="text-center font-bold font-sans">Today New Customers</h1>
        <div className="w-full m-auto h-4/5 ">
          <div className="pt-10 h-4/5" style={{ margin: "auto" }}>
            <Avatar
              style={{ width: "100px", height: "100px", margin: "auto" }}
              src="/broken-image.jpg"
            />
          </div>
          <Divider />
          <div className="h-14 p-4 text-center font-bold text-md">
            <h5>Today : {todayCustomersTotal}</h5>
          </div>
          <Divider />
          <div className="p-1 h-3">
      
            <h5 className="text-center font-bold text-md">Last Day : {getLastDayCustomers()}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayCustomer;

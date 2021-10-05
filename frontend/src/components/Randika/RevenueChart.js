/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = () => {
  const [regularOrdersRevenue, setregularOrdersRevenue] = useState([]);
  let revArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const getBulkOrders = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getBulkOrders")
        .then((res) => {
          for (let i = 0; i < res.data.bulkorders.length; i++) {
            let date = "",
              month = "",
              check = "";
            date = moment(res.data.bulkorders[i].placedAt).format("DD/MM/YYYY");
            check = moment(date, "YYYY/MM/DD");
            month = check.format("M");
            for (let j = 0; j < 12; j++) {
              if (month === (j + 1).toString()) {
                revArray[j] += res.data.bulkorders[i].payment.totalAmount;
              }
            }
          }

          setDataArray(revArray);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getRegularOrders = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getRegularOrders")
        .then((res) => {
          for (let i = 0; i < res.data.orders.length; i++) {
            let date = "",
              month = "",
              check = "";
            date = moment(res.data.orders[i].purchasedDate).format(
              "DD/MM/YYYY"
            );
            check = moment(date, "YYYY/MM/DD");
            month = check.format("M");
            for (let j = 0; j < 12; j++) {
              if (month === (j + 1).toString()) {
                revArray[j] += res.data.orders[i].billAmount;
              }
            }
          }
          getBulkOrders();
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };
  const setDataArray = (revArray) => {
    const dataArray = [
      { name: "Jan", uv: revArray[0] },
      { name: "Feb", uv: revArray[1] },
      { name: "Mar", uv: revArray[2] },
      { name: "Apr", uv: revArray[3] },
      { name: "May", uv: revArray[4] },
      { name: "Jun", uv: revArray[5] },
      { name: "July", uv: revArray[6] },
      { name: "Aug", uv: revArray[7] },
      { name: "Sep", uv: revArray[8] },
      { name: "Oct", uv: revArray[9] },
      { name: "Nov", uv: revArray[10] },
      { name: "Dec", uv: revArray[11] },
    ];
    console.log(dataArray);
    setregularOrdersRevenue(dataArray);
  };

  useEffect(() => {
    getRegularOrders();
  }, []);

  return (
    <div className="w-full p-4 pt-5 mb-4 h-96 bg-white shadow-2xl">
      <div className="w-full m-auto h-full ">
        <h1 className="text-center font-bold font-sans">Revenue</h1>

        <div className="w-full m-auto h-4/5 ">
          <div style={{ width: "100%" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={550}
                height={200}
                data={regularOrdersRevenue}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  connectNulls
                  type="monotone"
                  dataKey="uv"
                  stroke="#042B58"
                  fill="#042B58"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;

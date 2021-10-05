import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: "#042B58",
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
  shape2: {
    backgroundColor: "#EA2300",
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
}));

const TodayRevenue = () => {
  const [bulkOrders, setbulkOrders] = useState([]);
  const [regularOrders, setregularOrders] = useState([]);

  const [todayBulkRevenue, settodayBulkRevenue] = useState(0);
  const [todayRegularRevenue, setTodayRegularRevenue] = useState(0);

  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const getLastDayRevenue = () => {
    let yesterdayBulk = [];
    let yesterdayBulkRevenue = 0;
    let yesterdayRegular = [];
    let yesterdayRegularRevenue = 0;
    //get yesterday bulk orders
    for (let i = 0; i < bulkOrders.length; i++) {
      if (
        moment(bulkOrders[i].placedAt).format("DD/MM/YYYY") ===
        moment(yesterday).format("DD/MM/YYYY")
      ) {
        yesterdayBulk.push(bulkOrders[i]);
      }
    }
    //get yesterday revenue from bulk orders
    for (let i = 0; i < yesterdayBulk.length; i++) {
      yesterdayBulkRevenue += yesterdayBulk[i].payment.totalAmount;
    }

    //get yesterday Regular orders
    for (let i = 0; i < regularOrders.length; i++) {
      if (
        moment(regularOrders[i].purchasedDate).format("DD/MM/YYYY") ===
        moment(yesterday).format("DD/MM/YYYY")
      ) {
        yesterdayRegular.push(regularOrders[i]);
      }
    }

    //get yesterday revenue from Regular orders
    for (let i = 0; i < yesterdayRegular.length; i++) {
      yesterdayRegularRevenue += yesterdayRegular[i].billAmount;
    }

    return yesterdayRegularRevenue + yesterdayBulkRevenue;
  };

  const getBulkOrders = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getBulkOrders")
        .then((res) => {
          setbulkOrders(res.data.bulkorders);
          let todayBulk = [];

          let todayBulkRevenue = 0;

          //get today bulk orders
          for (let i = 0; i < res.data.bulkorders.length; i++) {
            if (
              moment(res.data.bulkorders[i].placedAt).format("DD/MM/YYYY") ===
              moment(new Date()).format("DD/MM/YYYY")
            ) {
              todayBulk.push(res.data.bulkorders[i]);
            }
          }

          //get today revenue from bulk orders
          for (let i = 0; i < todayBulk.length; i++) {
            todayBulkRevenue += todayBulk[i].payment.totalAmount;
          }
          settodayBulkRevenue(todayBulkRevenue);
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
          setregularOrders(res.data.orders);
          let todayRegular = [];
          let todayRegularRevenue = 0;

          //get today regular orders
          for (let i = 0; i < res.data.orders.length; i++) {
            if (
              moment(res.data.orders[i].purchasedDate).format("DD/MM/YYYY") ===
              moment(new Date()).format("DD/MM/YYYY")
            ) {
              todayRegular.push(res.data.orders[i]);
            }
          }

          //get today revenue from regular orders
          for (let i = 0; i < todayRegular.length; i++) {
            todayRegularRevenue += todayRegular[i].billAmount;
          }
          setTodayRegularRevenue(todayRegularRevenue);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    getBulkOrders();
    getRegularOrders();
  }, []);

  const classes = useStyles();
  const circle1 = <div className={clsx(classes.shape)} />;
  const circle2 = <div className={clsx(classes.shape2)} />;

  const data = [
    { name: "Regular Orders", value: todayRegularRevenue },
    { name: "Bulk Orders", value: todayBulkRevenue },
  ];
  const COLORS = ["#042B58", "#EA2300"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full  h-96 mb-4 bg-white shadow-2xl">
      {
        <div className="w-4/5 m-auto h-full  ">
          <h1 className="text-center font-bold font-sans">Today Orders</h1>
          {(todayRegularRevenue > 0 || todayBulkRevenue > 0) && (
            <div>
              {bulkOrders && regularOrders && (
                <div className="w-full m-auto h-48">
                  <PieChart width={800} height={400} style={{ margin: "auto" }}>
                    <Pie
                      data={data}
                      cx={100}
                      cy={100}
                      innerRadius={30}
                      outerRadius={80}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      fill="#8884d8"
                      paddingAngle={4}
                      dataKey="value"
                      style={{ margin: "auto" }}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              )}
              <div className="m-1 ml-4  h-11">
                <div style={{ float: "left", marginRight: "5px" }}>
                  {circle1}
                </div>
                <div style={{ float: "left" }}>
                  Regular Orders(rs.{todayRegularRevenue})
                </div>
                <br />
                <div
                  style={{
                    float: "left",
                    marginRight: "5px",
                    margintop: "10px",
                  }}
                >
                  {circle2}
                </div>
                <div style={{ float: "left" }}>
                  Bulk Orders(Rs.{todayBulkRevenue})
                </div>
              </div>
              <Divider />
              <div className="h-14 p-4 text-center font-bold text-md">
                <h5>
                  Today Revenue : {todayBulkRevenue + todayRegularRevenue}
                </h5>
              </div>
            </div>
          )}
          {!(todayRegularRevenue > 0 && todayBulkRevenue > 0) && (
            <div className="h-2/3 pt-20">
              <h1 className="text-center font-boldTallFont text-lg text-gamboge">
                There's No Any Order Yet
              </h1>
            </div>
          )}
          <Divider />
          <div className="p-1 h-3">
            {getLastDayRevenue() > 0 && (
              <h5 className="text-center font-bold text-md">
                Last Day : Rs {getLastDayRevenue()}
              </h5>
            )}
            {getLastDayRevenue() <= 0 && (
              <h5 className="text-center font-bold text-md">
                No Any Order Yesterday
              </h5>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default TodayRevenue;

import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 30,
    fontWeight: "bold",
  },
});

const TodayRegularOrderTable = () => {
  const [regularOrders, setregularOrders] = useState([]);

  const getRegularOrders = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getRegularOrders")
        .then((res) => {
          setregularOrders(res.data.orders);
          let todayRegular = [];

          //get today regular orders
          for (let i = 0; i < res.data.orders.length; i++) {
            if (
              moment(res.data.orders[i].purchasedDate).format("DD/MM/YYYY") ===
              moment(new Date()).format("DD/MM/YYYY")
            ) {
              todayRegular.push(res.data.orders[i]);
            }
          }
          setregularOrders(todayRegular);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };
  useEffect(() => {
    getRegularOrders();
  }, []);
  const classes = useStyles();
  return (
    <div className="w-full pt-4 h-96 mb-5 bg-white shadow-2xl">
      <div className="w-full4/5 m-auto h-full  pt-3">
        <h1 className="text-center font-bold font-sans pl-3 pr-3">
          Today Regular Orders
        </h1>

        {regularOrders.length > 0 && (
          <div className="w-full m-auto h-4/5 p-5">
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead className="bg-prussianBlue">
                  <TableRow>
                    <TableCell align="center" style={{ color: "white" }}>
                      Index
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Items
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      NetTot
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {regularOrders.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center"><h1 className="font-bold text-md">{index + 1}</h1></TableCell>
                      <TableCell align="center">
                        <h1 className="font-bold text-md">
                          {row.orderData.length}
                        </h1>
                      </TableCell>
                      <TableCell align="center">
                        <h1 className="font-bold text-md">{row.billAmount}</h1>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {regularOrders.length <= 0 && (
          <div className=" mt-32 w-full h-max">
            <h1 className="text-center font-boldTallFont text-lg text-gamboge">
              There's No Any Order Yet
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayRegularOrderTable;

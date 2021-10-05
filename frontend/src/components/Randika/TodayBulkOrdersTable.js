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
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles({
  table: {
    minWidth: 30,
    fontWeight: "bold",
  },
});

const makeAlert = () => {
  alert("done");
};

const TodayBulkOrdersTable = () => {
  const [bulkOrders, setbulkOrders] = useState([]);

  const getBulkOrders = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getBulkOrders")
        .then((res) => {
          setbulkOrders(res.data.bulkorders);
          let todayBulk = [];

          //get today bulk orders
          for (let i = 0; i < res.data.bulkorders.length; i++) {
            if (
              moment(res.data.bulkorders[i].placedAt).format("DD/MM/YYYY") ===
              moment(new Date()).format("DD/MM/YYYY")
            ) {
              todayBulk.push(res.data.bulkorders[i]);
            }
          }
          setbulkOrders(todayBulk);
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
  }, []);
  const classes = useStyles();
  return (
    <div className="w-full pt-4 h-96 mb-5 bg-white shadow-2xl">
      <div className="w-full m-auto h-full  pt-3">
        <h1 className="text-center font-bold font-sans ">
          Today Bulk Orders
        </h1>
        {/* <IconButton
          aria-label="settings"
          style={{ float: "right" }}
          onClick={() => {
            makeAlert();
          }}
        >
          <MoreVertIcon />
        </IconButton> */}
        {bulkOrders.length > 0 && (
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
                  {bulkOrders.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <h1 className="font-bold text-md">{index + 1}</h1>
                      </TableCell>
                      <TableCell align="center">
                        <h1 className="font-bold text-md">
                          {row.items.length}
                        </h1>
                      </TableCell>
                      <TableCell align="center">
                        <h1 className="font-bold text-md">
                          {row.payment.totalAmount}
                        </h1>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {bulkOrders.length <= 0 && (
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

export default TodayBulkOrdersTable;

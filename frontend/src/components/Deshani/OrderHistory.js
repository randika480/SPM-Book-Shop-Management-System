import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import ReplayIcon from "@material-ui/icons/Replay";
import SearchIcon from "@material-ui/icons/Search";
// import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";
import AddReviewModal from "./AddReviewModal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import generatePDF from "./OrderHistoryReport";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, searchTerm) {
  const stabilizedThis = array
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.deliveryStatus.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
      return null;
    })
    .map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "col1",
    numeric: false,
    disablePadding: true,
    label: "Order ID",
  },
  {
    id: "col2",
    numeric: false,
    disablePadding: false,
    label: "Delivery Address",
  },
  { id: "col3", numeric: true, disablePadding: false, label: "Total" },
  {
    id: "col4",
    numeric: false,
    disablePadding: false,
    label: "Delivery Status",
  },
  { id: "col5", numeric: true, disablePadding: false, label: "Review" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className=" bg-prussianBlue ">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ paddingLeft: "10px", color: "white" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  //numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function createData(col1, col2, col3, col4) {
  return { col1, col2, col3, col4 };
}

const rows = [
  createData("OID1234", "12-08-2021", 2000, "pending"),
  createData("OID2342", "08-08-2021", 1500, "delivered"),
  createData("OID5678", "04-07-2021", 2300, "delivered"),
  createData("OID1232", "11-06-2021", 2000, "delivered"),
  createData("OID2345", "08-06-2021", 1500, "delivered"),
  createData("OID5679", "04-06-2021", 2300, "delivered"),
  createData("OID1231", "11-06-2021", 2000, "delivered"),
  createData("OID2343", "08-06-2021", 1500, "delivered"),
  createData("OID5677", "04-06-2021", 2300, "delivered"),
];

//   const useStyles = makeStyles({

//   });

const OrderHistory = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setsearchTerm] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const [orderHistory, setOrderHistory] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const getOrderHistory = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get("http://localhost:6500/matrix/api/customer/getOrders", config)
        .then((res) => {
          setOrderHistory(res.data.orders);
          console.log("orders" + res.data.orders);

          for (let i = 0; i < res.data.orders.length; i++) {
            for (let j = 0; j < res.data.orders[i].orderData.length; j++) {
              setProductId(res.data.orders[i].orderData[j].productID);
              console.log(res.data.orders[i].orderData[j].productID);
            }
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    getOrderHistory();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center ">
      <div className="flex flex-col space-y-6 bg w-full xl:max-w-6xl sm:max-w-xl md:max-w-3xl p-8 rounded-xl shadow-lg text-black bg-gamboge">
        <h1 className="font-boldTallFont font-semibold text-4xl">
          Order History
        </h1>
        <div className="w-11/12 h-10  m-auto mb-2">
          <button
            type="submit"
            className="focus:outline-none text-snow-900 text-base rounded border hover:border-transparent w-48 h-10 sm:w-80 sm:h-12 bg-gamboge  float-right"
            style={{
              boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
              color: "white",
            }}
            onClick={() => {
              generatePDF(orderHistory);
            }}
          >
            Generate Report
          </button>
        </div>
        <div className="grid grid-flow-col grid-cols-4 gap-0">
          <div className="flex flex-row space-x-6 w-max h-11 bg-white rounded-md ">
            <div className="mt-2 ml-3 bg">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="w-3/5 h-11 p-5 rounded-md"
              id="code"
              placeholder="Search Here"
              onChange={(event) => {
                setsearchTerm(event.target.value);
              }}
              style={{ float: "left" }}
            ></input>
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => {
                setsearchTerm("");
              }}
              style={{ marginLeft: "2rem" }}
            >
              <ReplayIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={orderHistory.length}
                />
                <TableBody>
                  {stableSort(
                    orderHistory,
                    getComparator(order, orderBy),
                    searchTerm
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.deliveryAddress
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        val.deliveryStatus
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                      return null;
                    })
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow tabIndex={1} key={index}>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            style={{ padding: "1rem" }}
                          >
                            {row._id}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ marginLeft: "4rem" }}
                          >
                            {row.deliveryAddress}
                          </TableCell>
                          <TableCell align="center">{row.billAmount}</TableCell>
                          <TableCell align="center">
                            {row.deliveryStatus}
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                setReviewModalOpen(true);
                              }}
                            >
                              Add Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orderHistory.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      {reviewModalOpen && (
        <AddReviewModal
          modalVisible={reviewModalOpen}
          setModalVisible={setReviewModalOpen}
          productID={productId}
        />
      )}
    </div>
  );
};

export default OrderHistory;

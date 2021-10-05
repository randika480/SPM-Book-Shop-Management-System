import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Modal } from "react-responsive-modal";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import RevenueModal from "./RevenueModal";
import generatePDF from "./AdminRevenueReports";

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

function stableSort(array, comparator, searchDate) {
  const stabilizedThis = array
    .filter((val) => {
      if (searchDate === "") {
        return val;
      } else if (
        moment(val.purchasedDate)
          .format("YYYY-MM-DD")
          .includes(searchDate.toLowerCase())
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

  { id: "col3", numeric: true, disablePadding: false, label: "Items" },
  { id: "col4", numeric: true, disablePadding: false, label: "Net Tot" },
  { id: "col5", numeric: true, disablePadding: false, label: "Date" },
  { id: "col6", numeric: true, disablePadding: false, label: "" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className=" bg-blueSapphire">
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ color: "white" }}
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
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
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
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const RegularOrders = ({ setModalVisible, modalVisible, cusID }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [searchDate, setsearchDate] = useState("");
  const [regularOrders, setregularOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState("");

  const [revenueModalOpen, setRevenueModalOpen] = useState(false);

  const getRegularOrders = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getRegularOrders")
        .then((res) => {
          setregularOrders(res.data.orders);
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
    <Modal
      open={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      center
      styles={{
        modal: {
          borderRadius: "10px",
          maxWidth: "900px",
          width: "100%",
        },
      }}
      focusTrapped={true}
    >
      <div className="w-11/12 h-auto p-4 mt-2 m-auto pt-5 rounded-xl bg-blueSapphire bg-opacity-30">
        <h1 className="font-bold text-lg font-boldTallFont">Placed Orders</h1>
        <div className="w-11/12 h-10  m-auto mb-2">
          <button
            type="submit"
            className="focus:outline-none text-snow-900 text-base rounded border hover:border-transparent w-48 h-10 sm:w-80 sm:h-12 bg-gamboge  float-right"
            style={{
              boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
              color: "white",
            }}
            onClick={() => {
              if (!searchDate) {
                generatePDF(regularOrders, "regular");
              }
              if (searchDate) {
                let filteredRegularOrders = [];
                regularOrders
                  .filter((val) => {
                    if (searchDate === "") {
                      return val;
                    } else if (
                      moment(val.purchasedDate)
                        .format("YYYY-MM-DD")
                        .includes(searchDate.toLowerCase())
                    ) {
                      return val;
                    }
                    return null;
                  })
                  .map((regOrders) => {
                    return filteredRegularOrders.push(regOrders);
                  });

                generatePDF(filteredRegularOrders, "regular");
              }
            }}
          >
            Generate Report
          </button>
        </div>
        <div className="w-full h-auto bg-white p-3 rounded-xl">
          <div className="w-full h-16 mb-1 p-1 bg-blueSapphire bg-opacity-30 rounded-lg">
            <div className="w-max h-16" style={{ float: "left" }}>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Choose Date"
                  type="date"
                  defaultValue="2021-05-23"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => {
                    setsearchDate(event.target.value);
                  }}
                />
              </form>
            </div>

            {searchDate && (
              <div className="cursor-pointer w-max mt-3 h-9 bg-red rounded-3xl bg-black p-2 pl-4 pr-4 float-left ml-3 transform hover:scale-110 motion-reduce:transform-none">
                <p
                  className=" text-white font-bold text-center text-sm"
                  onClick={() => {
                    setsearchDate("");
                  }}
                >
                  Clear
                </p>
              </div>
            )}
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
                    rowCount={regularOrders.length}
                  />
                  <TableBody>
                    {stableSort(
                      regularOrders,
                      getComparator(order, orderBy),
                      searchDate
                    )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .filter((val) => {
                        if (val.buyerID === cusID) {
                          return val;
                        }
                        return null;
                      })
                      .filter((val) => {
                        if (searchDate === "") {
                          return val;
                        } else if (
                          moment(val.purchasedDate)
                            .format("YYYY-MM-DD")
                            .includes(searchDate.toLowerCase())
                        ) {
                          return val;
                        }
                        return null;
                      })
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow hover tabIndex={-1} key={index}>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              align="left"
                              style={{ paddingLeft: "20px" }}
                            >
                              <h1 className="font-bold text-md">{row._id}</h1>
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{ paddingLeft: "35px" }}
                            >
                              <h1 className="font-bold text-md">
                                {row.orderData.length}
                              </h1>
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{ paddingLeft: "28px" }}
                            >
                              <h1 className="font-bold text-md">
                                Rs.{row.billAmount}
                              </h1>
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{ paddingLeft: "28px" }}
                            >
                              <h1 className="font-bold text-md">
                                {moment(row.purchasedDate).format("MM-DD-YYYY")}
                              </h1>
                            </TableCell>

                            <TableCell
                              align="left"
                              style={{ paddingLeft: "20px" }}
                            >
                              {" "}
                              <button
                                type="submit"
                                className="focus:outline-none bg-gamboge text-snow-900 text-base rounded border hover:border-transparent w-32 h-10 sm:w-80 sm:h-12"
                                style={{
                                  boxShadow:
                                    "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                  float: "right",
                                  color: "white",
                                }}
                                onClick={() => {
                                  setRevenueModalOpen(true);
                                  setCurrentOrder(row.orderData);
                                }}
                              >
                                View More
                              </button>
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
                count={regularOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
        {revenueModalOpen && (
          <RevenueModal
            setModalVisible={setRevenueModalOpen}
            modalVisible={revenueModalOpen}
            currentOrder={currentOrder}
          />
        )}
      </div>
    </Modal>
  );
};

export default RegularOrders;

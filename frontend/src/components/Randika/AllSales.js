/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import ReplayIcon from "@material-ui/icons/Replay";
import generatePDF from "./AdminSalesReports";
import SalesModal from "./SalesModal";

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
        val.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.bookName.toLowerCase().includes(searchTerm.toLowerCase())
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
  { id: "col1", numeric: true, disablePadding: false, label: "Index" },
  { id: "col2", numeric: true, disablePadding: false, label: "Book Id" },

  { id: "col3", numeric: true, disablePadding: false, label: "Book Title" },
  { id: "col4", numeric: true, disablePadding: false, label: "Author" },
  { id: "col5", numeric: true, disablePadding: false, label: "Sales" },
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
  //numSelected: PropTypes.number.isRequired,
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
    backgroundColor: "#D3DCDE",
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AllSales = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setsearchTerm] = useState("");
  const [productSales, setProductSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [regularOrders, setRegularOrders] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [currentBook, setCurrentBook] = useState("");

  const [salesModalOpen, setSalesModalOpen] = useState(false);
  //------------------------------------------------------------------------------------------------------------
  const getProducts = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getProducts")

        .then((res) => {
          setProducts(res.data.Products);
          let productIds = [];
          for (let i = 0; i < res.data.Products.length; i++) {
            let dataobject = {
              book: res.data.Products[i]._id,
              bookName: res.data.Products[i].publishingTitle,
              author: res.data.Products[i].translator,
            };
            productIds.push(dataobject);
          }
          getRegularOrders(productIds);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getRegularOrders = async (book) => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getRegularOrders")

        .then((res) => {
          setRegularOrders(res.data.orders);

          for (let j = 0; j < book.length; j++) {
            let count = 0;
            for (let i = 0; i < res.data.orders.length; i++) {
              for (let x = 0; x < res.data.orders[i].orderData.length; x++) {
                if (res.data.orders[i].orderData[x].productID) {
                  if (
                    book[j].book ===
                    res.data.orders[i].orderData[x].productID._id
                  ) {
                    count += res.data.orders[i].orderData[x].quantity;
                  }
                }
              }
            }
            const dataobject = {
              book: book[j].book,
              bookName: book[j].bookName,
              author: book[j].author,
              count: count,
            };

            productSales.push(dataobject);
          }
          console.log(productSales);
          getBulkOrders();
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getBulkOrders = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getBulkOrders", config)

        .then((res) => {
          for (let x = 0; x < productSales.length; x++) {
            let newCount = productSales[x].count;
            for (let i = 0; i < res.data.bulkorders.length; i++) {
              for (let j = 0; j < res.data.bulkorders[i].items.length; j++) {
                if (res.data.bulkorders[i].items[j].productID) {
                  if (
                    productSales[x].book ===
                    res.data.bulkorders[i].items[j].productID._id
                  ) {
                    newCount += res.data.bulkorders[i].items[j].quantity;
                  }
                }
              }
            }
            productSales[x].count = newCount;
          }

          console.log(productSales);
          setBulkOrders(res.data.bulkorders);
          getTopSellingItems();
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getTopSellingItems = () => {
    for (let i = 0; i < productSales.length; i++) {
      for (let j = i + 1; j < productSales.length; j++) {
        let temp = 0;
        if (productSales[i].count < productSales[j].count) {
          temp = productSales[i];
          productSales[i] = productSales[j];
          productSales[j] = temp;
        }
      }
    }
  };
  //-------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    getProducts();
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
    <div className="w-11/12 h-auto p-4 mt-2 m-auto pt-3 rounded-xl bg-blueSapphire bg-opacity-30">
      <h1 className="text-4xl text-center text-prussianBlue font-bold mb-5">
        All Sales
      </h1>

      <div className="w-11/12 h-10  m-auto mb-2">
        <button
          type="submit"
          className="focus:outline-none text-snow-900 text-base rounded border hover:border-transparent w-48 h-10 sm:w-80 sm:h-12 bg-gamboge  float-right"
          style={{
            boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
            color: "white",
          }}
          onClick={() => generatePDF(productSales)}
        >
          Generate Report
        </button>
      </div>

      <div className="w-full h-auto bg-white p-3 rounded-xl">
        <div className="w-max mb-1 p-1 bg-blueSapphire rounded-lg  h-14 bg-opacity-30">
          <div className="w-2/3 h-16" style={{ float: "left" }}>
            <input
              type="text"
              className="w-60 h-11 p-5 rounded-3xl m-2 mt-0"
              id="code"
              placeholder="Search Here"
              value={searchTerm}
              onChange={(event) => {
                setsearchTerm(event.target.value);
              }}
              style={{ float: "left" }}
            ></input>
          </div>

          {searchTerm && (
            // <div className="cursor-pointer w-max mt-1 h-9 bg-red rounded-3xl bg-black p-2 pl-4 pr-4 float-left ml-3 transform hover:scale-110 motion-reduce:transform-none">
            //   <p
            //     className=" text-white font-bold text-center text-sm"
            //     onClick={() => {
            //       setsearchTerm("");
            //     }}
            //   >
            //     Clear
            //   </p>
            // </div>
            <ReplayIcon
              style={{ float: "left" }}
              className="m-3"
              onClick={() => {
                setsearchTerm("");
              }}
            />
          )}
        </div>

        {bulkOrders && (
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
                    rowCount={productSales.length}
                  />
                  <TableBody>
                    {stableSort(
                      productSales,
                      getComparator(order, orderBy),
                      searchTerm
                    )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        } else if (
                          val.book.includes(searchTerm.toLowerCase()) ||
                          val.bookName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                        return null;
                      })
                      .map((row, index) => {
                        return (
                          <TableRow hover tabIndex={-1} key={index}>
                            <TableCell align="left">
                              <h1 className="font-bold text-md">{index + 1}</h1>
                            </TableCell>
                            <TableCell align="left">
                              <h1 className="font-bold text-md">{row.book}</h1>
                            </TableCell>
                            <TableCell align="left">
                              <h1 className="font-bold text-md">
                                {row.bookName}
                              </h1>
                            </TableCell>
                            <TableCell align="left">
                              <h1 className="font-bold text-md">
                                {row.author}
                              </h1>
                            </TableCell>
                            <TableCell align="center">
                              <h1 className="font-bold text-md">{row.count}</h1>
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
                                  setSalesModalOpen(true);
                                  setCurrentBook(row.book);
                                }}
                              >
                                View Orders
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
                count={productSales.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}

        {salesModalOpen && (
          <SalesModal
            setModalVisible={setSalesModalOpen}
            modalVisible={salesModalOpen}
            currentBook={currentBook}
          />
        )}
      </div>
    </div>
  );
};

export default AllSales;

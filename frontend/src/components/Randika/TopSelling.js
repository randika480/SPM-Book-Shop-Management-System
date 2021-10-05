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
import SearchIcon from "@material-ui/icons/Search";
import ReplayIcon from "@material-ui/icons/Replay";

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
        val.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.language.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
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
    label: "No",
  },
  { id: "col2", numeric: true, disablePadding: false, label: "Book Id" },
  { id: "col3", numeric: true, disablePadding: false, label: "Count" },
  { id: "col4", numeric: true, disablePadding: false, label: "" },
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
    minWidth: 800,
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

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [regularOrders, setRegularOrders] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [topSelling, settopSelling] = useState([]);

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setsearchTerm] = useState("");
  const [bookRequests, setBookRequests] = useState([]);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  const [topBooks, setTopBooks] = useState([]);
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

  const getProducts = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getProducts")
        .then((res) => {
          setProducts(res.data.Products);
          let productIds = [];
          for (let i = 0; i < res.data.Products.length; i++) {
            productIds.push(res.data.Products[i]._id);
          }
          getRegularOrders(productIds, res.data.Products);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getRegularOrders = async (book, allProducts) => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getRegularOrders")
        .then((res) => {
          setRegularOrders(res.data.orders);

          for (let j = 0; j < book.length; j++) {
            let count = 0;
            for (let i = 0; i < res.data.orders.length; i++) {
              for (let x = 0; x < res.data.orders[i].orderData.length; x++) {
                if (book[j] === res.data.orders[i].orderData[x].productID) {
                  count += res.data.orders[i].orderData[x].quantity;
                }
              }
            }
            const dataobject = {
              book: book[j],
              count: count,
            };

            productSales.push(dataobject);
          }
          console.log(productSales);
          getBulkOrders(allProducts);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getBulkOrders = async (allProducts) => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getBulkOrders")
        .then((res) => {
          setBulkOrders(res.data.bulkorders);
          for (let x = 0; x < productSales.length; x++) {
            let newCount = productSales[x].count;
            for (let i = 0; i < res.data.bulkorders.length; i++) {
              for (let j = 0; j < res.data.bulkorders[i].items.length; j++) {
                if (
                  productSales[x].book ===
                  res.data.bulkorders[i].items[j].productID
                ) {
                  newCount += res.data.bulkorders[i].items[j].quantity;
                }
              }
            }
            productSales[x].count = newCount;
          }

          console.log(productSales);
          getTopSellingItems(allProducts);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getTopSellingItems = (allProducts) => {
   
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-4/5 h-auto m-auto">
      <div className="w-full h-auto bg-white p-3 rounded-xl">
        <div className="w-full mb-1 p-1 bg-blueSapphire rounded-lg  h-14 bg-opacity-30">
          <SearchIcon
            style={{ float: "left", fontSize: 40, marginLeft: "10px" }}
          />
          <div className="w-2/3 h-16" style={{ float: "left" }}>
            <input
              type="text"
              className="w-full h-11 p-5 "
              id="code"
              placeholder="Search Here"
              value={searchTerm}
              onChange={(event) => {
                setsearchTerm(event.target.value);
              }}
              style={{ float: "left" }}
            ></input>
          </div>
          <ReplayIcon
            style={{ float: "left" }}
            className="m-3"
            onClick={() => {
              setsearchTerm("");
            }}
          />
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
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={bookRequests.length}
              />
              <TableBody>
                {stableSort(
                  productSales,
                  getComparator(order, orderBy),
                  searchTerm
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  // .filter((val) => {
                  //   if (val.id === topBooks.book) {
                  //     return val;
                  //   }
                  // })
                  .map((book, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow tabIndex={1} key={book.book}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          style={{ padding: "10px" }}
                        >
                          {index + 1}
                        </TableCell>

                        <TableCell align="center">{book.book}</TableCell>
                        <TableCell align="center">{book.count}</TableCell>

                        <TableCell align="center">
                          {" "}
                          <button
                            type="submit"
                            className="focus:outline-none text-snow-900 text-base rounded border hover:border-transparent w-32 h-10 sm:w-80 sm:h-12 bg-gamboge"
                            style={{
                              boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                              float: "right",
                              color: "white",
                            }}
                            onClick={() => {
                              setSampleModalOpen(true);
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
            count={bookRequests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default TopSelling;

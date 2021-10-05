import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
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
import UpdateDiscountModal from "./UpdateDiscountModal";
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
        val.discountPercentage.label
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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
    label: "Book",
  },
  { id: "col2", numeric: true, disablePadding: false, label: "Discount Lable" },
  {
    id: "col3",
    numeric: true,
    disablePadding: false,
    label: "Regular Percentage",
  },
  {
    id: "col4",
    numeric: true,
    disablePadding: false,
    label: "Bulk Perecentage",
  },
  { id: "col5", numeric: true, disablePadding: false, label: "Market Price" },
  { id: "col6", numeric: true, disablePadding: false, label: "" },
  { id: "col7", numeric: true, disablePadding: false, label: "" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className=" bg-blueSapphire">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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

const AddedDiscounts = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setsearchTerm] = useState("");

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const [products, setproducts] = useState([]);
  const [options, setOptions] = useState([]);

  const [bookID, setbookID] = useState("");
  const [discountlable, setDiscountlable] = useState("");
  const [regularPercentage, setregularPercentage] = useState(0);
  const [bulkPercentage, setbulkPercentage] = useState(0);

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

  useEffect(() => {
    const getProducts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getProducts", config)

          .then((res) => {
            let testLables = [];
            let testProducts = [];
            for (let i = 0; i < res.data.Products.length; i++) {
              if (res.data.Products[i].discountPercentage.label) {
                testProducts.push(res.data.Products[i]);
                testLables.push(res.data.Products[i].discountPercentage.label);
              }
            }

            setproducts(testProducts);
            let data = [];
            let uniqueLables = testLables.filter((c, index) => {
              return testLables.indexOf(c) === index;
            });
            uniqueLables.map((item) => {
              let category = {
                value: item,
                label: item,
              };
              data.push(category);
              return 0;
            });

            setOptions(data);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="w-11/12 h-auto p-4 mt-2 m-auto pt-5 rounded-xl bg-blueSapphire bg-opacity-30">
      <h1 className="text-4xl text-center text-prussianBlue font-bold mb-5">
        Added Discounts
      </h1>
      <div className="w-full h-auto bg-white p-3 rounded-xl">
        <div className="w-full mb-1 p-1 bg-blueSapphire bg-opacity-30 r rounded-lg  h-12">
          <div className="w-2/3 float-left">
            <Select
              options={options}
              onChange={(event) => {
                setsearchTerm(event.value);
              }}
              className="basic-multi-select "
            />
          </div>
         

          <ReplayIcon
            style={{ float: "left" }}
            className="m-3"
            onClick={() => {
              setsearchTerm("");
            }}
          />
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
                  rowCount={products.length}
                />
                <TableBody>
                  {stableSort(
                    products,
                    getComparator(order, orderBy),
                    searchTerm
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.discountPercentage.label
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
                        <TableRow hover tabIndex={-1} key={index}>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            style={{ paddingLeft: "20px" }}
                          >
                            <h1 className="font-bold text-md ">
                              {row.publishingTitle}
                            </h1>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <h1 className="font-bold text-md">
                              {row.discountPercentage.label}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold text-md">
                              {row.discountPercentage.regular}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold text-md ">
                              Rs.{row.discountPercentage.bulk}
                            </h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold text-md">
                              Rs.{row.marketPrice}
                            </h1>
                          </TableCell>

                          <TableCell
                            align="center"
                            style={{ paddingLeft: "20px" }}
                          >
                            {" "}
                            <button
                              type="submit"
                              className="focus:outline-none bg-gamboge text-snow-900 text-base rounded border hover:border-transparent w-20 h-10 sm:w-80 sm:h-12"
                              style={{
                                boxShadow:
                                  "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                float: "right",
                                color: "white",
                              }}
                              onClick={() => {
                                setUpdateModalOpen(true);
                                setRemoveModalOpen(false);
                                setbookID(row._id);
                                setDiscountlable(row.discountPercentage.label);
                                setregularPercentage(
                                  row.discountPercentage.regular
                                );
                                setbulkPercentage(row.discountPercentage.bulk);
                              }}
                            >
                              Update
                            </button>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ paddingLeft: "20px" }}
                          >
                            {" "}
                            <button
                              type="submit"
                              className="focus:outline-none bg-ferrariRed text-snow-900 text-base rounded border hover:border-transparent w-20 h-10 sm:w-80 sm:h-12"
                              style={{
                                boxShadow:
                                  "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                float: "right",
                                color: "white",
                              }}
                              onClick={() => {
                                setUpdateModalOpen(true);
                                setRemoveModalOpen(true);
                                setbookID(row._id);
                              }}
                            >
                              Remove
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
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      {updateModalOpen && (
        <UpdateDiscountModal
          setModalVisible={setUpdateModalOpen}
          modalVisible={updateModalOpen}
          bookID={bookID}
          regularPercentage={regularPercentage}
          bulkPercentage={bulkPercentage}
          setDiscountlable={discountlable}
          removeModalOpen={removeModalOpen}
        />
      )}
    </div>
  );
};

export default AddedDiscounts;

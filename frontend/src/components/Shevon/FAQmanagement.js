import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import RefreshIcon from "@material-ui/icons/Refresh";
import EditCategoryModal from "./modals/EditCategoryModal";
import AddCategoryModal from "./modals/AddCategoryModal";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import DeleteCatModal from "./modals/DeleteCatModal";

const columns = [
  { id: "no", label: "No", minWidth: 15 },
  { id: "code", label: "ID", minWidth: 30 },
  { id: "categoryName", label: "Category Name", minWidth: 600 },
  { id: "action_1", label: "Action", minWidth: 80 },
  { id: "action_2", label: "Action", minWidth: 80 },
];

function createData(no, code, categoryName, faq) {
  return {
    no,
    code,
    categoryName,
    faq,
  };
}

/* const rows = [
  createData(1, "000001", "General FAQ"),
  createData(2, "000002", "Shipping and Delivery FAQ"),
  createData(3, "000003", "Biling FAQ"),
  createData(4, "000004", "Faulty Order FAQ"),
]; */

const FAQmanagement = () => {
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);
  const [selectedTuple, setSelectedTuple] = useState();
  const [getdata, setgetdata] = useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchedRows, setFetchedRows] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [CID, setCID] = useState();

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:6500/matrix/api/deliveryManager/getallcategory"
        );
        const data = response.data.FAQ.map((category, index) =>
          createData(index + 1, category._id, category.category, category.faq)
        );
        setFetchedRows(data);
        setSelectedRows(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const search = () => {
    setSelectedRows(
      fetchedRows.filter((row) => !row.categoryName.indexOf(searchKey.trim()))
    );
  };

  const refresh = () => {
    setSelectedRows(fetchedRows);
    setSearchKey("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Grid item xs={12}>
        <div className=" rounded-xl px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
          <header className="font-contentFont text-4xl mb-0 font-bold text-prussianBlue ">
            FAQ MANAGEMENT
          </header>
        </div>
      </Grid>

      <div className=" rounded-lg  mt-3 mx-0 px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
        <div className="rounded-xl   mt-0 mx-0 px-3 py-3 text-center border-0  shadow-md bg-white ">
          <div className="rounded-lg flex bg-gray-100">
            <div className="flex-initial  text-center  ml-4 mt-4 py-2 m-2">
              Search Order ID:
            </div>
            <div className="flex-initial px-0 py-2 m-2">
              <input
                className="ml-0 mt-0  border-1 bg-gray-200 appearance-none border-2 border-gamboge rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-halloweenOrange"
                id="inline-full-name"
                type="text"
                name="searchKey"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              ></input>
            </div>

            <div className=" flex-initial px-0 py-2 m-2">
              <button
                className="bg-gamboge hover:bg-halloweenOrange text-white font-bold py-2 px-4 rounded-full"
                onClick={search}
              >
                Search
              </button>
            </div>

            <div className="text-black  px-0 py-0 m-4">
              <Icon
                className="text-gray-500  hover:text-halloweenOrange"
                onClick={refresh}
              >
                <RefreshIcon />
              </Icon>
            </div>
          </div>
          <div className=" flex flex-row-reverse px-0 m-3">
            <div>
              <button
                className="bg-gamboge hover:bg-halloweenOrange text-white font-bold pb-1 px-4 rounded-full"
                onClick={() => {
                  setEditCategoryOpen(false);
                  setAddCategoryOpen(true);
                }}
              >
                <Icon className="mr-4">
                  <AddCircleRoundedIcon />
                </Icon>
                ADD NEW CATEGORY
              </button>
            </div>
          </div>
          <Paper className="mt-0">
            <TableContainer style={{ maxHeight: "440px" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#065774",
                          opacity: "85%",
                          color: "white",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                                {column.id === "action_1" && (
                                  <Icon
                                    className="ml-2 hover:text-green-700"
                                    onClick={() => {
                                      setAddCategoryOpen(false);
                                      setDeleteCategoryOpen(false);
                                      setEditCategoryOpen(true);
                                      setSelectedTuple(row.code);
                                      setgetdata(row.categoryName);
                                      setQuestions(
                                        selectedRows.filter(
                                          (inner) => inner.code === row.code
                                        )[0].faq
                                      );
                                      setCID(row.code);
                                    }}
                                  >
                                    <EditIcon />
                                  </Icon>
                                )}

                                {column.id === "action_2" && (
                                  <Icon
                                    className="ml-2 hover:text-ferrariRed"
                                    onClick={() => {
                                      setAddCategoryOpen(false);
                                      setEditCategoryOpen(false);
                                      setDeleteCategoryOpen(true);
                                      setSelectedTuple(row.code);
                                    }}
                                  >
                                    <DeleteForeverIcon />
                                  </Icon>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={setSelectedRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>

      {editCategoryOpen && (
        <EditCategoryModal
          modalVisible={editCategoryOpen}
          setModalVisible={setEditCategoryOpen}
          selectedTuple={selectedTuple}
          getdata={getdata}
          setSelectedRows={setSelectedRows}
          setFetchedRows={setFetchedRows}
          useQuestions={[questions, setQuestions]}
          CID={CID}
        />
      )}

      {addCategoryOpen && (
        <AddCategoryModal
          modalVisible={addCategoryOpen}
          setModalVisible={setAddCategoryOpen}
          setSelectedRows={setSelectedRows}
        />
      )}

      {deleteCategoryOpen && (
        <DeleteCatModal
          modalVisible={deleteCategoryOpen}
          setModalVisible={setDeleteCategoryOpen}
          selectedTuple={selectedTuple}
          setSelectedRows={setSelectedRows}
          setFetchedRows={setFetchedRows}
        />
      )}
    </div>
  );
};

export default FAQmanagement;

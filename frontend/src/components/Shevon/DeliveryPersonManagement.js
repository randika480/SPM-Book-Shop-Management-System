import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import WorkIcon from "@material-ui/icons/Work";
import Grid from "@material-ui/core/Grid";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddDPersonModal from "./modals/AddDPersonModal";
import EditDPersonModal from "./modals/EditDPersonModal";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import DeleteDpersonModal from "./modals/DeleteDpersonModal";
import DpOrderModal from "./modals/DpOrderModal";

const columns = [
  { id: "no", label: "No", minWidth: 15 },
  { id: "userId", label: "UserID", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 160 },
  { id: "mobile", label: "Mobile", minWidth: 30 },
  /*  { id: "password", label: "Password", minWidth: 80 }, */
  { id: "action_1", label: "Orders ", minWidth: 80 },
  { id: "action_2", label: " Edit", minWidth: 80 },
  { id: "action_3", label: "Delete", minWidth: 80 },
];

function createData(no, userId, name, email, mobile, deliveryHistory) {
  return {
    no,
    userId,
    name,
    email,
    mobile,
    deliveryHistory,
  };
}

const DeliveryPersonManagement = () => {
  const [addDPersonOpen, setAddDPersonOpen] = useState(false);
  const [editDPersonOpen, setEditDPersonOpen] = useState(false);
  const [deleteOpen, setdeleteOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [fetchedRows, setFetchedRows] = useState([]);
  const [DPID, setDPID] = useState();
  const [dpname, setdpname] = useState();
  const [getalldata, setgetalldata] = useState([]);
  const [DporderOpen, setDporderOpen] = useState(false);
  const [Orderdata, setOrderdata] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:6500/matrix/api/deliveryManager/getalldp"
        );
        const data = response.data.DeliveryPerson.map((dperson, index) =>
          createData(
            index + 1,
            dperson._id,
            dperson.username,
            dperson.email,
            dperson.phone,
            dperson.deliveryHistory
          )
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
      fetchedRows.filter((row) => !row.name.indexOf(searchKey.trim()))
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
            DELIVERY PERSON MANAGEMENT
          </header>
        </div>
      </Grid>

      <div className=" rounded-lg  mt-3 mx-0 px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
        <div className="rounded-xl   mt-0 mx-0 px-3 py-3 text-center border-0  shadow-md bg-white ">
          <div className="rounded-lg flex bg-gray-100">
            <div className="flex-initial  text-center  ml-4 mt-4 py-2 m-2">
              Search user name:
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
                className="bg-gamboge hover:bg-halloweenOrange text-white font-bold  px-4 pb-1 rounded-full"
                onClick={() => {
                  setEditDPersonOpen(false);
                  setAddDPersonOpen(true);
                }}
              >
                <Icon className="mr-4">
                  <AddCircleRoundedIcon />
                </Icon>
                ADD NEW USER
              </button>
            </div>
          </div>
          <Paper className="mt-0">
            <TableContainer style={{ maxHeight: "440px" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
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
                                    className="ml-2 hover:text-yellow-700"
                                    onClick={() => {
                                      setAddDPersonOpen(false);
                                      setdeleteOpen(false);
                                      setEditDPersonOpen(false);
                                      setDporderOpen(true);
                                      setgetalldata(row);
                                      setOrderdata(row.deliveryHistory);
                                    }}
                                  >
                                    <WorkIcon />
                                  </Icon>
                                )}
                                {column.id === "action_2" && (
                                  <Icon
                                    className="ml-2 hover:text-green-700"
                                    onClick={() => {
                                      setAddDPersonOpen(false);
                                      setdeleteOpen(false);
                                      setEditDPersonOpen(true);
                                      /*  setDPID(row.userId); */
                                      setgetalldata(row);
                                    }}
                                  >
                                    <EditIcon />
                                  </Icon>
                                )}

                                {column.id === "action_3" && (
                                  <Icon
                                    className="ml-2 hover:text-ferrariRed"
                                    onClick={() => {
                                      setAddDPersonOpen(false);
                                      setEditDPersonOpen(false);
                                      setdeleteOpen(true);
                                      setDPID(row.userId);
                                      setdpname(row.name);
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

      {addDPersonOpen && (
        <AddDPersonModal
          modalVisible={addDPersonOpen}
          setModalVisible={setAddDPersonOpen}
          setSelectedRows={setSelectedRows}
        />
      )}

      {DporderOpen && (
        <DpOrderModal
          modalVisible={DporderOpen}
          setModalVisible={setDporderOpen}
          getalldata={{ ...getalldata }}
          Orderdata={Orderdata}
        />
      )}

      {editDPersonOpen && (
        <EditDPersonModal
          modalVisible={editDPersonOpen}
          setModalVisible={setEditDPersonOpen}
          setSelectedRows={setSelectedRows}
          setFetchedRows={setFetchedRows}
          getalldata={{ ...getalldata }}
        />
      )}
      {deleteOpen && (
        <DeleteDpersonModal
          modalVisible={deleteOpen}
          setModalVisible={setdeleteOpen}
          DPID={DPID}
          dpname={dpname}
          setSelectedRows={setSelectedRows}
          setFetchedRows={setFetchedRows}
        />
      )}
    </div>
  );
};

export default DeliveryPersonManagement;

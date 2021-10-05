import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditWholeSale from "./modals/EditWholeSale";

const columns = [
  { id: "no", label: "No", minWidth: 15 },
  { id: "invoiceId", label: "InvoiceID", minWidth: 40 },
  { id: "shopName", label: "ShopName", minWidth: 50 },
  { id: "orderDate", label: "OrderDate", minWidth: 80 },
  { id: "payment", label: "Payment", minWidth: 80 },
  { id: "paymentStatus", label: "PaymentStatus", minWidth: 80 },
  { id: "action_1", label: "Action", minWidth: 80 },
  { id: "action_2", label: "Action", minWidth: 80 },
];

function createData(
  no,
  invoiceId,
  shopName,
  orderDate,
  payment,
  paymentStatus
) {
  return {
    no,
    invoiceId,
    shopName,
    orderDate,
    payment,
    paymentStatus,
  };
}

const rows = [
  createData(
    1,
    "000001",
    "SarasaviBookShop",
    "18/9/2021",
    "16500.00",
    "Pending"
  ),
  createData(
    2,
    "000002",
    "GunasenaBookShop",
    "15/9/2021",
    "25000.00",
    "Pending"
  ),
  createData(3, "000003", "GodageBookShop", "25/9/2021", "15000.00", "Pending"),
  createData(4, "000004", "VijithaYapa", "8/10/2021", "15600.00", "Pending"),
  createData(5, "000005", "MakeenBooks", "9/9/2021", "85000.00", "Pending"),
  createData(6, "000006", "Barefoot", "8/5/2021", "45000.00", "Pending"),
  createData(7, "000007", "RohanBooks", "3/9/2021", "65000.00", "Pending"),
  createData(
    8,
    "000008",
    "SarasaviBookShop",
    "8/11/2021",
    "12000.00",
    "Pending"
  ),
  createData(9, "000009", "RandikaBookShop", "6/9/2021", "65000.00", "Pending"),
  createData(10, "000010", "AdiBookShop", "1/9/2021", "55000.00", "Pending"),
  createData(
    11,
    "000011",
    "DeshaniBookShop",
    "8/10/2021",
    "45000.00",
    "Pending"
  ),
  createData(12, "000012", "Mark Taylor", "8/9/2021", "65000.00", "Pending"),
];

const WholesaleManagement = () => {
  const [editDPersonOpen, setEditDPersonOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <Paper class=" rounded-xl px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
          <header class="font-contentFont text-4xl mb-0 font-bold text-prussianBlue ">
            Wholesale Management
          </header>
        </Paper>
      </Grid>

      <div class=" rounded-lg  mt-3 mx-0 px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
        <div class="rounded-xl   mt-0 mx-0 px-3 py-3 text-center border-0  shadow-md bg-white ">
          <div class="rounded-lg flex bg-gray-100 mb-3">
            <div class="flex-initial  text-center  ml-4 mt-4 py-2 m-2">
              Search Order ID:
            </div>
            <div class="flex-initial px-0 py-2 m-2">
              <input
                class="ml-0 mt-0  border-1 bg-gray-200 appearance-none border-2 border-gamboge rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-halloweenOrange"
                id="inline-full-name"
                type="text"
              ></input>
            </div>

            <div class=" flex-initial px-0 py-2 m-2">
              <button class="bg-gamboge hover:bg-halloweenOrange text-white font-bold py-2 px-4 rounded-full">
                Search
              </button>
            </div>

            <div class="text-black  px-0 py-2 m-4">
              <icon class="text-gray-500  hover:text-halloweenOrange">
                <RefreshIcon />
              </icon>
            </div>
          </div>

          <Paper class="mt-0">
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
                  {rows
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
                                  <icon
                                    className="ml-2 hover:text-green-700"
                                    onClick={() => {
                                      setEditDPersonOpen(true);
                                    }}
                                  >
                                    <EditIcon />
                                  </icon>
                                )}

                                {column.id === "action_2" && (
                                  <icon className="ml-2 hover:text-ferrariRed">
                                    <DeleteForeverIcon />
                                  </icon>
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>

      {editDPersonOpen && (
        <EditWholeSale
          modalVisible={editDPersonOpen}
          setModalVisible={setEditDPersonOpen}
        />
      )}
    </div>
  );
};

export default WholesaleManagement;

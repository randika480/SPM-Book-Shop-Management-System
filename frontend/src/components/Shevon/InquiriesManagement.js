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
import ReplyIcon from "@material-ui/icons/Reply";
import RefreshIcon from "@material-ui/icons/Refresh";
import ReplyInquiriesModal from "./modals/ReplyInquiriesModal";
import Icon from "@material-ui/core/Icon";
import ReplyedModal from "./modals/ReplyedModal";
import axios from "axios";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const columns = [
  { id: "no", label: "No", minWidth: 15 },
  { id: "code", label: "ID", minWidth: 30 },
  { id: "customerEmail", label: "CustomerEmail", minWidth: 50 },
  { id: "mobileNo", label: "Mobile Number", minWidth: 60 },
  { id: "message", label: "Message", minWidth: 390 },
  { id: "action1", label: "Action1", minWidth: 80 },
  { id: "action2", label: "Action2", minWidth: 80 },
];

function createData(no, code, customerEmail, mobileNo, message, cDate, reply) {
  return {
    no,
    code,
    customerEmail,
    mobileNo,
    message,
    reply,
    cDate,
  };
}

const InquiriesManagement = () => {
  const [replyInquiriesOpen, setReplyInquiriesOpen] = useState(false);
  const [replyedOpen, setReplyedOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchedRows, setFetchedRows] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [rowid, setrowid] = useState();
  const [getemail, setgetemail] = useState();
  const [reply, setreply] = useState([]);
  const [getinqiur, setgetinqiur] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:6500/matrix/api/deliveryManager/getallinquiries"
        );
        const data = response.data.data
          .filter((data) => data.department === "delivery")
          .map((inquiry, index) =>
            createData(
              index + 1,
              inquiry._id,
              inquiry.email,
              inquiry.mobileNumber,
              inquiry.description,
              inquiry.createdAt,
              inquiry.reply
            )
          );
        console.log(data);
        setFetchedRows(data);
        setSelectedRows(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const search = () => {
    setSelectedRows(
      fetchedRows.filter((row) => !row.code.indexOf(searchKey.trim()))
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
            CUSTOMER INQUIRIES MANAGEMENT
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
                                {column.id === "action1" && (
                                  <Icon
                                    className="ml-2 hover:text-gamboge"
                                    onClick={() => {
                                      setReplyInquiriesOpen(false);
                                      setReplyedOpen(true);
                                      setgetinqiur(row);
                                      setreply(row.reply);
                                    }}
                                  >
                                    <AttachFileIcon />
                                  </Icon>
                                )}
                                {column.id === "action2" && (
                                  <Icon
                                    className="ml-2 hover:text-gamboge"
                                    onClick={() => {
                                      setReplyedOpen(false);
                                      setReplyInquiriesOpen(true);
                                      setrowid(row.code);
                                      setgetemail(row.customerEmail);
                                    }}
                                  >
                                    <ReplyIcon />
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
      {replyInquiriesOpen && (
        <ReplyInquiriesModal
          modalVisible={replyInquiriesOpen}
          setModalVisible={setReplyInquiriesOpen}
          rowid={rowid}
          getemail={getemail}
        />
      )}
      {replyedOpen && (
        <ReplyedModal
          modalVisible={replyedOpen}
          setModalVisible={setReplyedOpen}
          useReply={reply}
          getinqiur={{ ...getinqiur }}
        />
      )}
    </div>
  );
};

export default InquiriesManagement;

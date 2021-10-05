import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles({
  table: {
    minWidth: 30,
    fontWeight: "bold",
  },
});

function createData(msg, avatar) {
  return { msg, avatar };
}

const rows = [
  createData("Send Revenue Report"),
  createData("Check Emails"),
  createData("Send Top Selling Book Ids"),
  createData("Contact me"),
];

const makeAlert = () => {
  alert("done");
};

const NotificationTable = () => {
  const classes = useStyles();
  return (
    <div className="w-full pt-10 h-full ">
      <div className="w-4/5 m-auto h-full bg-white shadow-2xl pt-8">
        <h1 className="text-center font-bold font-sans pl-3 pr-3">Notifications</h1>
        <IconButton
          aria-label="settings"
          style={{ float: "right" }}
          onClick={() => {
            makeAlert();
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <div className="w-full m-auto h-4/5 p-10">
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {/* <TableCell>To Do</TableCell>
                  <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    
                    <TableCell align="left"> <Avatar/> </TableCell>
                    <TableCell align="left">{row.msg}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;

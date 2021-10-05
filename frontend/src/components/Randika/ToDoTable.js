import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddToDoModal from "./AddToDoModal";

const useStyles = makeStyles({
  table: {
    minWidth: 30,
    fontWeight: "bold",
  },
});

const ToDoTable = () => {
  const classes = useStyles();

  const [ToDos, setToDos] = useState([]);
  const [addToDoModalOpen, setaddToDoModalOpen] = useState(false);

  const DeleteToDo = async (toDo) => {
    let dataObject = {
      toDoItem: toDo,
      id: "60feedba33e9090a206c9381",
    };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios
        .put(
          "http://localhost:6500/matrix/api/admin/removeToDos",
          dataObject,
          config
        )
        .then(() => {
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  const getToDos = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getAdmin", config)
        .then((res) => {
          setToDos(res.data.Admin.toDos);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <div className="w-full pt-1 h-auto bg-white shadow-2xl ">
      <div className="w-4/5 m-auto h-full  ">
        <div className="w-full">
          <div className="w-2/3 float-left">
            <h1 className=" text-left font-bold font-sans mt-3">To Do</h1>
          </div>
          <div className="w-1/3 float-left">
            {" "}
            <IconButton
              aria-label="settings"
              style={{ float: "right" }}
              onClick={() => {
                setaddToDoModalOpen(true);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="w-full m-auto h-4/5 pb-3 ">
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead className=" bg-prussianBlue">
                <TableRow>
                  <TableCell style={{ color: "white" }}>To Do</TableCell>
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ToDos.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left"><h1 className="font-bold text-md">{row.toDoItem}</h1></TableCell>
                    <TableCell align="left">
                      <Checkbox
                        inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                        onClick={() => {
                          DeleteToDo(row.toDoItem);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {addToDoModalOpen && (
        <AddToDoModal
          setModalVisible={setaddToDoModalOpen}
          modalVisible={addToDoModalOpen}
        />
      )}
    </div>
  );
};

export default ToDoTable;

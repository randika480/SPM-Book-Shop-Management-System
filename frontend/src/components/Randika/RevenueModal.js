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
import { Modal } from "react-responsive-modal";

import { Image } from "cloudinary-react";

const useStyles = makeStyles({
  table: {
    minWidth: 30,
    fontWeight: "bold",
  },
});

const RevenueModal = ({ setModalVisible, modalVisible, currentOrder }) => {
  const classes = useStyles();
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
          maxWidth: "800px",
          width: "100%",
        },
      }}
      focusTrapped={true}
    >
      <div className="w-full pt-4 h-auto mb-5 bg-white shadow-2xl">
        <div className="w-full4/5 m-auto h-full  pt-3">
          <h1 className="font-bold text-lg font-boldTallFont">Order Items</h1>
          <div className="w-full m-auto h-4/5 p-5">
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead className="bg-prussianBlue font-white">
                  <TableRow>
                    <TableCell align="center" style={{ color: "white" }}>
                      Index
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Book
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Items
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      NetTot
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentOrder.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>

                      <TableCell align="center">
                        {" "}
                        {row.productID && (
                          <div className="border-blue-900 w-max h-auto m-auto  p-1">
                            {" "}
                            <Image
                              className="w-max h-full object-contain "
                              cloudName="grid1234"
                              publicId={row.productID.bookImage.imagePublicId}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.productID && (
                          <h1 className="font-bold text-md">
                            {row.productID.publishingTitle}
                          </h1>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <h1 className="font-bold text-md">{row.quantity}</h1>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RevenueModal;

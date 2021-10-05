import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

function createData(col1, col2, col3, col4, col5) {
  return {
    col1,
    col2,
    col3,
    col4,
    col5,
  };
}

const InventoryManagerProfile = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      await axios
        .get("http://localhost:6500/matrix/api/inventoryManager/get-books")
        .then((res) => {
          const data = res.data.allBooks.map((item, index) =>
            createData(
              index + 1,
              item.publishingTitle,
              item.ISBN,
              item.marketPrice,
              item.charges.printCost
            )
          );
          setTableData(data);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
    getAllBooks();
  }, []);

  const generatePDF = (tickets) => {
    const doc = new jsPDF();

    const tableColumn = [
      "No.",
      "Publishing title",
      "ISBN",
      "Market Price",
      "Total investment",
    ];

    const tableRows = [];

    //for each ticket pass all its data into an array
    tickets.forEach((ticket) => {
      const ticketData = [
        ticket.col1,
        ticket.col2,
        ticket.col3,
        ticket.col4,
        ticket.col5,

        //called to format the date on the ticket
        moment(new Date()).format("DD/MM/YYYY"),
      ];
      //push each ticket info into a row
      tableRows.push(ticketData);
    });

    //startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    //we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    //ticket title. and margin-top + margin-left
    doc.text("INVENTORY LEDGER REPORT", 14, 15);
    //we define the name of our PDF file.
    doc.save(`LedgerReport_${dateStr}.pdf`);
  };

  return (
    <div>
      <Grid item xs={12}>
        <Paper className=" rounded-xl px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
          <header className="font-contentFont text-4xl mb-3 font-bold text-prussianBlue ">
            Profile Information
          </header>
        </Paper>
      </Grid>
      <div className="grid grid-row-3 space-y-10">
        <div className="rounded-xl my-1 mx-1 px-5 py-5   shadow-md bg-blueSapphire bg-opacity-10">
          <h6 className="ml-4 mt-0 mb-2 font-black text-lg">
            Personal Details
          </h6>

          <div className="grid grid-row-2">
            <div className="grid grid-cols-3 ">
              <div className="grid grid-rows-3">
                <div className="rounded-l-xl my-1 ml-10 mr-2 px-5 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className="font-black text-blueSapphire text-md">
                    FullName
                  </h6>
                </div>
                <div className="rounded-l-xl my-1 ml-10 mr-2 px-5 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-black text-blueSapphire text-md">
                    Email Address
                  </h6>
                </div>
                <div className="rounded-l-xl my-1 ml-10 mr-2 px-5 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-black text-blueSapphire text-md">
                    Mobile Number
                  </h6>
                </div>
              </div>

              <div className="col-span-2 grid grid-rows-3">
                <div className="rounded-r-xl my-1 mr-20 px-4 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-medium text-md">Adithya Kahawanugoda</h6>
                </div>
                <div className="rounded-r-xl my-1  mr-20 px-4 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-medium text-md">
                    adithyainventory@gmail.com
                  </h6>
                </div>
                <div className="rounded-r-xl my-1  mr-20 px-4 py-4 shadow-md bg-white bg-opacity-20">
                  <h6 className=" font-medium text-md">+94772480467</h6>
                </div>
              </div>
            </div>

            <div className="rounded-xl mt-6 mb-0 text-right">
              <button className="bg-blueSapphire hover:bg-prussianBlue text-md text-white font-bold py-3 px-8 rounded-full">
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-xl my-1 mx-1 px-5 py-5 w-1/3 shadow-md bg-prussianBlue bg-opacity-30">
          <div className="grid grid-cols-2">
            <div>
              <h6 className="ml-4 mt-2 font-black text-lg">
                Generate Ledger Report
              </h6>
            </div>
            <div className=" mt-0 mb-0 text-right">
              <button
                className="bg-blueSapphire hover:bg-prussianBlue text-md text-white font-bold py-3 px-6 rounded-full"
                onClick={() => generatePDF(tableData)}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagerProfile;

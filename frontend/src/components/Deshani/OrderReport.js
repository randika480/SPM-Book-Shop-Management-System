import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const generatePDF = (orders) => {
  const doc = new jsPDF();

  const tableColumn = [
    "Order ID",
    "Product",
    "Delivery Fee",
    "Total Ammount",
    "Date",
  ];

  const tableRows = [];

  orders.forEach((order, index) => {
    const ticketData = [
      order._id,
      order.orderData[0].productID.publishingTitle,
      order.deliveryFee,
      order.billAmount + order.deliveryFee,
      moment(order.purchasedDate).format("DD/MM/YYYY"),
    ];

    tableRows.push(ticketData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  const formatedDate = moment(new Date()).format("DD/MM/YYYY");
  doc.text("Order Receipt ( Generated  " + formatedDate + ")", 14, 15);

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;

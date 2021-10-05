import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const generatePDF = (orders, type) => {
  const doc = new jsPDF();

  const tableColumn = ["Index", "ID", "Items", "Bill Amount", "Purchased Date"];

  const tableRows = [];

  orders.forEach((order, index) => {
    const reportData = [
      index + 1,
      order._id,
      order.orderData.length,
      order.billAmount,
      moment(order.purchasedDate).format("DD/MM/YYYY"),
    ];

    tableRows.push(reportData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  const formatedDate = moment(new Date()).format("DD/MM/YYYY");

  doc.text("Order History ( Generated " + formatedDate + ")", 14, 15);

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;

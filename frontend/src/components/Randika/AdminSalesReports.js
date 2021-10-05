import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const generatePDF = (books) => {
  const doc = new jsPDF();

  const tableColumn = ["Index", "ID", "Book Title", "Author", "count"];

  const tableRows = [];

  books.forEach((book, index) => {
    const bookData = [
      index + 1,
      book.book,
      book.bookName,
      book.author,
      book.count,

      moment(new Date()).format("DD/MM/YYYY"),
    ];

    tableRows.push(bookData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  const formatedDate = moment(new Date()).format("DD/MM/YYYY");
  doc.text("Total Sales ( Generated  " + formatedDate + ")", 14, 15);

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;

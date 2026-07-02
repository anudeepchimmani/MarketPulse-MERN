import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ================= EXPORT TO PDF =================

export const exportToPDF = (
  title,
  headers,
  data,
  fileName
) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  // Date
  doc.setFontSize(10);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    28
  );

  // Table
  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 35,
    theme: "grid",
    headStyles: {
      fillColor: [25, 135, 84],
    },
    styles: {
      fontSize: 10,
    },
  });

  doc.save(`${fileName}.pdf`);
};

// ================= EXPORT TO EXCEL =================

export const exportToExcel = (
  data,
  fileName
) => {
  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Sheet1"
  );
    const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }
  );

  saveAs(
    file,
    `${fileName}.xlsx`
  );
};
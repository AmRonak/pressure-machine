"use client";

import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import TestReport from "@/components/Report/TestReport";

const page = () => {
  const measurementData = Array.from({ length: 120 }, (_, index) => ({
    id: index + 1,
    value: "1234",
  }));

  const rows = [];
  for (let i = 0; i < measurementData.length; i += 7) {
    rows.push(measurementData.slice(i, i + 7));
  }

  // Function to download the table as a PDF
  const downloadPDF = async () => {
    const element = document.getElementById("report-content");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // Width of the PDF page
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("TestReport.pdf");
  };

  return (
    <>
      <div
        id="report-content"
        className="container mx-auto font-sans mt-10 border-4 border-black"
      >
        <TestReport />
      </div>

      <div className="text-center my-4">
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
        >
          Download as PDF
        </button>
      </div>
    </>
  );
};

export default page;

"use client";

import React, { useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import TestReport from "@/components/Report/TestReport";

// Optionally memoize TestReport if it's a pure component
// const MemoizedTestReport = React.memo(TestReport);

const Page = () => {
  const reportRef = useRef(null);

  // Dynamically import heavy libraries only when needed
  const downloadPDF = useCallback(async () => {
    const [{ default: jsPDF }, html2canvas] = await Promise.all([
      import("jspdf"),
      import("html2canvas"),
    ]);
    const element = reportRef.current;
    if (!element) return;
    const canvas = await html2canvas.default(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("TestReport.pdf");
  }, []);

  return (
    <>
      <div
        id="report-content"
        ref={reportRef}
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

export default Page;
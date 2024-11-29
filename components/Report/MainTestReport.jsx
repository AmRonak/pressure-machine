/* eslint-disable react/display-name */
'use client'

import React, { useEffect, useRef } from "react";
import TestReport from "@/components/Report/TestReport";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MainTestReport = ({searchData, handleDownloadPDF}) => {
  const hiddenContentRef = useRef(null);
  const measurementData = Array.from({ length: 120 }, (_, index) => ({
    id: index + 1,
    value: '1234',
  }));

  const rows = [];
  for (let i = 0; i < measurementData.length; i += 7) {
    rows.push(measurementData.slice(i, i + 7));
  }

  const downloadPDF = async () => {
    const container = hiddenContentRef.current;
    const pdf = new jsPDF("p", "mm", "a4");

    const elements = Array.from(container.children); // All rendered children (MainTestReport components)

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      // Temporarily show the element (off-screen)
      element.style.position = "absolute";
      element.style.visibility = "visible";
      element.style.top = "-9999px";

      // Render the element into a canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Improves quality by increasing resolution
        useCORS: true, // Enables cross-origin images if needed
      });

      const imgData = canvas.toDataURL("image/jpeg"); // Compressed JPEG (70% quality)
      const imgWidth = 190; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Single page content
      pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);


      // Add a new page for the next report, except the last one
      if (i < elements.length - 1) pdf.addPage();

      // Hide the element again after capturing
      element.style.position = "static";
      element.style.visibility = "hidden";
    }

    pdf.save("AllTestReports.pdf");
  };

  useEffect(() => {
    if (handleDownloadPDF) {
      handleDownloadPDF(downloadPDF);
    }
  }, [handleDownloadPDF]);

  return (
    <>
      {searchData.length > 0 && (
        <p className="text-center font-bold text-2xl">
          There are {searchData.length} number of reports available to download.
        </p>
      )}
      <div ref={hiddenContentRef} className="absolute invisible">
        {searchData.map(({
          id,
          batchid,
          userid,
          deviceid,
          starttesttime,
          endtesttime,
          data
        }) => (
          <div
            id="report-content"
            key={id}
            className="container mx-auto font-sans mt-2 border-4 border-black"
          >
            <TestReport
              id={id}
              batchid={batchid}
              userid={userid}
              deviceid={deviceid}
              starttesttime={starttesttime}
              endtesttime={endtesttime}
              data={data}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MainTestReport;

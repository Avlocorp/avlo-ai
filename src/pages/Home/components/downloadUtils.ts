/**
 * Downloads a blob as a file with the specified filename
 */
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Generates a filename for the PDF download based on date range
 */
export const generatePdfFilename = (startDate?: string, endDate?: string) => {
  const start = startDate
    ? new Date(startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "All";

  const end = endDate
    ? new Date(endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Time";

  return `Business-Dashboard-${start}-to-${end}.pdf`;
};

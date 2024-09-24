import React from 'react';

function convertToCSV(data) {
    const headers = Object.keys(data[0]);
    const csvRows = data.map(row => 
        headers.map(header => row[header]).join(",")
    );
    return [headers.join(","), ...csvRows].join("\n");
}

function DownloadCSVButton({ data }) {
    const downloadCSV = () => {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <button onClick={downloadCSV}>Download CSV</button>
    );
}

export default DownloadCSVButton;
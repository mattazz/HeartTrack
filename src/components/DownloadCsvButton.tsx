import React from 'react';


//Converts object data back into CSV to prepare for user download
function convertToCSV(data) {
    const headers = Object.keys(data[0]);
    const csvRows = data.map(row => 
        headers.map(header => row[header]).join(",")
    );
    return [headers.join(","), ...csvRows].join("\n");
}

function DownloadCSVButton({ data }) {
    const handleDownload = () => {
        // Converts the data back to CSV format
        const csvData = convertToCSV(data);
        
        // Creates a new Blob object using the CSV data and specifies the MIME type as text/csv
        const blob = new Blob([csvData], { type: "text/csv" });
        
        // Creates a URL for the Blob object
        const url = URL.createObjectURL(blob);
        
        // Creates a temporary anchor element
        const a = document.createElement("a");
        
        // Sets the href attribute of the anchor to the Blob URL
        a.href = url;
        
        // Sets the download attribute of the anchor to specify the name of the file to be downloaded
        a.download = "data.csv";
        
        // Appends the anchor to the document body
        document.body.appendChild(a);
        
        // Programmatically clicks the anchor to trigger the download
        a.click();
        
        // Removes the anchor from the document body
        document.body.removeChild(a);
    };

    return (
        <button onClick={handleDownload}>Download CSV</button>
    );
}

export default DownloadCSVButton;
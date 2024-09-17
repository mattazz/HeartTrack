import React from "react";
import { useCSVReader } from "react-papaparse";

export default function CsvImporter({ setData, data = [] }) {
    const { CSVReader } = useCSVReader();

    function parseCSVData(csvData) {
        const headers = csvData[0];
        return csvData.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            return obj;
        });
    }

    function convertToCSV(data) {
        const headers = Object.keys(data[0]);
        const csvRows = data.map(row => headers.map(header => row[header]).join(","));
        return [headers.join(","), ...csvRows].join("\n");
    }

    function downloadCSV() {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <CSVReader
            onUploadAccepted={(results) => {
                const result = results.data;
                console.log(results);
                console.log(result);
                
                const parsedData = parseCSVData(result);
                console.log(`ParsedData from CSV: ${JSON.stringify(parsedData)}`);
                
                setData(parsedData);
            }}
        >
            {({ getRootProps, acceptedFile }) => (
                <div>
                    <button {...getRootProps()}>Upload CSV</button>
                    {acceptedFile && <p>{acceptedFile.name}</p>}
                    {data.length > 0 && <button onClick={downloadCSV}>Download CSV</button>}
                </div>
            )}
        </CSVReader>
    );
}
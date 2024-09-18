import React from "react";
import { useCSVReader } from "react-papaparse";

export default function CsvImporter({ setData, data = [] }) {
    const { CSVReader } = useCSVReader();

    function parseCSVData(csvData) {
        // console.log(`CSV Parsing: ${csvData}`);
        
        const headers = csvData[0]; // stores csv header 
        // console.log(`CSV Header: ${headers}`);
        
        // slice(1) skips the first row
        //map then iterates over each row
        // [date], [weight]
        return csvData.slice(1).map(row => {
            // console.log(`csvData.slice(1).map = ${row}`);
            const obj = {};
            //forEach loop in headers:  [date],[0] | [date],[1] | [weight],[0] | [weight],[1]
            headers.forEach((header, index) => {
                // console.log(`header: ${header}, index: ${index}`);
                obj[header] = row[index];
                // console.log(`row[index] = ${row[index]}`);
                // console.log(`final object: ${JSON.stringify(obj)}`);
            });
            return obj;
        });
    }
    
    function convertToCSV(data) {
        // Extract headers from the first row of data
        const headers = Object.keys(data[0]);
        console.log(`ConvertToCSV - Object.keys(data[0]): ${JSON.stringify(Object.keys(data[0]))}`);
    
        // Map over each row of data
        const csvRows = data.map(row =>             
            // Map over each header to get the corresponding value in the row
            headers.map(header => {
                console.log(`row[header] = ${row[header]}`);
                return row[header];
            }).join(",")
        );
    
        // Combine headers and rows into a single CSV string
        return [headers.join(","), ...csvRows].join("\n");
    }

    function downloadCSV() {
        const csvData = convertToCSV(data);
        console.log(csvData);
        
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
                    {/* {acceptedFile && <p>{acceptedFile.name}</p>} */}
                    {data.length > 0 && <button onClick={downloadCSV}>Download CSV</button>}
                </div>
            )}
        </CSVReader>
    );
}
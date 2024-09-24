import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import DownloadCSVButton from './DownloadCsvButton';
import HeartChart from './HeartChart';

function CsvImporter() {
    //Data to store csv import
    const [data, setData] = useState([]);
    const { CSVReader } = useCSVReader(); //using react-papaparse library

    function parseCSVData(csvData) {
        // extract the headers = csvData[0] = ["Date", "Weight"]
        const headers = csvData[0]; 

        // [
        //     ["2023-01-01", "70"],
        //     ["2023-01-02", "71"],
        //     ["2023-01-03", "69"]
        // ]

        const csvRows = csvData.slice(1).map(row => { //slicing it to exclude the headers which is csvData[0]
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index]; //ex. obj["weight"] = row[0] = "70"
            });
            return obj;
        });

        // will return an array of objects
        // const csvRows = [
        // {Date: "2023-01-01", Weight: "70"}
        // {Date: "2023-01-02", Weight: "71"}
        // {Date: "2023-01-03", Weight: "69"}
        // ]
        return csvRows;
    }

    return (
        <div>
            <CSVReader
                onUploadAccepted={(results) => {
                    const result = results.data;
                    const parsedData = parseCSVData(result);
                    console.log(`Parsed Data: ${JSON.stringify(parsedData)}`);
                    setData(parsedData);
                }}
            >
                {({ getRootProps, acceptedFile, getRemoveFileProps }) => (
                    <>
                        <div {...getRootProps()} style={{ border: '1px dashed gray', padding: '10px', cursor: 'pointer' }}>
                            {acceptedFile ? acceptedFile.name : 'Click to upload CSV'}
                        </div>
                        {acceptedFile && (
                            <button {...getRemoveFileProps()} style={{ marginTop: '10px' }}>
                                Remove
                            </button>
                        )}
                    </>
                )}
            </CSVReader>
            <DownloadCSVButton data={data} />
            <HeartChart data={data} />
        </div>
    );
}

export default CsvImporter;
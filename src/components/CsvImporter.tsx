import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import DownloadCSVButton from './DownloadCsvButton';
import HeartChart from './HeartChart';

function CsvImporter() {
    const [data, setData] = useState([]);
    const { CSVReader } = useCSVReader();

    function parseCSVData(csvData) {
        const headers = csvData[0];
        const csvRows = csvData.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            return obj;
        });
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
                {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
                    <>
                        <div {...getRootProps()} style={{ border: '1px dashed gray', padding: '10px', cursor: 'pointer' }}>
                            {acceptedFile ? acceptedFile.name : 'Click to upload CSV'}
                        </div>
                        <ProgressBar />
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
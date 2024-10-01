import { useState } from "react"
import CSVImporter from "./components/CsvImporter"

import DownloadCSVButton from "./components/DownloadCsvButton";
import HeartChart from "./components/HeartChart";
import BioForm from "./components/BioForm";

import './styles.css'

function App() {
  const [data, setData] =useState([]);

  function handleNewDataRow(event){
    event.preventDefault();

    // console.log("Test handle new data row");

    const formData = new FormData(event.target)
    const newDataRow = {
      Date: formData.get('date'),
      Weight: formData.get('weight'),
    }
    
    setData(prevData => [...prevData, newDataRow])
    
  }

  return (
    <>
      <div>
        <h1 id="main-title">Heart Track</h1>
        <CSVImporter setData={setData} />

        {/* Pushes the data into the following components when data is available*/}
        {data.length > 0 ? <DownloadCSVButton data={data}/>:null}
        {data.length > 0 ? <HeartChart data={data} />: null}

        <BioForm handleNewDataRow={handleNewDataRow} />

        <div>
          <h2>Data Entries</h2>
          <ul>
            {data.map((entry, index) => (
              <li key={index}>{`Weight: ${entry.Weight}, Date: ${entry.Date}`}</li>
            ))}
          </ul>
        </div>

      </div>
    </>
  )
}

export default App

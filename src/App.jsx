import { useState } from "react"
import CSVImporter from "./components/CsvImporter"

import DownloadCSVButton from "./components/DownloadCsvButton";
import HeartChart from "./components/HeartChart";
import BioForm from "./components/BioForm";
import DataEntries from "./components/DataEntries";

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
        <h1 id="main-title" >Heart Track</h1>
        <CSVImporter setData={setData} />

        {/* Pushes the data into the following components when data is available*/}
        {data.length > 0 ? <div className="center"><DownloadCSVButton data={data}/> </div>:null}
        {data.length > 0 ? (
          <div id="heartChart">
          <HeartChart data={data} />
          </div>
          ): null}

        <BioForm handleNewDataRow={handleNewDataRow} />

        <DataEntries data={data} /> {/* Use the new component */}


      </div>
    </>
  )
}

export default App

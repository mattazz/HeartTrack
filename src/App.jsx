import { useState } from "react"
import CSVImporter from "./CsvImporter"
import HeartChart from "./HeartChart"

function App() {
  const [data, setData] =useState([]);

  return (
    <>
      <div>
        <h1>Heart Track</h1>
        <CSVImporter setData={setData} data={data} />
        <HeartChart data={data} />
      </div>
    </>
  )
}

export default App

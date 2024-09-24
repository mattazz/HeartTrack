import { useState } from "react"
import CSVImporter from "./components/CsvImporter"

function App() {
  const [data, setData] =useState([]);

  return (
    <>
      <div>
        <h1>Heart Track</h1>
        <CSVImporter setData={setData} data={data} />
      </div>
    </>
  )
}

export default App

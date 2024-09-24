import React from "react"

function BioForm({handleNewDataRow}){

    const today = new Date().toISOString().split('T')[0]
    
    return(
        <div>
            <h1>Add Data</h1>
            <form action="" onSubmit={handleNewDataRow}>
                <label htmlFor="weight">Weight: </label>
                <input type="number" id="weight" name="weight"/>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" defaultValue={today}/>
                <button type="submit">Add data</button>
            </form>
        </div>
    )
}

export default BioForm
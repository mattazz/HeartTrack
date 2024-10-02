 import PropTypes from "prop-types";

function DataEntries({ data }) {
  return (
    <div className="mt-4">
    <h2>Data Entries</h2>
    <div className="row">
      {data.map((entry, index) => (
        <div key={index} className="col-md-2 mb-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{entry.Date}</h5>
              <p className="card-text">{`Weight: ${entry.Weight}`}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

DataEntries.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            Date: PropTypes.string.isRequired,
            Weight: PropTypes.number.isRequired
        })
    ).isRequired
}

export default DataEntries;
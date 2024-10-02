 import PropTypes from "prop-types";

function DataEntries({ data }) {
  return (
    <div className="mt-4">
      <h2>Data Entries</h2>
      <ul className="list-group">
        {data.map((entry, index) => (
          <li key={index} className="list-group-item">{`Weight: ${entry.Weight}, Date: ${entry.Date}`}</li>
        ))}
      </ul>
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
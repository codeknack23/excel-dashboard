import { useState } from "react";

const DataTable = ({ data }) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;

    return 0;
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const displayedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <h2>Data Table</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} onClick={() => handleSort(header)}>
                {header}
                {sortConfig?.key === header &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;

import { isAdmin } from "../utils/auth";

function PricesHeader({
  searchTerm,
  setSearchTerm,
  handleShow,
  handleExportPDF,
  handleExportExcel,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">

      <h2 className="fw-bold mb-0">
        💰 Daily Prices
      </h2>

      <div
        className="d-flex align-items-center"
        style={{ gap: "10px" }}
      >
        <button
          className="btn btn-danger"
          onClick={handleExportPDF}
        >
          📄 Export PDF
        </button>

        <button
          className="btn btn-success"
          onClick={handleExportExcel}
        >
          📊 Export Excel
        </button>

        <input
          type="text"
          className="form-control"
          placeholder="Search Product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px" }}
        />

        {isAdmin() && (
          <button
            className="btn btn-success"
            onClick={handleShow}
          >
            + Add Price
          </button>
        )}
      </div>

    </div>
  );
}

export default PricesHeader;
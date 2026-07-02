import { isAdmin } from "../utils/auth";

function ProductsHeader({
  searchTerm,
  setSearchTerm,
  handleShow,
  handleExportPDF,
  handleExportExcel,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">

      <h2 className="fw-bold mb-3 mb-md-0">
        📦 Products
      </h2>

      <div className="d-flex flex-wrap align-items-center">

        <button
          className="btn btn-danger me-2 mb-2"
          onClick={handleExportPDF}
        >
          📄 Export PDF
        </button>

        <button
          className="btn btn-success me-2 mb-2"
          onClick={handleExportExcel}
        >
          📊 Export Excel
        </button>

        <input
          type="text"
          className="form-control me-2 mb-2"
          style={{ width: "260px" }}
          placeholder="Search Product..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        {isAdmin() && (
          <button
            className="btn btn-success mb-2"
            onClick={handleShow}
          >
            + Add Product
          </button>
        )}

      </div>

    </div>
  );
}

export default ProductsHeader;
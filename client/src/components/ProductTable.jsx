import { useState } from "react";
import { Link } from "react-router-dom";
import { isAdmin } from "../utils/auth";

function ProductTable({
  products,
  handleEdit,
  handleDelete,
}) {
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    products.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentProducts =
    products.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm align-middle">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Description</th>
              <th width="260">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-muted py-4"
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              currentProducts.map(
                (product, index) => (
                  <tr key={product._id}>
                    <td>
                      {startIndex + index + 1}
                    </td>

                    <td>
                      <img
                        src={
                          product.image
                            ? `http://localhost:5000${product.image}`
                            : "https://via.placeholder.com/60?text=No+Image"
                        }
                        alt={product.productName}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border:
                            "1px solid #ddd",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/60?text=No+Image";
                        }}
                      />
                    </td>

                    <td className="fw-bold">
                      {product.productName}
                    </td>

                    <td>
                      {product.category}
                    </td>

                    <td>
                      {product.unit ||
                        "N/A"}
                    </td>

                    <td
                      style={{
                        maxWidth: "250px",
                      }}
                    >
                      {product.description ||
                        "-"}
                    </td>

                    <td>
                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        👁 View
                      </Link>

                      {isAdmin() && (
                        <>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              handleEdit(
                                product
                              )
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                product
                              )
                            }
                          >
                            🗑 Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Pagination ================= */}

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-outline-success"
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            ⬅ Previous
          </button>

          <h6 className="mb-0">
            Page {currentPage} of{" "}
            {totalPages}
          </h6>

          <button
            className="btn btn-outline-success"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next ➡
          </button>
        </div>
      )}
    </>
  );
}

export default ProductTable;
import { isAdmin } from "../utils/auth";

function PriceTable({
  prices,
  onEdit,
  onDelete,
}) {
  return (
    <div className="table-responsive">

      <table className="table table-bordered table-hover shadow-sm">

        <thead className="table-success">

          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Market</th>
            <th>Price (₹)</th>
            <th>Date</th>

            {isAdmin() && (
              <th width="180">Actions</th>
            )}

          </tr>

        </thead>

        <tbody>

          {prices.map((price, index) => (
            <tr key={price._id}>

              <td>{index + 1}</td>

              <td>{price.product?.productName}</td>

              <td>{price.market?.marketName}</td>

              <td>₹ {price.price}</td>

              <td>
                {new Date(price.createdAt).toLocaleDateString()}
              </td>

              {isAdmin() && (
                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(price)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(price._id)}
                  >
                    Delete
                  </button>

                </td>
              )}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PriceTable;
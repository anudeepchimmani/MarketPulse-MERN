import { isAdmin } from "../utils/auth";

function MarketTable({
  markets,
  onEdit,
  onDelete,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover shadow-sm">

        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>Market Name</th>
            <th>Location</th>

            {isAdmin() && (
              <th width="180">Actions</th>
            )}

          </tr>
        </thead>

        <tbody>

          {markets.map((market, index) => (
            <tr key={market._id}>

              <td>{index + 1}</td>

              <td>{market.marketName}</td>

              <td>{market.location}</td>

              {isAdmin() && (
                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(market)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(market._id)}
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

export default MarketTable;
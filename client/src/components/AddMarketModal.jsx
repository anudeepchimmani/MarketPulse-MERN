import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  addMarket,
  updateMarket,
} from "../services/marketService";

function AddMarketModal({
  show,
  handleClose,
  refreshMarkets,
  editMarket = null,
}) {
  const [formData, setFormData] = useState({
    marketName: "",
    location: "",
  });

  useEffect(() => {
    if (editMarket) {
      setFormData({
        marketName: editMarket.marketName || "",
        location: editMarket.location || "",
      });
    } else {
      setFormData({
        marketName: "",
        location: "",
      });
    }
  }, [editMarket, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (editMarket) {
        await updateMarket(
          editMarket._id,
          formData
        );

        toast.success(
          "Market Updated Successfully"
        );
      } else {
        await addMarket(formData);

        toast.success(
          "Market Added Successfully"
        );
      }

      handleClose();
      refreshMarkets();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save market."
      );
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                {editMarket
                  ? "Edit Market"
                  : "Add Market"}
              </h5>

              <button
                className="btn-close"
                onClick={handleClose}
              ></button>

            </div>

            <div className="modal-body">

              <div className="row">

                <div className="col-md-6">

                  <div className="mb-3">

                    <label className="form-label">
                      Market Name
                    </label>

                    <input
                      type="text"
                      name="marketName"
                      className="form-control"
                      placeholder="Enter market name"
                      value={formData.marketName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="mb-3">

                    <label className="form-label">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>

              <button
                className="btn btn-success"
                onClick={handleSave}
              >
                {editMarket
                  ? "Update Market"
                  : "Save Market"}
              </button>

            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default AddMarketModal;
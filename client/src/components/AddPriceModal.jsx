import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  addPrice,
  updatePrice,
} from "../services/priceService";

import { getAllProducts } from "../services/productService";
import { getAllMarkets } from "../services/marketService";

function AddPriceModal({
  show,
  handleClose,
  refreshPrices,
  editPrice = null,
}) {
  const [products, setProducts] = useState([]);
  const [markets, setMarkets] = useState([]);

  const [formData, setFormData] = useState({
    product: "",
    market: "",
    price: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const productData =
          await getAllProducts();

        const marketData =
          await getAllMarkets();

        setProducts(productData.products);

        setMarkets(marketData.markets);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load products or markets."
        );
      }
    }

    loadData();

    if (editPrice) {
      setFormData({
        product:
          editPrice.product?._id || "",
        market:
          editPrice.market?._id || "",
        price:
          editPrice.price || "",
      });
    } else {
      setFormData({
        product: "",
        market: "",
        price: "",
      });
    }
  }, [editPrice, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (editPrice) {
        await updatePrice(
          editPrice._id,
          formData
        );

        toast.success(
          "Price Updated Successfully"
        );
      } else {
        await addPrice(formData);

        toast.success(
          "Price Added Successfully"
        );
      }

      handleClose();

      refreshPrices();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save price."
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
                {editPrice
                  ? "Edit Price"
                  : "Add Price"}
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
                      Product
                    </label>

                    <select
                      className="form-select"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Product
                      </option>

                      {products.map(
                        (product) => (
                          <option
                            key={product._id}
                            value={product._id}
                          >
                            {product.productName}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="mb-3">

                    <label className="form-label">
                      Market
                    </label>

                    <select
                      className="form-select"
                      name="market"
                      value={formData.market}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Market
                      </option>

                      {markets.map(
                        (market) => (
                          <option
                            key={market._id}
                            value={market._id}
                          >
                            {market.marketName}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

              </div>

              <div className="row">

                <div className="col-md-6">

                  <div className="mb-3">

                    <label className="form-label">
                      Price (₹)
                    </label>

                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleChange}
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
                {editPrice
                  ? "Update Price"
                  : "Save Price"}
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="modal-backdrop fade show"></div>

    </>
  );
}

export default AddPriceModal;
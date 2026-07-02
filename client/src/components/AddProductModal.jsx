import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  addProduct,
  updateProduct,
} from "../services/productService";

import {
  validateName,
  validateRequired,
} from "../utils/validation";

function AddProductModal({
  show,
  handleClose,
  refreshProducts,
  editProduct = null,
}) {

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    unit: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] =
    useState("");

  useEffect(() => {

    if (editProduct) {

      setFormData({
        productName:
          editProduct.productName || "",
        category:
          editProduct.category || "",
        unit:
          editProduct.unit || "",
        description:
          editProduct.description || "",
      });

      if (editProduct.image) {

        setPreview(
          `${import.meta.env.VITE_API_URL.replace(
            "/api",
            ""
          )}${editProduct.image}`
        );

      } else {

        setPreview("");

      }

      setImage(null);

    } else {

      setFormData({
        productName: "",
        category: "",
        unit: "",
        description: "",
      });

      setImage(null);

      setPreview("");

    }

  }, [editProduct, show]);

  if (!show) return null;

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  const handleSave = async () => {

    // ================= Validation =================

    let error = validateName(
      formData.productName,
      "Product Name"
    );

    if (error) {

      toast.error(error);

      return;

    }

    error = validateRequired(
      formData.category,
      "Category"
    );

    if (error) {

      toast.error(error);

      return;

    }

    error = validateRequired(
      formData.unit,
      "Unit"
    );

    if (error) {

      toast.error(error);

      return;

    }

    try {

      const productData =
        new FormData();

      productData.append(
        "productName",
        formData.productName.trim()
      );

      productData.append(
        "category",
        formData.category.trim()
      );

      productData.append(
        "unit",
        formData.unit.trim()
      );

      productData.append(
        "description",
        formData.description.trim()
      );

      if (image) {

        productData.append(
          "image",
          image
        );

      }
            if (editProduct) {

        await updateProduct(
          editProduct._id,
          productData
        );

        toast.success(
          "✅ Product Updated Successfully"
        );

      } else {

        await addProduct(
          productData
        );

        toast.success(
          "✅ Product Added Successfully"
        );

      }

      handleClose();

      refreshProducts();

    } catch (error) {

      console.error(
        "Complete Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to save product."
      );

    }

  };

  return (

    <>

      <div
        className="modal fade show"
        style={{
          display: "block",
        }}
      >

        <div className="modal-dialog modal-lg">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">

                {editProduct
                  ? "Edit Product"
                  : "Add Product"}

              </h5>

              <button
                className="btn-close"
                onClick={
                  handleClose
                }
              ></button>

            </div>

            <div className="modal-body">

              <div className="row">

                <div className="col-md-6">

                  <div className="mb-3">

                    <label className="form-label">

                      Product Name

                    </label>

                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      placeholder="Enter product name"
                      value={formData.productName}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="mb-3">

                    <label className="form-label">

                      Category

                    </label>

                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      placeholder="Enter category"
                      value={formData.category}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

              <div className="row">

                <div className="col-md-6">

                  <div className="mb-3">

                    <label className="form-label">

                      Unit

                    </label>

                    <input
                      type="text"
                      name="unit"
                      className="form-control"
                      placeholder="Kg, Dozen, Liter..."
                      value={formData.unit}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="mb-3">

                    <label className="form-label">

                      Product Image

                    </label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImage}
                    />

                    <small className="text-muted">

                      Supported:
                      JPG, JPEG, PNG,
                      WEBP, JFIF
                      and other image
                      formats.

                    </small>

                  </div>

                </div>

              </div>

              <div className="mb-3">

                <label className="form-label">

                  Description

                </label>

                <textarea
                  rows="3"
                  name="description"
                  className="form-control"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>

              </div>
                            {preview && (

                <div className="text-center mb-3">

                  <img
                    src={preview}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />

                </div>

              )}

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

                {editProduct
                  ? "Update Product"
                  : "Save Product"}

              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="modal-backdrop fade show"></div>

    </>

  );

}

export default AddProductModal;
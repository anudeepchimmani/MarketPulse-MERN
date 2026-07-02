import { useEffect, useMemo, useState } from "react";

import {
  getAllProducts,
  deleteProduct,
} from "../services/productService";

import { toast } from "react-toastify";

import {
  exportToPDF,
  exportToExcel,
} from "../utils/exportUtils";

import ProductsHeader from "../components/ProductsHeader";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";

function Products() {

  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editProduct, setEditProduct] =
    useState(null);

  const loadProducts = async () => {

    try {

      const data =
        await getAllProducts();

      setProducts(data.products);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load products"
      );

    }

  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {

    return products.filter((product) =>
      product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  }, [products, searchTerm]);

  const handleEdit = (product) => {

    setEditProduct(product);

    setShowModal(true);

  };

  const handleClose = () => {

    setShowModal(false);

    setEditProduct(null);

  };

  const handleDelete = async (
    product
  ) => {

    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete "${product.productName}"?`
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(product._id);

      toast.success(
        "✅ Product Deleted Successfully"
      );

      loadProducts();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete product"
      );

    }

  };

  const handleExportPDF = () => {

    const headers = [
      "Product",
      "Category",
      "Unit",
      "Description",
    ];

    const data =
      filteredProducts.map((item) => [
        item.productName,
        item.category,
        item.unit,
        item.description || "-",
      ]);

    exportToPDF(
      "Products Report",
      headers,
      data,
      "Products_Report"
    );

    toast.success(
      "PDF Exported Successfully"
    );

  };

  const handleExportExcel = () => {

    const data =
      filteredProducts.map((item) => ({
        Product: item.productName,
        Category: item.category,
        Unit: item.unit,
        Description:
          item.description || "-",
      }));

    exportToExcel(
      data,
      "Products_Report"
    );

    toast.success(
      "Excel Exported Successfully"
    );

  };

  return (

    <div className="container mt-5">
            <ProductsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleShow={() => {
          setEditProduct(null);
          setShowModal(true);
        }}
        handleExportPDF={handleExportPDF}
        handleExportExcel={handleExportExcel}
      />

      {filteredProducts.length === 0 ? (

        <p className="text-center text-muted">
          No products found.
        </p>

      ) : (

        <ProductTable
          products={filteredProducts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

      )}

      <AddProductModal
        show={showModal}
        handleClose={handleClose}
        refreshProducts={loadProducts}
        editProduct={editProduct}
      />

    </div>

  );
}

export default Products;
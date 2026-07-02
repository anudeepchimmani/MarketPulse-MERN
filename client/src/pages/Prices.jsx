import { useEffect, useMemo, useState } from "react";

import {
  getAllPrices,
  deletePrice,
} from "../services/priceService";

import { toast } from "react-toastify";

import {
  exportToPDF,
  exportToExcel,
} from "../utils/exportUtils";

import PricesHeader from "../components/PricesHeader";
import PriceTable from "../components/PriceTable";
import AddPriceModal from "../components/AddPriceModal";

function Prices() {
  const [prices, setPrices] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editPrice, setEditPrice] =
    useState(null);

  const loadPrices = async () => {
    try {
      const data =
        await getAllPrices();

      setPrices(data.prices);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load prices"
      );
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const filteredPrices = useMemo(() => {
    return prices.filter((price) =>
      price.product?.productName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [prices, searchTerm]);

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this price?"
      );

    if (!confirmDelete) return;

    try {
      await deletePrice(id);

      toast.success(
        "✅ Price Deleted Successfully"
      );

      loadPrices();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete price"
      );
    }
  };

  const handleEdit = (price) => {
    setEditPrice(price);

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);

    setEditPrice(null);
  };

  // ================= EXPORT PDF =================

  const handleExportPDF = () => {
    const headers = [
      "Product",
      "Market",
      "Price",
      "Date",
    ];

    const data =
      filteredPrices.map((item) => [
        item.product?.productName || "-",
        item.market?.marketName || "-",
        item.price,
        new Date(
          item.createdAt
        ).toLocaleDateString(),
      ]);

    exportToPDF(
      "Prices Report",
      headers,
      data,
      "Prices_Report"
    );

    toast.success(
      "PDF Exported Successfully"
    );
  };

  // ================= EXPORT EXCEL =================

  const handleExportExcel = () => {
    const data =
      filteredPrices.map((item) => ({
        Product:
          item.product?.productName || "-",
        Market:
          item.market?.marketName || "-",
        Price: item.price,
        Date: new Date(
          item.createdAt
        ).toLocaleDateString(),
      }));

    exportToExcel(
      data,
      "Prices_Report"
    );

    toast.success(
      "Excel Exported Successfully"
    );
  };

  return (
    <div className="container mt-5">

      <PricesHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleShow={() => {
          setEditPrice(null);
          setShowModal(true);
        }}
        handleExportPDF={handleExportPDF}
        handleExportExcel={handleExportExcel}
      />

      {filteredPrices.length === 0 ? (
        <p className="text-center text-muted">
          No prices found.
        </p>
      ) : (
        <PriceTable
          prices={filteredPrices}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <AddPriceModal
        show={showModal}
        handleClose={handleClose}
        refreshPrices={loadPrices}
        editPrice={editPrice}
      />

    </div>
  );
}

export default Prices;
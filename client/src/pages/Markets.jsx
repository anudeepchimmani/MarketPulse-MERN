import { useEffect, useMemo, useState } from "react";
import {
  getAllMarkets,
  deleteMarket,
} from "../services/marketService";

import { toast } from "react-toastify";

import {
  exportToPDF,
  exportToExcel,
} from "../utils/exportUtils";

import MarketsHeader from "../components/MarketsHeader";
import MarketTable from "../components/MarketTable";
import AddMarketModal from "../components/AddMarketModal";

function Markets() {
  const [markets, setMarkets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMarket, setEditMarket] = useState(null);

  const loadMarkets = async () => {
    try {
      const data = await getAllMarkets();
      setMarkets(data.markets);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load markets");
    }
  };

  useEffect(() => {
    loadMarkets();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this market?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMarket(id);

      toast.success("✅ Market Deleted Successfully");

      loadMarkets();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete market");
    }
  };

  const filteredMarkets = useMemo(() => {
    return markets.filter((market) =>
      market.marketName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [markets, searchTerm]);

  // ================= Export PDF =================

  const handleExportPDF = () => {
    const headers = [
      "Market Name",
      "Location",
      "Contact",
    ];

    const data = filteredMarkets.map((market) => [
      market.marketName,
      market.location,
      market.contact || "-",
    ]);

    exportToPDF(
      "Markets Report",
      headers,
      data,
      "Markets_Report"
    );

    toast.success("PDF Exported Successfully");
  };

  // ================= Export Excel =================

  const handleExportExcel = () => {
    const data = filteredMarkets.map((market) => ({
      "Market Name": market.marketName,
      Location: market.location,
      Contact: market.contact || "-",
    }));

    exportToExcel(
      data,
      "Markets_Report"
    );

    toast.success("Excel Exported Successfully");
  };

  return (
    <div className="container mt-5">

      <MarketsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleShow={() => {
          setEditMarket(null);
          setShowModal(true);
        }}
        handleExportPDF={handleExportPDF}
        handleExportExcel={handleExportExcel}
      />

      {filteredMarkets.length === 0 ? (
        <p className="text-center text-muted">
          No markets found.
        </p>
      ) : (
        <MarketTable
          markets={filteredMarkets}
          onEdit={(market) => {
            setEditMarket(market);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <AddMarketModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setEditMarket(null);
        }}
        refreshMarkets={loadMarkets}
        editMarket={editMarket}
      />

    </div>
  );
}

export default Markets;
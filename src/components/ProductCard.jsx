import React, { useState } from "react";
import EnquiryModal from "./EnquiryModal";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="border p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>{product.description}</p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Enquire
        </button>
      </div>

      <EnquiryModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        item={product}
      />
    </>
  );
};

export default ProductCard;

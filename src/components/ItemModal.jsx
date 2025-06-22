import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Carousel from "./Carousel";
import EnquiryModal from "./EnquiryModal";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

const ItemModal = ({ item, onClose }) => {
  const [showEnquire, setShowEnquire] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-2xl w-full shadow-lg relative"
          variants={modal}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          >
            ✖
          </button>

          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
            {item.type}
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-200">
            {item.description}
          </p>

          <Carousel images={[item.coverImage, ...item.additionalImages]} />

          <div className="mt-6 text-right">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              onClick={() => setShowEnquire(true)}
            >
              ✉ Enquire
            </button>
          </div>

          {showEnquire && (
            <EnquiryModal
              isOpen={showEnquire}
              closeModal={() => setShowEnquire(false)}
              item={item}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ItemModal;

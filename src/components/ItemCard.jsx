import { motion } from "framer-motion";
import { useItemStore } from "../store/useItemStore";
import { Trash2 } from "lucide-react";

const ItemCard = ({ item, onClick }) => {
  const { removeItem } = useItemStore();

  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      removeItem(item.id);
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className="relative cursor-pointer rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={item.coverImage}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">{item.type}</p>
      </div>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
      >
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
};

export default ItemCard;

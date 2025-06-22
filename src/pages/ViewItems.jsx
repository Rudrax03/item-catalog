import { useItemStore } from "../store/useItemStore";
import { useState } from "react";
import ItemCard from "../components/ItemCard";
import ItemModal from "../components/ItemModal";

const ViewItems = () => {
  const items = useItemStore((state) => state.items);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [modalItem, setModalItem] = useState(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter ? item.type === filter : true;
    return matchesSearch && matchesFilter;
  });

  const uniqueTypes = [...new Set(items.map((item) => item.type))];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Catalog</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full sm:w-1/2 dark:bg-gray-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded dark:bg-gray-800"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => setModalItem(item)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items found.</p>
      )}

      {modalItem && (
        <ItemModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </div>
  );
};

export default ViewItems;

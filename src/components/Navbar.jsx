import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored !== null) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
        🛒 Item Catalog
      </h1>
      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
        >
          View Items
        </Link>
        <Link
          to="/add"
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
        >
          Add Item
        </Link>
        <button
          onClick={() => setDark(!dark)}
          aria-label="Toggle Dark Mode"
          title="Toggle Dark Mode"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <div className="p-4 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<ViewItems />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { useState } from "react";
import { useItemStore } from "../store/useItemStore";
import { v4 as uuidv4 } from "uuid";

const AddItem = () => {
  const { addItem } = useItemStore();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  // 🔄 Convert file to base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setCoverImage(base64);
    setCoverPreview(base64);
  };

  const handleAdditionalChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64s = await Promise.all(files.map(toBase64));
    setAdditionalImages(base64s);
    setAdditionalPreviews(base64s);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type || !description || !coverImage) {
      alert("Please fill in all required fields.");
      return;
    }

    const newItem = {
      id: uuidv4(),
      name,
      type,
      description,
      coverImage,
      additionalImages,
    };

    addItem(newItem);

    // ✅ Reset form
    setName("");
    setType("");
    setDescription("");
    setCoverImage(null);
    setCoverPreview(null);
    setAdditionalImages([]);
    setAdditionalPreviews([]);

    alert("✅ Item added successfully!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <div>
          <label className="block font-medium mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="block"
            required
          />
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover Preview"
              className="mt-2 w-full h-48 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAdditionalChange}
            className="block"
          />
          {additionalPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {additionalPreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Additional ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;

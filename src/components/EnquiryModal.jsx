import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const EnquiryModal = ({ isOpen, closeModal, item }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("✅ Enquiry sent successfully!");
        closeModal();
      })
      .catch((err) => {
        console.error("❌ Email send error:", err);
        alert("Error sending enquiry.");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Send Enquiry</h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          {/* Hidden input for item name */}
          <input type="hidden" name="item" value={item?.name || "Product"} />

          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="message"
            required
            placeholder="Your Message"
            className="w-full border p-2 rounded h-24"
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;

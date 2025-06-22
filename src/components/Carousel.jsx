import { useState } from "react";

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="relative mt-4">
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        className="w-full h-64 object-cover rounded"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;

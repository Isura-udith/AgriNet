import { useEffect } from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import v2 from "../assets/website/v2.jpg";
import v3 from "../assets/website/v3.jpg";
import v4 from "../assets/website/v4.jpg";
import v5 from "../assets/website/v5.jpg";
import v6 from "../assets/website/v6.jpg";
import v7 from "../assets/website/v10.jpg";
import v8 from "../assets/website/v8.jpg";
import v9 from "../assets/website/v9.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const products = [
    { id: 1, name: "Potato", price: "1Kg Rs.80", image: v2, rating: 4, discount: "10%" },
    { id: 2, name: "Carrot", price: "1kg Rs.65", image: v3, rating: 5, discount: "15%" },
    { id: 3, name: "Gurking", price: "1kg Rs.90", image: v4, rating: 3, discount: "5%" },
    { id: 4, name: "Onion", price: "1kg Rs.58", image: v5, rating: 4, discount: "20%" },
    { id: 5, name: "Pumpking", price: "1kg Rs.72", image: v7, rating: 5, discount: "25%" },
    { id: 6, name: "Tomato", price: "1kg Rs.85", image: v6, rating: 2, discount: "10%" },
    { id: 7, name: "Brinjal", price: "1kg Rs.60", image: v8, rating: 4, discount: "30%" },
    { id: 8, name: "Salad Leaves", price: "1kg Rs.92", image: v9, rating: 5, discount: "20%" },
  ];

const Trending = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }
    return stars;
  };

  const handleAddToCart = (productName) => {
    alert(`Added ${productName} to cart!`);
  };

  return (
    <div className="p-6 pb-8 m-6 bg-gray-500 rounded-xl">
      <h2 className="py-6 mb-6 text-4xl font-bold text-center text-slate-50">Most Trending Products</h2>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            data-aos="zoom-in"
            className="relative w-3/4 p-4 mx-auto border rounded-lg shadow-md bg-slate-50"
          >
            <div className="relative">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full transition-transform duration-700 ease-in-out transform rounded-lg hover:scale-150"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <div className="flex">{renderStars(product.rating)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="font-bold text-gray-600">{product.price}</p>
                  {product.discount && (
                    <span className="px-1 py-1 ml-2 font-bold text-white bg-red-500 rounded">
                      {product.discount} OFF
                    </span>
                  )}
                </div>
                <button
                  className="flex items-center p-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                  onClick={() => handleAddToCart(product.name)}
                >
                  <FaShoppingCart className="mr-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;

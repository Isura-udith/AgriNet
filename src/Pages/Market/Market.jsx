import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 1,
  rating: (Math.random() * 5).toFixed(1), // Rating as string
  sellers: `${Math.floor(Math.random() * 2000)} times`,
  category: i % 2 === 0 ? "Wholesale" : "Retail",
  image: `https://via.placeholder.com/150?text=Product+${i + 1}`,
}));

const Market = () => {
  const { dispatch, cart } = useCart();
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedRatings, setSelectedRatings] = useState([]); // Ratings as an array
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");

  // Filter products based on filters
  useEffect(() => {
    let filtered = products.filter((product) => {
      const isInPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const isInCategory = category === "All" || product.category === category;
      const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Ensure rating is compared as a number
      let isInRatingRange = false;
      if (selectedRatings.length === 0) {
        isInRatingRange = true; // No rating filter selected
      } else {
        const productRating = parseFloat(product.rating); // Convert rating to number
        isInRatingRange = selectedRatings.some((rating) => productRating >= rating && productRating < rating + 1);
      }

      return isInPriceRange && isInCategory && matchesSearchQuery && isInRatingRange;
    });

    // Sorting products based on the selected sort order
    if (sortOrder === "low-to-high") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [priceRange, selectedRatings, searchQuery, category, sortOrder]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000); // Hide confirmation after 3 seconds
  };

  const goToCartPage = () => {
    navigate("/cart");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100]);
    setSelectedRatings([]);
    setCategory("All");
    setSortOrder("none");
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="container flex p-4 mx-auto bg-gray-100">
      {/* Confirmation message */}
      {showConfirmation && (
        <div className="fixed px-4 py-2 text-white bg-gray-600 rounded-md shadow-lg top-28 right-4">
          Item added to cart successfully!
        </div>
      )}

      {/* Sidebar (Fixed with sticky positioning) */}
      <div className="p-4 bg-gray-300 rounded-md shadow-md w-[20%] sticky top-0 pt-6">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Sort Price Filter - Radio buttons (Low to High, High to Low) */}
        <div className="mb-4">
          <p className="mb-2 font-medium text-gray-600">Sort by Price</p>
          <div className="flex flex-wrap">
            <label className="inline-flex items-center w-1/2 mr-4">
              <input
                type="radio"
                name="sortOrder"
                value="low-to-high"
                checked={sortOrder === "low-to-high"}
                onChange={() => setSortOrder("low-to-high")}
                className="mr-2"
              />
              Low to High
            </label>
            <label className="inline-flex items-center w-1/2 mr-4">
              <input
                type="radio"
                name="sortOrder"
                value="high-to-low"
                checked={sortOrder === "high-to-low"}
                onChange={() => setSortOrder("high-to-low")}
                className="mr-2"
              />
              High to Low
            </label>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <label htmlFor="priceRange" className="block mb-2">
            Price Range
          </label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, e.target.value])}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Rating Filter - Multiple checkboxes */}
        <div className="mb-4">
          <p className="mb-2 font-medium text-gray-600">Select Ratings</p>
          <div className="flex flex-wrap">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="inline-flex items-center w-1/2 mr-4">
                <input
                  type="checkbox"
                  name="rating"
                  value={star}
                  checked={selectedRatings.includes(star)}
                  onChange={() => {
                    setSelectedRatings((prev) =>
                      prev.includes(star)
                        ? prev.filter((rating) => rating !== star)
                        : [...prev, star]
                    );
                  }}
                  className="mr-2"
                />
                {star} Stars
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter - Radio buttons (All, Wholesale, Retail) */}
        <div className="mb-4">
          <p className="mb-2 font-medium text-gray-600">Category</p>
          <div className="flex flex-wrap">
            {["All", "Wholesale", "Retail"].map((cat) => (
              <label key={cat} className="inline-flex items-center w-1/2 mr-4">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="w-full py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Grid (Scrollable section) */}
      <div className="w-3/4 p-4 overflow-y-auto h-[80vh]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-md shadow-sm hover:shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-32 rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">⭐ {product.rating}</p>
                <p className="text-sm text-gray-500">{product.sellers}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full py-1 mt-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Button */}
      <button
        onClick={goToCartPage}
        className="fixed inline-flex px-4 py-4 mt-3 font-bold tracking-wide text-white bg-black rounded-full animate-bounce focus:animate-none hover:animate-none text-md bottom-4 right-4 hover:bg-red-800"
      >
        🛒 Go to Cart
        {getCartItemCount() > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
            {getCartItemCount()}
          </span>
        )}
      </button>
    </div>
  );
};

export default Market;

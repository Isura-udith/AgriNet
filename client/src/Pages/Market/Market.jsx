import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import { Link } from "react-router-dom";

const Market = () => {
  const { cart, dispatch } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let filtered = products.filter((product) => {
      const isInPriceRange =
        product.productPrice >= priceRange[0] && product.productPrice <= priceRange[1];
      const isInCategory = category === "All" || product.category === category;
      const matchesSearchQuery = product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const isInRatingRange =
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => {
          const productRating = parseFloat(product.rating || 0);
          return productRating >= rating && productRating < rating + 1;
        });

      return isInPriceRange && isInCategory && matchesSearchQuery && isInRatingRange;
    });

    // Sorting logic
    if (sortOrder === "low-to-high") {
      filtered = filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "high-to-low") {
      filtered = filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedRatings, searchQuery, category, sortOrder]);

  // const addToCart = (product) => {
  //   if (product.quantity > 0) {
  //     dispatch({ type: "ADD_TO_CART", payload: product });
  //     setShowConfirmation(true);
  //     setTimeout(() => setShowConfirmation(false), 3000);
  //   } else {
  //     alert("Sorry, this product is out of stock.");
  //   }
  // };


  const addToCart = (product) => {
    if (product.quantity > 0) {
      const productToAdd = {
        id: product._id,
        name: product.productName,
        price: product.productPrice,
        quantity: 1, // Initialize quantity to 1 for new items
        image: `http://localhost:5000${product.imagePath}`,
        selected: false, // Initially unselected
      };
      dispatch({ type: "ADD_TO_CART", payload: productToAdd });
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    } else {
      alert("Sorry, this product is out of stock.");
    }
  };
  

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 500]);
    setSelectedRatings([]);
    setCategory("All");
    setSortOrder("none");
  };

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container flex p-4 mx-auto bg-gray-100">
      {showConfirmation && (
        <div className="fixed px-4 py-2 text-white bg-gray-600 rounded-md shadow-lg top-28 right-[40%]">
          Item added to cart successfully!
        </div>
      )}

      <div className="p-4 bg-gray-400 rounded-md shadow-md w-[20%] sticky top-0 pt-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="w-full p-2 mb-4 border rounded-md"
        />

        <div className="mb-4">
          <p className="mb-2 font-medium text-gray-700">Sort by Price</p>
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

        <div className="mb-4">
          <label htmlFor="priceRange" className="block mb-2">
            Price Range
          </label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, e.target.value])}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>Rs. {priceRange[0]}</span>
            <span>Rs. {priceRange[1]}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 font-medium text-gray-700">Select Ratings</p>
          <div className="flex flex-wrap">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="inline-flex items-center w-1/2 mr-4">
                <input
                  type="checkbox"
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

        <div className="mb-4">
          <p className="mb-2 font-medium text-gray-700">Category</p>
          <div className="flex flex-wrap">
            {["Both", "Wholesale", "Retail"].map((cat) => (
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

        <button
          onClick={clearFilters}
          className="w-full py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Clear Filters
        </button>
      </div>

      <div className="w-3/4 p-4 overflow-y-auto h-[80vh]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {filteredProducts.map((product) => (
            <div
              key={product._id}            
              className="p-4 bg-gray-200 border border-gray-300 rounded-md shadow-sm hover:shadow-md hover:bg-white">
              <img
                src={`http://localhost:5000${product.imagePath}`}
                alt={product.productName}
                className="w-full h-32 transition-transform duration-700 ease-in-out transform rounded-lg hover:scale-150"
              />
              <h3 className="mt-2 font-mono text-lg font-bold text-center text-gray-700">{product.productName}</h3>
              <div className="flex items-center justify-between mt-2 ">
                <p className="text-gray-600">Rs. {product.productPrice}</p>
                <p className="text-sm text-gray-500">Qty: {product.quantity}Kg</p>
              </div>
              <div className="flex items-center justify-between mt-2 ">
                <p className="text-sm text-gray-500">{product.sellerName}</p>
                <p className="text-sm text-gray-500">{product.rating}5.0 ⭐</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full px-4 py-2 mt-2 font-semibold text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Cart Button */}
      <Link
        to="/cart"
        className="fixed inline-flex px-4 py-4 mt-3 font-bold tracking-wide text-white bg-black rounded-full animate-bounce focus:animate-none hover:animate-none text-md bottom-4 right-4 hover:bg-red-800"
      >
        🛒 Go to Cart
        {getCartItemCount() > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
            {getCartItemCount()}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Market;

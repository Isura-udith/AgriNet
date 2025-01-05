import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();

  // Toggle item selection
  const toggleSelectItem = (id) => {
    dispatch({ type: "TOGGLE_SELECT_ITEM", payload: { id } });
  };

  // Toggle select all items
  const toggleSelectAll = () => {
    dispatch({ type: "TOGGLE_SELECT_ALL" });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  // Clear all items from cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Clear selected items from cart
  const clearSelectedItems = () => {
    cart.forEach((item) => {
      if (item.selected) {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id: item.id } });
      }
    });
  };

  // Increment quantity
  const incrementQuantity = (id) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
  };

  // Decrement quantity
  const decrementQuantity = (id) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
  };

  // Calculate the total price for all items
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Get selected items and calculate total price for selected items
  const selectedItems = cart.filter((item) => item.selected);
  const selectedTotalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const selectedCount = selectedItems.length;

  return (
    <div className="p-6 pb-8 m-6 bg-gray-400 rounded-md shadow-md">
      {cart.length === 0 ? (
        <p className="font-bold text-center text-red-700">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <button
              onClick={toggleSelectAll}
              className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
            >
              {cart.every((item) => item.selected)
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          <p className="mb-4 text-lg font-semibold text-center">
            Selected Items: {selectedCount}
          </p>

          {/* Product List Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white border-collapse rounded-md shadow-md table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Select</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Product Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="transition hover:bg-gray-100">
                    <td className="px-4 py-2 text-center border">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                    </td>
                    <td className="items-center justify-center px-4 py-2 text-center border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="items-center justify-center object-cover w-16 h-16 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      ${item.price}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="px-2 py-1 text-white transition bg-blue-500 rounded hover:bg-blue-600"
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="px-2 py-1 text-white transition bg-blue-500 rounded hover:bg-blue-600"
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center border">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 transition hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={clearSelectedItems}
              className="px-4 py-2 text-white transition bg-red-600 rounded hover:bg-red-700"
            >
              Clear Selected Items
            </button>
            <button
              onClick={clearCart}
              className="px-4 py-2 text-white transition bg-gray-600 rounded hover:bg-gray-700 "
            >
              Clear All Cart
            </button>
          </div>

          {/* Total Price */}
          <div className="mt-6 text-right">
            <p className="font-semibold text-gray-700 text-mediam">
              Total Price for All Items: ${totalPrice.toFixed(2)}
            </p>
            {selectedCount > 0 && (
              <p className="mt-2 text-xl font-semibold text-emerald-950">
                Total Price for Selected Items: ${selectedTotalPrice.toFixed(2)}
              </p>
            )}
            <div className="mt-4">
              <button className="px-6 py-3 font-bold text-white bg-black rounded-full hover:bg-green-600">
                Pay Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

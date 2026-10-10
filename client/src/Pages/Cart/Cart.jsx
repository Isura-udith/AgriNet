import { useCart } from "./CartContext";
import { useState } from "react";
//import axios from 'axios';
import AlertPopup from "../../components/AlertPopup/AlertPopup";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [receiverDetails, setReceiverDetails] = useState({
    email: "",
    name: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    zipCode: "",
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    holderName: "",
    cvv: "",
  });

  const [alert, setAlert] = useState({
    message: '',
    type: '', // "success" or "error"
    isVisible: false,
  });

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

  const handlePayNow = () => {
    setIsPopupOpen(true);
    setStep(1);
  };

  const handleReceiverChange = (e) => {
    setReceiverDetails({ ...receiverDetails, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(2);
  };

  const handlePayment = () => {
    console.log("Receiver Details:", receiverDetails);
    console.log("Card Details:", cardDetails);
    setIsPopupOpen(false);
    setAlert({
      message: 'Payment Successful!',
      type: 'success',
      isVisible: true,
    });

    window.location.reload(); // Refresh the page
  };

  // const handlePayment = async () => {
  //   const paymentData = {
  //     receiverDetails,
  //     cardDetails,
      
  //   };
  
  //   try {
  //     const response = await axios.post('/api/payment', paymentData);
  //     console.log(response.data.message); // Show success message
  //     setIsPopupOpen(false);
  //     setAlert({
  //       message: 'Payment Successful!',
  //       type: 'success',
  //       isVisible: true,
  //     });
  //   } catch (error) {
  //     console.error('Payment failed:', error);
  //     setAlert({
  //       message: 'Payment Failed! Please try again.',
  //       type: 'error',
  //       isVisible: true,
  //     });
  //   }
  // };

  return (
    <div className="p-6 pb-8 m-6 bg-gray-400 rounded-md shadow-md">
      {/* Alert Popup */}
            <AlertPopup
              message={alert.message}
              type={alert.type}
              isVisible={alert.isVisible}
              onClose={() => setAlert({ ...alert, isVisible: false })}
            />
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
                  <th className="px-4 py-2 border">Quantity (Kg)</th>
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
                    <td className="flex items-center justify-center px-4 py-2 text-center border">
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
                      Rs. {item.price}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="flex items-center justify-center w-6 h-6 text-white transition-all transform bg-gray-500 rounded-full hover:bg-black hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                          >
                            <path d="M12 5v14M5 12h14"></path>
                          </svg>
                        </button>
                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="flex items-center justify-center w-6 h-6 text-white transition-all transform bg-gray-500 rounded-full hover:bg-black hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                          >
                            <path d="M19 12H5"></path>
                          </svg>
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
              Total Price for All Items: Rs. {totalPrice.toFixed(2)}
            </p>
            {selectedCount > 0 && (
              <p className="mt-2 text-xl font-semibold text-emerald-950">
                Total Price for Selected Items: Rs.
                {selectedTotalPrice.toFixed(2)}
              </p>
            )}
            <div className="mt-4">
              <button
                onClick={handlePayNow}
                className="px-6 py-3 font-bold text-white bg-black rounded-full hover:bg-green-600"
              >
                Pay Now
              </button>
            </div>
          </div>
        </>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            {step === 1 ? (
              <div>
                <h2 className="mb-4 text-xl font-bold">Receiver Details</h2>
                <div className="mb-4">
                  
                  <input
                    type="email"
                    name="email"
                    value={receiverDetails.email}
                    onChange={handleReceiverChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
      
                  <input
                    type="text"
                    name="name"
                    value={receiverDetails.name}
                    onChange={handleReceiverChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Receiver Name"
                  />
                </div>
                <div className="mb-4">
       
                  <input
                    type="text"
                    name="addressLine1"
                    value={receiverDetails.addressLine1}
                    onChange={handleReceiverChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Address Line 1"
                  />
                </div>
                <div className="mb-4">
                
                  <input
                    type="text"
                    name="addressLine2"
                    value={receiverDetails.addressLine2}
                    onChange={handleReceiverChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Address Line 2"
                  />
                </div>
                
                <div className="mb-4">
                  
                  <input
                    type="text"
                    name="zipCode"
                    value={receiverDetails.zipCode}
                    onChange={handleReceiverChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Zip Code"
                  />
                </div>
                <button
                  onClick={handleNext}
                  className="items-center px-6 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            ) : (
              <div>
                <h2 className="mb-4 text-xl font-bold">Card Details</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Card Number:</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Holder Name:</label>
                  <input
                    type="text"
                    name="holderName"
                    value={cardDetails.holderName}
                    onChange={handleCardChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">CVV:</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                
                <div className="items-center justify-center">
                <button
                  onClick={handlePayment}
                  className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700">
                  Pay Rs. {selectedTotalPrice.toFixed(2)}
                </button>
         
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
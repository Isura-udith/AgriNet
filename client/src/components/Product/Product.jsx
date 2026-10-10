import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import AlertPopup from "../AlertPopup/AlertPopup";

const Product = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    sellerName: "",
    quantity: "",
    category: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProductData({ ...productData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.image) {
      setAlertMessage("Please upload an image!");
      setAlertType("error"); // Set alert type to error
      setIsAlertVisible(true);
      return;
    }

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("sellerName", productData.sellerName);
    formData.append("quantity", productData.quantity);
    formData.append("category", productData.category);
    formData.append("image", productData.image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAlertMessage("Product added successfully!");
      setAlertType("success"); // Set alert type to success
      setIsAlertVisible(true);
      console.log(response.data);
    } catch (error) {
      setAlertMessage("Error adding product. Please try again.");
      setAlertType("error"); // Set alert type to error
      setIsAlertVisible(true);
      console.error("Detailed Error:", error.response?.data || error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="max-w-2xl p-6 mx-auto bg-gray-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-800">Product Name</label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">Product Price</label>
          <input
            type="number"
            name="productPrice"
            value={productData.productPrice}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">Seller Name</label>
          <input
            type="text"
            name="sellerName"
            value={productData.sellerName}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            placeholder="Enter seller name"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">Quantity (Kg)</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            placeholder="Enter quantity in Kg"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">Product Image</label>
          <div
            {...getRootProps()}
            className="p-6 mt-2 border-2 border-dashed rounded-md cursor-pointer hover:border-gray-500"
          >
            <input {...getInputProps()} />
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="h-32 mx-auto" />
            ) : (
              <p className="text-center text-gray-500">
                Drag & drop or click to upload
              </p>
            )}
          </div>
        </div>

        {/* Category Radio Buttons */}
        <div>
          <label className="block font-medium text-gray-800">Category</label>
          <div className="flex mt-2 space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="Wholesale"
                checked={productData.category === "Wholesale"}
                onChange={handleChange}
                className="mr-2"
              />
              Wholesale
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="Retail"
                checked={productData.category === "Retail"}
                onChange={handleChange}
                className="mr-2"
              />
              Retail
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="Both"
                checked={productData.category === "Both"}
                onChange={handleChange}
                className="mr-2"
              />
              Both
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 font-bold text-white transition rounded-md bg-emerald-600 hover:bg-emerald-700"
        >
          Submit Product
        </button>
      </form>

      {/* Alert Popup */}
      <AlertPopup
        message={alertMessage}
        type={alertType} // Pass alert type ('success' or 'error') to the alert component
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />
    </div>
  );
};

export default Product;


---

# AgriNet E-Commerce Platform

AgriNet is an innovative eCommerce platform designed to revolutionize the agriculture sector in Sri Lanka by connecting farmers, wholesalers, and consumers. The platform provides a seamless online marketplace for agricultural products and services, promoting the use of modern technology to improve agricultural practices and trade.

## Features

- **Product Listings**: Users can browse a wide variety of agricultural products, including wholesale and retail items.
- **Responsive Design**: Built with React, Vite, and Tailwind CSS to ensure a smooth experience on both desktop and mobile devices.
- **Product Management**: Admins can add, update, and manage products with details such as name, price, quantity, category, and product images.
- **Shopping Cart**: Users can easily add items to their cart, update quantities, remove items, and view total prices.
- **Search & Filter**: Users can search for products by name and filter products based on price range, ratings, and categories.
- **Image Upload**: Sellers can upload product images using a drag-and-drop interface powered by `react-dropzone`.
- **MongoDB Integration**: The platform integrates with MongoDB to store product data and other essential information.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Image Upload**: react-dropzone
- **State Management**: React Context API (for Cart Management)

## Installation

To run the project locally:

1. Clone the repository:

```bash
[https://github.com/Isura-udith/AgriNet.git]
```

2. Navigate to the project folder:

```bash
cd AgriNet
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Set up your MongoDB database by editing the `.env` file with your connection URL:

```
MONGODB_URI=mongodb+srv://your-mongo-uri
```

5. Run the development server:

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`.

## Usage

1. Navigate through product categories, filter products by price range and ratings, and add items to your cart.
2. Sellers can add new products through the admin panel and upload images for each product.
3. The platform supports user authentication (to be implemented in future updates).

## Contributing

Contributions are welcome! If you want to contribute to the project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to replace the placeholders and adapt it as needed!

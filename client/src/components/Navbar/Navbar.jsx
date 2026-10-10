import React from "react";
import { MdMenu } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
//import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/website/logoN.png";
import ResponsiveMenu from "./ResponsiveMenu";
import { useCart } from "../../Pages/Cart/CartContext";

const NavbarMenu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Market", link: "/market" },
  { id: 3, name: "About", link: "/about" },
  { id: 4, name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  // Replace with actual user authentication logic
  const [user, setUser] = React.useState(null); // null = not logged in

  const goToCartPage = () => {
    navigate("/cart");
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <nav>
        <div className="container flex items-center justify-between bg-emerald-200">
          <Link to="/">
          <div className="flex items-center gap-2 py-8 font-bold">
            <img src={logo} alt="AgriNet Logo" className="max-w-12" />
            <p className="text-3xl text-emerald-600">AgriNet</p>
            <p className="pt-2 text-1xl text-secondary">Market</p>
          </div></Link>

          <div className="hidden md:block">
            <ul className="flex items-center gap-6 font-extrabold text-gray-800">
              {NavbarMenu.map((menu) => (
                <li key={menu.id} className="inline-block mx-4">
                  <Link
                    to={menu.link}
                    className="inline-block px-3 py-1 font-semibold hover:text-emerald-600"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {/* <button className="p-2 text-2xl duration-200 rounded-full hover:bg-primary hover:text-white">
              <IoSearch />
            </button> */}

            <button
              onClick={goToCartPage}
              className="relative p-2 text-2xl duration-200 rounded-full hover:bg-primary hover:text-white"
            >
              <TiShoppingCart />
              {getCartItemCount() > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                  {getCartItemCount()}
                </span>
              )}
            </button>

            {/* Conditional Login/User Name Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <p className="font-semibold text-emerald-600">
                  Welcome, {user.name}
                </p>
                <button
                  onClick={() => setUser(null)} // Simulate logout
                  className="px-4 py-1 text-sm font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden px-4 py-1 font-bold duration-200 border-2 rounded-md border-emerald-600 hover:bg-primary text-emerald-600 hover:text-white md:block"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-4xl duration-200 rounded-full hover:bg-emerald-500 hover:text-white"
            >
              <MdMenu className="text-4xl" />
            </button>
          </div>
        </div>
      </nav>

      <ResponsiveMenu open={open} />
    </>
  );
};

export default Navbar;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import PropTypes from "prop-types";
import vegi from "../../assets/website/veggies-5395029_1280.webp";

const PRODUCTS = [
  { name: "Drag And Drop", link: "#" },
  { name: "Visual Studio X", link: "#" },
  { name: "Easy Content", link: "#" },
];

const RESOURCES = [
  { name: "Industries and tools", link: "#" },
  { name: "Use cases", link: "#" },
  { name: "Blog", link: "#" },
  { name: "Online event", link: "#" },
  { name: "Nostrud exercitation", link: "#" },
];

const COMPANY = [
  { name: "Diversity & inclusion", link: "/" },
  { name: "About us", link: "about" },
  { name: "Press", link: "/" },
  { name: "Customer Stories", link: "contact" },
  {
    name: "Admin",
    link: "/admin",
  },
];

const SUPPORT = [
  { name: "Documentation", link: "#" },
  { name: "Tutorials & guides", link: "#" },
  { name: "Webinars", link: "#" },
  { name: "Open-source", link: "#" },
];

const socialIcons = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/isura.udith?mibextid=ZbWKwL" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/Isura-udith" },
  { name: "LinkedIn", icon: FaLinkedin, link: "https://github.com/Isura-udith" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
];

const Item = ({ Links, title, handleAdminClick }) => (
  <ul>
    <h1 className="mb-1 font-semibold">{title}</h1>
    {Links.map((link) => (
      <li key={link.name}>
        {link.name === "Admin" ? (
          <a
            className="text-sm leading-8 text-white duration-300 cursor-pointer hover:text-teal-400"
            href={link.link}
            onClick={handleAdminClick}
          >
            {link.name}
          </a>
        ) : (
          <a
            className="text-sm leading-8 text-white duration-300 cursor-pointer hover:text-teal-400"
            href={link.link}
          >
            {link.name}
          </a>
        )}
      </li>
    ))}
  </ul>
);

Item.propTypes = {
  Links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  handleAdminClick: PropTypes.func,
};

const ItemsContainer = ({ handleAdminClick }) => (
  <div className="grid grid-cols-1 gap-64 px-5 pt-0 pb-8 font-semibold text-gray-400 sm:grid-cols-3 lg:grid-cols-4 sm:px-8">
    <Item Links={PRODUCTS} title="PRODUCTS" />
    <Item Links={RESOURCES} title="RESOURCES" />
    <Item Links={COMPANY} title="COMPANY" handleAdminClick={handleAdminClick} />
    <Item Links={SUPPORT} title="SUPPORT" />
  </div>
);

ItemsContainer.propTypes = {
  handleAdminClick: PropTypes.func.isRequired,
};

const Footer = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handlePasswordSubmit = () => {
    if (password === "123") {
      setShowPopup(false);
      navigate("/admin"); // Navigate to admin page
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPassword("");
    setError("");
  };

  return (
    <footer className="relative text-white bg-gray-700">
      <div className="relative flex justify-center">
        <img
          src={vegi}
          alt="footer image"
          className="w-full h-[350px] opacity-80"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-50">
          <ItemsContainer handleAdminClick={handleAdminClick} />
          <div className="flex justify-between w-full px-8 pt-2 text-sm text-white">
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold item-center">
                © 2025 Apply All rights reserved | Terms | Privacy Policy
              </span>
            </div>
            <div className="flex justify-center space-x-4">
              {socialIcons.map((iconItem) => (
                <a
                  key={iconItem.name}
                  href={iconItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl duration-300 hover:text-teal-400"
                >
                  <iconItem.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            borderRadius: "8px",
          }}
        >
          <h3>Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              color: "black",
              margin: "10px 0",
              padding: "8px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <div>
            <button
              onClick={handlePasswordSubmit}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                background: "blue",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            <button
              onClick={closePopup}
              style={{
                padding: "8px 16px",
                background: "gray",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}
        </div>
      )}

      {/* Overlay */}
      {showPopup && (
        <div
          onClick={closePopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        ></div>
      )}
    </footer>
  );
};

export default Footer;

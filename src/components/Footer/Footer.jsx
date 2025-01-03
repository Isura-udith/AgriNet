import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import PropTypes from 'prop-types';
import vegi from "../../assets/website/veggies-5395029_1280.webp";
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT } from "./Menus";

const socialIcons = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
  { name: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
];

const Item = ({ Links, title }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className="text-sm leading-8 text-white duration-300 cursor-pointer hover:text-teal-400"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

Item.propTypes = {
  Links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 gap-64 px-5 pt-0 pb-8 font-semibold text-gray-400 sm:grid-cols-3 lg:grid-cols-4 sm:px-8">
      <Item Links={PRODUCTS} title="PRODUCTS" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative text-white bg-gray-700">
      <div className="relative flex justify-center">
        <img
          src={vegi}
          alt="footer image"
          className="w-full h-[350px] opacity-80"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-50">
          <ItemsContainer />
          <div className="flex justify-between w-full px-8 pt-2 text-sm text-white">
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold item-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                © 2025 Apply &nbsp;&nbsp; All rights reserved &nbsp;&nbsp; Terms Privacy Policy</span>
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
    </footer>
  );
};

export default Footer;
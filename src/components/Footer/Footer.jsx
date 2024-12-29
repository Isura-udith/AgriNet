import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import ItemsContainer from "./ItemsContainer";
import vegi from "../../assets/website/veggies-5395029_1280.webp"; // Import the image

const socialIcons = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
  { name: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
];

const Footer = () => {
  return (
    <footer className="p-2 text-white bg-gray-800">
      <ItemsContainer />
      <div className="grid grid-cols-1 gap-10 pt-2 pb-8 text-sm text-center text-gray-400 sm:grid-cols-2 lg:grid-cols-3">
        <span className="font-bold ">© 2025 Appy. All rights reserved.</span>
        <span className="font-bold">Terms · Privacy Policy</span>
        <div className="flex justify-center space-x-6">
          {socialIcons.map((iconItem) => (
            <a
              key={iconItem.name}
              href={iconItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-2xl duration-300 hover:text-teal-400"
            >
              <iconItem.icon />
            </a>
          ))}
        </div>
      </div>

      {/* Image at the bottom of the footer */}
      <div className="flex justify-center">
        <img
          src={vegi}
          alt="footer image"
          className="w-full h-[280px] opacity-60"
        />
      </div>
    </footer>
  );
};

export default Footer;
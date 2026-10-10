// Updated ResponsiveMenu.jsx
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const data = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Market", link: "/Market" },
  { id: 3, name: "About", link: "/about" },
  { id: 4, name: "Contact", link: "/contact" },
];

const ResponsiveMenu = ({ open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 flex flex-col items-center justify-center w-full h-screen pb-8 bg-green-200 bg-opacity-95"
        >
          <ul className="flex flex-col items-center justify-center gap-4 pt-8 text-gray-800">
            {data.map(({ id, name, link }) => (
              <li key={id} className="inline-block">
                <Link
                  to={link}
                  className="inline-block px-3 py-1 font-semibold hover:text-primary"
                >
                  {name}
                </Link>
              </li>
            ))}
            <li className="mt-6">
              <Link
                to="/login"
                className="px-6 py-2 font-semibold text-white rounded-md bg-primary hover:text-secondary"
              >
                Login
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ResponsiveMenu.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ResponsiveMenu;

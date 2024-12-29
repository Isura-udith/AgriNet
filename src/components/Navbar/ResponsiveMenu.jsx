import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';
import { data } from '../../mockData/data';

const ResponsiveMenu = ({ open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 items-center justify-center w-full pb-8 bg-green-200 h-180 bg-opacity-95"
        >
          <ul className="flex flex-col items-center justify-center gap-4 pt-8 text-gray-800">
            {data.map((menu) => {
              const { id, name, link } = menu;
              return (
                <li key={id} className="inline-block">
                  <a
                    href={link}
                    className="inline-block px-3 py-1 font-semibold hover:text-primary"
                  >
                    {name}
                  </a>
                </li>
              );
            })}
            <li className="mt-6">
              <a href="#" className="px-6 py-2 font-semibold text-white rounded-md bg-primary hover:text-secondary">
                Login
              </a>
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
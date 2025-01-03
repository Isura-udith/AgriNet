import React from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { data as NavbarMenu } from "../../mockData/data";
import { MdMenu } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/website/logoN.png";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <nav>
        <div className="container flex items-center justify-between bg-emerald-200 ">
          {/* logo section */}
          <div className="flex items-center gap-2 py-8 font-bold">
            <img src={logo} alt="AgriNet Logo" className=" max-w-12" />
            <p className="text-3xl text-emerald-600">AgriNet</p>
            <p className="pt-2 text-1xl text-secondary">Market</p>
          </div>

          {/* menu section */}
          <div className="hidden md:block ">
            <ul className="flex items-center gap-6 text-gray-700 text-bold">
              {NavbarMenu.map((menu) => {
                const { id, name, link } = menu;
                return (
                  <li key={id} className="inline-block mx-4">
                    <a
                      href={link}
                      className="inline-block px-3 py-1 font-semibold hover:text-emerald-600"
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* icons section */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-2xl duration-200 rounded-full hover:bg-primary hover:text-white">
              <IoSearch />
            </button>
            <button className="p-2 text-2xl duration-200 rounded-full hover:bg-primary hover:text-white">
              <TiShoppingCart />
            </button>
            <button className="hidden px-4 py-1 font-bold duration-200 border-2 rounded-md border-emerald-600 hover:bg-primary text-emerald-600 hover:text-white md:block">
              Login
            </button>
          </div>

          {/* mobile hamburger menu section */}
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

      {/*mobile menu sidebar section */}
      <ResponsiveMenu open={open} />
    </>
  );
};

export default Navbar;
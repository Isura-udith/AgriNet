import Img1 from "../assets/website/S2.jpg";
import Img2 from "../assets/website/S3.jpg";
import Img3 from "../assets/website/S1.jpg";
import { FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';

const ProductsData = [
  {
    id: 1,
    img : Img2,
    title: "Kamal Gunarathne",
    description:
      "Excellent customer service made this a wonderful experience.",
  },
  {
    id: 2,
    img: Img3,
    title: "Sunil Perera",
    description:
      "Highly recommend to anyone looking for value and reliability in their purchase.",
  },
  {
    id: 3,
    img: Img1,
    title: "Saman Dias",
    description:
      "I am very satisfied with my purchase and will definitely order again!",
  },

];
const TopProducts = ({ handleOrderPopup }) => {
  return (
    <div className="p-4">
      <div className="container">
        {/* Header section */}
        <div className="mb-24 text-left pb-4">
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Top Rated Sellers for you
          </h1>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              key={data.id}
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-200 hover:bg-black/80 dark:hover:bg-emerald-400 hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md rounded-xl"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="flex items-center justify-center w-full gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-sm text-gray-500 duration-300 group-hover:text-white line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="px-4 py-1 mt-4 text-white duration-300 rounded-full bg-primary hover:scale-105 group-hover:bg-white group-hover:text-primary"
                  onClick={handleOrderPopup}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
TopProducts.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired,
};

export default TopProducts;
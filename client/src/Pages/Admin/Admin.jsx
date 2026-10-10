import { Link } from "react-router-dom";

const NeuButton = () => {
    return (
      <div className=" min-h-[200px] flex items-center justify-center pt-60 pb-60 space-x-12 bg-emerald-200">

        <Link to={'/sellers'}>
        <button className="px-6 py-2 font-medium bg-gray-700 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Sellers Sign Details
        </button>
        </Link> 
 
        <Link to={'/buyers'}>
        <button className="px-6 py-2 font-medium bg-emerald-800 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Buyers Sign Details
        </button>
        </Link>

        <Link to={'/Adminpayment'}>
        <button className="px-6 py-2 font-medium bg-gray-700 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Payment Details
        </button>
        </Link>

        <Link to={'/product'}>
        <button className="px-6 py-2 font-medium bg-emerald-800 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Add New Product
        </button>
        </Link>

        <Link to={'/signup'}>
        <button className="px-6 py-2 font-medium bg-gray-700 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Add New Seller
        </button>
        </Link>

        </div>
    );
  };
  
  export default NeuButton;
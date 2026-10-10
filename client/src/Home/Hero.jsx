import bg from "../assets/website/fruit333.png";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import carrot from "../assets/website/carrot.png";

const Hero = () => {
  return (
    <section className="relative pb-10 bg-emerald-200 ">
      <div className="container grid h-full grid-cols-1 md:grid-cols-2">
        {/* Left Container for Content */}
        <div className="relative z-10 flex flex-col justify-center md:py-2">
          <div className="space-y-4 text-center md:text-left lg:max-w-[400px]">
            <div data-aos="fade-right">
              <h1 className="font-sans text-6xl font-bold leading-relaxed lg:text-6xl xl:leading-loose text-emerald-700">
                AgriNet
              </h1>
            </div>
            <span className="text-5xl font-semibold text-secondary whitespace-nowrap">
              Relish the Taste of Nature
            </span>
            <p className="font-mono tracking-wide text-gray-600 text-semibold whitespace-nowrap">
              Discover fresh fruits and vegetables directly from the farmers.
            </p>
            <p className="font-serif leading-relaxed tracking-wider text-gray-500">
              &quot;Discover a marketplace where quality meets trust. AgriNet
              connects you with farmers committed to delivering handpicked,
              farm-fresh fruits and vegetables for a healthier lifestyle.&quot;
            </p>
            <div>
              <a
                href="/market"
                className="inline-flex px-4 py-2 mt-3 font-medium tracking-wide text-white rounded-lg bg-emerald-600 animate-bounce focus:animate-none hover:animate-none text-md"
              >
                <span className="pt-1">
                  <RiShoppingBasket2Fill />
                </span>
                <span className="ml-2">Shop Now</span>
              </a>
            </div>
          </div>
        </div>
        {/* Right Side Image */}
        <div className="flex items-center justify-center">
          <img
            src={bg}
            alt="Fruits"
            data-aos="zoom-out-up"
            className="w-full md:w-[1000px] drop-shadow"
          />
        </div>
        <div className="absolute md:top-0 right-[58%] blur-none rotate-[0deg] py-10">
          <img
            src={carrot}
            alt="logoN"
            className="w-[230px] md:max-w-[300px]"
            data-aos="zoom-in-down"
            data-aos-duration="300"
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
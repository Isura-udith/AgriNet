import Banner from "../assets/website/bggss.jpg";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
};

const Subscribe = () => {
  return (
    <div
      data-aos="zoom-in"
      className="mb-20 text-black bg-gray-100 dark:bg-gray-500 "
      style={BannerImg}
    >
      <div className="container py-10 backdrop-blur-sm">
        <div className="max-w-xl mx-auto space-y-6">
          <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold text-white">
            Get Notified About New Products
          </h1>
          <input
            data-aos="fade-up"
            type="text"
            placeholder="Enter your email"
            className="w-full p-3 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
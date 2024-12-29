import bg from './assets/website/fruits03.png';

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-between md:flex-row">
      {/* Left Container for Content */}
      <div className="w-full md:w-[50%] text-electric-500 p-7 pb-64 text-center md:text-left">
        <h1 className="flex items-center justify-center gap-4 mb-4 text-5xl font-bold text-emerald-600">
            Welcome to AgriNet Market</h1>
        <p className="flex items-center justify-center gap-4 mb-4 text-xl font-semibold">
          Discover fresh fruits and vegetables directly from the farmers.
        </p>
          <div className='flex items-center justify-center gap-4'>
             <button className="px-6 py-2 mt-4 font-semibold text-white rounded-lg bg-emerald-500 hover:bg-emerald-600">
             Shop Now
            </button>
          </div>
      </div>

      {/* Right Side Image */}
      <div className="w-full md:w-[60%]">
        <img
          src={bg}
          alt="A variety of fresh fruits and vegetables"
          className="object-cover w-full h-[670px] ml-auto"
        />
      </div>
    </div>
  );
};

export default Home;
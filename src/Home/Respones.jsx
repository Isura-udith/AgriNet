import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const TestimonialData = [
  {
    id: 1,
    name: "Dinithi Perera",
    text: "The AgriNet team is always there to assist with any issues. Their quick responses and friendly approach make it clear they genuinely care their users.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Janith Perera",
    text: "The AgriNet platform is a game-changer. It’s user-friendly, helps reduce costs, and improves the overall farming experience.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Harsha Maduranga",
    text: "Using AgriNet has significantly increased my productivity. It's a seamless way to manage my farm's needs and reach more customers.",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 4,
    name: "Malki Perera",
    text: "AgriNet has revolutionized my farming process. The platform is easy to use and connects me to the right buyers quickly and efficiently.",
    img: "https://picsum.photos/106/106",
  },
  {
    id: 5,
    name: "D Pooja ",
    text: "AgriNet has transformed how I run my business. The tools provided make it easier to manage farm operations and connect with others in the industry.",
    img: "https://picsum.photos/103/103",
  },
];

const Response = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2400,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container p-2">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto p-10">
          <p data-aos="fade-up" className= "text-2xl font-bold text-emerald-700">
            What our customers are saying....
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6" key={data.id}>
                <div className="relative flex flex-col gap-4 px-6 py-8 mx-4 shadow-lg rounded-xl dark:bg-emerald-200 bg-emarald-700">
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt={`${data.name}'s picture`}
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="absolute top-0 right-0 font-serif text-black/20 text-9xl">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Response;

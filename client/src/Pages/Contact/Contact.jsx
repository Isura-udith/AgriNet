import { motion } from "framer-motion";

const Contact = () => {
  return (
    
    <div className="items-center justify-center text-gray-900 ">

   
      {/* Hero Section with Animated Background */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2019/05/10/14/23/contact-us-4193637_1280.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <motion.div
          className="relative z-10 flex items-center justify-center h-full text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold leading-tight transform rotate-[-5deg]">
            Let&apos;s Connect
          </h1>
        </motion.div>
        <div className="absolute left-0 right-0 text-center bottom-10 animate-bounce">
          <motion.div
            className="text-3xl text-white"
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            ↓ Down
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="px-6 py-20 text-center bg-white">
      <div data-aos="fade-up">
        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="pb-6 mb-8 font-mono text-4xl font-bold text-gray-900">
            How to Reach Us
          </h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Address */}
            <motion.div
              className="p-8 text-center transition duration-500 transform shadow-xl bg-emerald-300 rounded-xl hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="mb-6 font-serif text-2xl font-semibold text-gray-900">
                Our Office
              </h3>
              <p className="font-sans text-lg font-semibold text-gray-700">
                AgriNet Headquarters <br /> Colombo, Sri Lanka
              </p>
            </motion.div>

            {/* Phone Number */}
            <motion.div
              className="p-8 text-center transition duration-500 transform shadow-xl bg-emerald-300 rounded-xl hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="mb-6 font-serif text-2xl font-semibold text-gray-900">
                Phone
              </h3>
              <p className="font-sans text-lg font-semibold text-gray-700">
                Admin : 0112 345 678 <br />
                Manager : 0123 456 789
              </p>
            </motion.div>

            {/* Email Address */}
            <motion.div
              className="p-8 text-center transition duration-500 transform shadow-xl bg-emerald-300 rounded-xl hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="mb-6 font-serif text-2xl font-semibold text-gray-900">
                Email
              </h3>
              <p className="font-sans text-lg font-semibold text-gray-700">
                contact@agrinet.com <br />
                support@agrinet.com
              </p>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="items-center justify-center w-auto px-6 py-20 bg-gray-100 rounded-lg">
      <div data-aos="fade-up">
        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900">
            Contact Us
          </h2>
          <form action="#" method="POST" className="relative z-10 space-y-6">
            {/* Name Field */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="sm:flex-1">
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-6 py-3 mt-2 text-lg transition duration-300 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="sm:flex-1">
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-6 py-3 mt-2 text-lg transition duration-300 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-semibold text-gray-900"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="w-full px-6 py-3 mt-2 text-lg transition duration-300 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-emerald-500 focus:border-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-semibold text-white transition duration-300 rounded-lg bg-emerald-500 hover:bg-emerald-600"
            >
              Send Message
            </button>
          </form>
        </motion.div>
        </div>
      </section>

      {/* Full-Width Map Section */}
      <section className="px-6 py-20 bg-gray-100">
      <div data-aos="fade-up">
        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <h2 className="mb-8 font-serif text-4xl font-bold text-center text-gray-900">
            Find Us On The Map
          </h2>
          <div className="w-full h-[50vh] bg-gray-300 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31681.378484027184!2d81.06311338238305!3d6.9889748420429205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBadulla%20bus%20holt!5e0!3m2!1sen!2slk!4v1690047277508!5m2!1sen!2slk"
              width="100%"
              height="450"
              style={{ border: "8" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-6 py-20 text-center text-gray-800 rounded-lg bg-emerald-200">
        <div data-aos="fade-up">
        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h2 className="mb-8 text-4xl font-bold">Join the Conversation</h2>
          <p className="mb-8 text-xl">
            We look forward to hearing from you. Whether it’s feedback,
            collaboration, or inquiries, reach out today!
          </p>
          <a
            href="/contact"
            className="px-6 py-3 text-lg font-semibold text-green-600 transition duration-300 bg-white rounded-full hover:bg-gray-100 hover:text-green-700"
          >
            Contact Us Now
          </a>
        </motion.div>
        </div>
      </section>
      </div>
    
  );
};

export default Contact;

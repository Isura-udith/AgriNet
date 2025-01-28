import { motion } from 'framer-motion';


const About = () => {
  return (
    <div className="text-gray-900 bg-gray-200">
      <div data-aos="fade-up">

      {/* Hero Section */}
      <section className="relative w-full h-[86vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/02/28/20/59/carrots-2106825_1280.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <motion.div
          className="relative z-10 flex items-center justify-center h-full text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div data-aos="fade-up">
          <h1 className="font-mono text-5xl font-extrabold leading-tight sm:text-6xl">AgriNet Marlectplace</h1>
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <div data-aos="fade-up">
      <section className="px-6 py-20 text-center">
      <div data-aos="fade-up">
        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="mb-8 font-serif text-4xl font-bold text-gray-900">Our Story</h2>
          <p className="font-sans text-xl leading-relaxed text-gray-700">
            AgriNet is a forward-thinking platform dedicated to transforming agriculture in Sri Lanka. We integrate technology to streamline farming practices, enhance productivity, and bridge the gap between farmers and consumers. Our goal is to drive innovation that fosters sustainability and prosperity in the agriculture sector.
          </p>
        </motion.div>
        </div>
      </section>
      </div>
      

      {/* Mission & Vision Section */}
      <section className="px-6 py-20 bg-gray-500 bg-gradient-to-r">
      <div data-aos="fade-up">
        <div className="max-w-screen-xl mx-auto text-white">
          <motion.h2
            className="mb-12 font-serif text-4xl font-bold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Mission & Vision
          </motion.h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <motion.div
              className="p-8 text-center bg-white rounded-lg shadow-lg"
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ delay: 1, type: 'spring', stiffness: 100 }}
            >
              <h3 className="mb-6 font-mono text-2xl font-semibold text-gray-900">Our Mission</h3>
              <p className="font-sans text-lg text-gray-900">
                Our mission is to empower farmers with the best digital tools and a network that enables them to improve productivity, sustainability, and market access.
              </p>
            </motion.div>
            <motion.div
              className="p-8 text-center bg-white rounded-lg shadow-lg"
              initial={{ x: '100vw' }}
              animate={{ x: 0 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 100 }}
            >
              <h3 className="mb-6 font-mono text-2xl font-semibold text-gray-900">Our Vision</h3>
              <p className="font-sans text-lg text-gray-900">
                To create a tech-driven, sustainable agriculture ecosystem that thrives on innovation, ensures fair practices, and benefits all stakeholders in the supply chain.
              </p>
            </motion.div>
          </div>
        </div>
        </div>
      </section>
      

      {/* Key Features Section */}
      <section className="px-6 py-20 bg-gray-100">
      <div data-aos="fade-up">
        <motion.div
          className="max-w-screen-xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <h2 className="mb-12 font-serif text-4xl font-bold text-gray-900">Why Choose AgriNet?</h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              className="p-8 transition-transform duration-300 transform rounded-lg shadow-lg bg-emerald-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">Smart Farming Tools</h3>
              <p className="font-sans text-lg text-gray-700">
                Harness the power of smart farming tools designed to optimize crop production, reduce waste, and improve yields.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="p-8 transition-transform duration-300 transform rounded-lg shadow-lg bg-emerald-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">Market Access</h3>
              <p className="font-sans text-lg text-gray-700">
                Get real-time market access to buyers, suppliers, and partners, ensuring better pricing and seamless trade.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="p-8 transition-transform duration-300 transform rounded-lg shadow-lg bg-emerald-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">Sustainability</h3>
              <p className="text-lg text-gray-700">
                Our platform prioritizes sustainable practices that reduce the environmental impact while boosting farm productivity.
              </p>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 text-center bg-white">
      <div data-aos="flip-down">

        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h2 className="mb-12 font-serif text-4xl font-bold text-gray-900">What People Are Saying</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Testimonial 1 */}
            <motion.div
              className="max-w-xs p-8 transition-transform duration-300 transform bg-gray-300 rounded-lg shadow-lg hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <p className="mb-4 font-sans text-lg leading-relaxed text-gray-700">
                &quot;AgriNet helped me boost my farm&apos;s output. The tools are easy to use, and the platform has connected me with new buyers!&quot;
              </p>
              <p className="font-semibold text-gray-900">– Farmer in Colombo</p>
            </motion.div>
            {/* Testimonial 2 */}
            <motion.div
              className="max-w-xs p-8 transition-transform duration-300 transform bg-gray-300 rounded-lg shadow-lg hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <p className="mb-4 font-sans text-lg leading-relaxed text-gray-700">
                &quot;The market insights and access I’ve gained through AgriNet have been invaluable in growing my agricultural business.&quot;
              </p>
              <p className="font-semibold text-gray-900">– Supplier in Kandy</p>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-6 py-20 text-center text-white bg-emerald-500">
      <div data-aos="fade-up">
        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h2 className="mb-8 text-4xl font-bold">Join the Revolution</h2>
          <p className="mb-8 text-xl">
            Be part of the agricultural revolution in Sri Lanka. Empower yourself with technology and join AgriNet today!
          </p>
          <a href="/signup" className="px-6 py-3 text-lg font-semibold text-green-600 transition duration-300 bg-white rounded-full hover:bg-gray-100">
            Get Started
          </a>
        </motion.div>
        </div>
      </section>

      </div>

    </div>
  );
};

export default About;

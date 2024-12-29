//import DarkModeToggle from "./components/Darkmode/DarkModeToggle"

import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
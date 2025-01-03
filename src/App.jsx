//import DarkModeToggle from "./components/Darkmode/DarkModeToggle"
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home/Home";



function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar/>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
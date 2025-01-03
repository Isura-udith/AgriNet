import Banner from "./Banner"
import Hero from "./Hero"
import Response from "./Respones"
import Subscribe from "./Subscribe"
import BestSellers from "./BestSellers"
import Trending from "./Trending"

const Home = () => {
  return (
    <div>
      <Hero />
      <Trending />
      <Banner />
      <Subscribe />
      <BestSellers />
      <Response />
    </div>
  )
}

export default Home
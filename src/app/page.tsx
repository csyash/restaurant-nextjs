import Offer from "./components/Offer";
import FeaturedProducts from "./components/FeaturedProducts";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <main>
      <h1>
        <Slider />
        <FeaturedProducts />
        <Offer />
      </h1>
    </main>
  );
}

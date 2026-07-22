import CategoriesSection from "@/components/home/CategoriesSection";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { getProducts } from "@/services/product.service";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewsletterSection from "@/components/home/NewsletterSection";

async function Home() {
  const products = await getProducts();

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Hero />

      <FeaturedProducts products={featuredProducts} />

      <WhyChooseUs />

      <CategoriesSection />

      <NewsletterSection />
    </>
  );
}

export default Home;
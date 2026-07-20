import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Mouse",
    image: "/images/mouse.webp"
  },
  {
    name: "Keyboards",
    image: "/images/keyboard.webp"
  },
  {
    name: "Monitor",
    image: "/images/monitoro.webp"
  },
  {
    name: "Headset",
    image: "/images/headset.webp"
  },
];

function CategoriesSection() {
  return (
    <section 
    id="categories" 
    className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">
            Shop by Category
        </h2>

        <p className="mt-3 text-gray-500">
            Browse products by category
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((category) => (
            <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="rounded-xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
                <div className="relative h-40 w-full">
                    <Image 
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain"
                    />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                    {category.name}
                </h3>
            </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;

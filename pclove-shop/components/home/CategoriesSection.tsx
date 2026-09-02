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
    name: "Monitors",
    image: "/images/monitoro.webp"
  },
  {
    name: "Headsets",
    image: "/images/headset.webp"
  },
];

function CategoriesSection() {
  return (
    <section 
    id="categories" 
    className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shop by Category
        </h2>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
            Browse products by category
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((category) => (
            <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-500"
            >
                <div className="relative h-40 w-full">
                    <Image 
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain transition duration-300 group-hover:scale-105"
                    />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {category.name}
                </h3>
            </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;

import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-linear-to-br from-slate-900 via-slate-800 to-blue-900">
      <div className="mx-auto flex min-h-150 max-w-7xl items-center justify-between px-6 py-20">


        <div className="max-w-xl">
          <p className="mb-4 font-semibold uppercase tracking-widest text-blue-400">
            Premium Gaming Hardware
          </p>

          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Build Your Dream
            <br />
            Gaming Setup
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover premium PC components,
            gaming accessories and high-performance hardware
            for professionals and gamers.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Shop Now
            </Link>

            <Link
              href="/products"
              className="rounded-lg border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Browse Products
            </Link>
          </div>
        </div>


        <div className="relative max-auto mt-12 h-72 w-72 lg:mt-0 lg:h-125 lg:w-125
        ">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />

          <Image 
            src="/images/game-setup.png"
            alt="Gaming setup"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;
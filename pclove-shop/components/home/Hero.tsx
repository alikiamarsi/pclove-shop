"use client"

import Link from "next/link";
import HeroScene from "./HeroScene";
import { useScrollStore } from "@/scrollStore";

function Hero() {

  const phase = useScrollStore((state) => state.phase);

  return (
    <section className="relative h-screen overflow-hidden bg-black ">
      <HeroScene />
      
      {phase !== "categories" && (
        <div className="relative z-10 flex h-full items-end justify-center pb-20 text-center pointer-events-none">


        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-green-400">
            Premium Gaming Hardware
          </p>

          <h1 className="text-5xl font-bold text-white">
            Build Your Dream
            <br />
            Gaming Setup
          </h1>

            <p className="mx-auto mt-6 max-w-xl text-gray-400">
            Discover premium PC components,
            gaming accessories and high-performance hardware
            for professionals and gamers.
          </p>
          
            <div className="mt-8 flex justify-center gap-4">
              <Link
              href="/products"
              className="rounded-lg bg-green-500 px-8 py-4 font-semibold text-black"
            >
              Shop Now
            </Link>

            <Link
              href="#categories"
              className="rounded-lg border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Categories
            </Link> 
            </div>  
        </div>
      </div>
      )}
    </section>
  );
}

export default Hero;
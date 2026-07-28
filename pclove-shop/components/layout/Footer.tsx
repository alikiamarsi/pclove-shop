import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-4">

          <div>
            <h2 className="text-2xl font-bold text-white">
              PCLove
            </h2>
            <p className="mt-4 leading-7 text-gray-400">
              Premium gaming hardware and accessories
              for gamers and professionals.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Products
            </h3>

            <ul>
              <li>
                <Link
                  href="/products?category=Mouse"
                  className="transition hover:text-white"
                >
                  Mouse
                </Link>
              </li>

              <li>
                <Link 
                href="/products?category=Keyboards"
                className="transition hover:text-white"
              >
                Keyboards
              </Link>
              </li>

              <li>
                <Link
                  href="/products?category=Monitor"
                  className="transition hover:text-white"
                >
                  Monitor
                </Link>
              </li>

              <li>
                <Link 
                  href="/products?category=Headset"
                  className="transition hover:text-white"
                >
                  Headset
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link 
                  href="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="transition hover:text-white"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link 
                  href="/cart"
                  className="transition hover:text-white"
                  >
                  Cart
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="font-semibold text-white">
              Support
            </h3>

            <ul className="mt-4 space-y-3">
              <li className="transition hover:text-white cursor-pointer">
                Contact Us
              </li>

              <li className="transition hover:text-white cursor-pointer">
                FAQ
              </li>

              <li className="transition hover:text-white cursor-pointer">
                Shipping
              </li>

              <li className="transition hover:text-white cursor-pointer">
                Returns
              </li>
            </ul>

            <div className="mt-6 flex gap-4">
              <FaGithub className="h-5 w-5 cursor-pointer transition hover:text-white" />
              <FaInstagram className="h-5 w-5 cursor-pointer transition hover:text-white" />
              <FaLinkedin className="h-5 w-5 cursor-pointer transition hover:text-white" />
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © 2026 PCLove. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
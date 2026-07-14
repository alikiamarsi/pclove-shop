import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 sm:grid-cols-3">

          <div>
            <h2 className="text-xl font-bold text-blue-600">
              PCLove
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Your trusted PC store.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Links
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="font-semibold">
              Support
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                Contact Us
              </li>

              <li>
                FAQ
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
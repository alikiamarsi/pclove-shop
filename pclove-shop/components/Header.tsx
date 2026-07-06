import { ShoppingCart } from "lucide-react"
import Link from "next/link"

function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Link
            href="/"
            className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
            >
                PCLove
            </Link>
            <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="font-medium transition hover:text-blue-600"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className="relative flex items-center"
              >
                <ShoppingCart className="h-6 w-6 transition hover:text-blue-600" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  0
                </span>

              </Link>
            </li>
          </ul>
        </nav>
        </div>
    </header>
  )
}

export default Header
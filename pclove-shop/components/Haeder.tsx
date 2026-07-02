import Link from "next/link"


function Haeder() {
  return (
    <header className="border-b shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
            >
                PCLove
            </Link>
            <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="transition hover:text-blue-600"
              >
                Home
              </Link>
            </li>

            <li>
              <button className="relative text-2xl">
                🛒
              </button>
            </li>
          </ul>
        </nav>
        </div>
    </header>
  )
}

export default Haeder
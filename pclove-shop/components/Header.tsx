import Link from "next/link";
import HeaderClient from "./HeaderClient";

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

        <HeaderClient />
      </div>
    </header>
  );
}

export default Header;

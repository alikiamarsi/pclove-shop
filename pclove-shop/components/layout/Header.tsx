import Link from "next/link";
import HeaderClient from "./HeaderClient";
import CategoriesDropdown from "../categories/CategoriesDropdown";
import ThemeToggleWrapper from "./ThemeToggleWrapper";

function Header() {
  return (
    <header className="relative z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
        >
          PCLove
        </Link>

      <div className="flex items-center gap-4">
        <ThemeToggleWrapper/>

        <HeaderClient>
          <CategoriesDropdown />
        </HeaderClient>
      </div>
      </div>
    </header>
  );
}

export default Header;

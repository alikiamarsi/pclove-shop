import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-96 max-w-7xl items-center justify-center px-6 py-10">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Page not found
        </h1>

        <p className="mt-4 text-gray-500">
          The page or product you are looking for does not exist.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Browse products
        </Link>
      </div>
    </main>
  );
}
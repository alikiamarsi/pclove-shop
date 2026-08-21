"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function ProductsError({
  error,
  unstable_retry,
}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-96 max-w-7xl items-center justify-center px-6 py-10">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold">
          Unable to load products
        </h1>

        <p className="mt-3 text-gray-500">
          Something went wrong while loading the product catalog.
          Please try again.
        </p>

        <button
          type="button"
          onClick={unstable_retry}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
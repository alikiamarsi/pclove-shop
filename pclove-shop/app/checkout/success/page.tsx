import Link from "next/link";

function CheckoutSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for your order. We have received your information and your
          order is being processed.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          This is a demo checkout. No payment was processed.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default CheckoutSuccessPage;
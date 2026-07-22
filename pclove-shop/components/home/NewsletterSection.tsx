

function NewsletterSection() {
  return (
    <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl font-bold text-white">
                Stay Updated
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-300">
                Subscribe to recive the lastest gaming hardware,
                exclusive offers and product updates.
            </p>

            <form className="mt-10 flex flex-col gap-4 sm:flex-row">
                <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 rounded-xl border-white/10 bg-white px-5 py-4 text-gray-900 outline-none transition focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
                >
                    Subscribe
                </button>
            </form>
        </div>
    </section>
  )
}

export default NewsletterSection
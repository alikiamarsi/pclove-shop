

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
                className="
                    flex-1 rounded-xl
                    border border-gray-200
                    bg-white
                    px-5 py-4
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-500

                    dark:border-gray-700
                    dark:bg-[#182233]
                    dark:text-gray-100
                    dark:placeholder:text-gray-500
                    "
                />

                <button
                    type="submit"
                    className="
                        flex-1 rounded-xl
                        border border-gray-200
                        bg-white
                        px-5 py-4
                        text-gray-900
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-blue-500

                        dark:border-gray-700
                        dark:bg-[#182233]
                        dark:text-gray-100
                        dark:placeholder:text-gray-500
                        "
                >
                    Subscribe
                </button>
            </form>
        </div>
    </section>
  )
}

export default NewsletterSection
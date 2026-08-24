export default function Loading() {
    return (
        <main className="mx-auto max-w-screen-2xl py-10">
            <div className="mb-8 h-9 w-48 animate-pulse rounded bg-gray-200" />
                <div className="flex gap-8">
                    <aside className="hidden h-96 animate-pulse rounded-lg bg-gray-100 lg:block" />
                    <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8}).map((_, index) => (
                            <div 
                                key={index}
                                className="h-96 animate-pulse rounded-xl bg-gray-100"
                            />
                        ))}
                    </div>
                </div>
        </main>
    )
}
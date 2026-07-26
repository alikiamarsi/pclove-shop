"use client"

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
    categories: string[];
}

function CategoryFilter({categories}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get("category")
  return (
    <div>
        <h3 className="mb-3 font-semibold">
            Category
        </h3>

        <ul>
            {categories.map((category) => (
                <li
                    key={category}
                    className="flex items-center gap-2"
                >
                    <input 
                        type="checkbox"
                        id={category}
                        checked={selectedCategory === category}
                        onChange={() => {
                            const params = new URLSearchParams(
                                searchParams.toString()
                            );

                            if(selectedCategory === category) {
                                params.delete("category");
                            } else {
                                params.set("category", category);
                            }

                            router.push(
                                `/products?${params.toString()}`
                            );

                            router.refresh();
                        }}
                    />

                    <label 
                        htmlFor={category}
                        className="cursor-pointer text-sm"
                    >
                        {category}
                    </label>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default CategoryFilter
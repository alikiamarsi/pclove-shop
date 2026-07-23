"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
    brands : string[]
};

function BrandFilter({brands}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedBrands = searchParams.getAll("brand");
  return (
    <div>
        <h3 className="mb-3 font-semibold">
            Brand
        </h3>

        <ul className="space-y-2">
            {brands.map((brand) => (
                <li 
                    key={brand}
                    className="flex items-center gap-2"
                    >
                        <input 
                            type="checkbox"
                            id={brand}
                            checked={selectedBrands.includes(brand)}
                            onChange={() => {
                                const params = new URLSearchParams(searchParams.toString());

                                if(selectedBrands.includes(brand)) {
                                    params.delete("brand");

                                    selectedBrands
                                    .filter((item)=> item !== brand)
                                    .forEach((item) => {
                                        params.append("brand", item)
                                    })
                                } else {
                                    params.append("brand", brand);
                                }
                                router.push(`?${params.toString()}`)
                            }}
                        />

                        <label
                            htmlFor={brand}
                            className="cursor-pointer text-sm"
                        >
                            {brand}
                        </label>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default BrandFilter
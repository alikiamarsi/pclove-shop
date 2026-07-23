"use client"
import { useRouter, useSearchParams } from "next/navigation"


function RatingFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedRating = searchParams.get("rating");

    const rating = [4, 3, 2, 1];
  return (
    <div>
        <h3 className="space-y-2">
            Rating
        </h3>

        <ul>
            {rating.map((rating) => (
                <li
                    key={rating}
                    className="flex items-center gap-2"
                >

                    <input 
                    type="checkbox" 
                    id={`rating-${rating}`}
                    checked={selectedRating === String(rating)}
                    onChange={() => {
                        const params = new URLSearchParams(
                            searchParams.toString()
                        );

                        if(selectedRating === String(rating)) {
                            params.delete("rating");
                        } else {
                            params.set("rating", String(rating));
                        }

                        router.push(
                            `/products?${params.toString()}`
                        );
                        router.refresh()
                    }}
                    />

                    <label 
                    htmlFor={`rating-${rating}`}
                    className="cursor-pointer text-sm"
                    >
                        {rating} + Stars
                    </label>

                </li>
            ))}
        </ul>
    </div>
  )
}

export default RatingFilter
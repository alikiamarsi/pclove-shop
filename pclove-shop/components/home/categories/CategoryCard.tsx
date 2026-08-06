"use client";

type Props = {
  name: string;
  opacity?: number
};

function CategoryCard({ name }: Props) {
  return (
    <div
      className="
        group
        flex h-40 w-56
        cursor-pointer
        items-center justify-center
        rounded-2xl
        border border-green-400/30
        bg-white/5
        backdrop-blur-xl
        text-2xl
        font-bold
        text-white
        transition-all
        duration-500
        hover:scale-110
        hover:bg-green-400/10
        hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]
    "
    >
    <span className="
        transition-all
        duration-500
        group-hover: text-green-400
    ">
        {name}
    </span>
    </div>
  );
}

export default CategoryCard;

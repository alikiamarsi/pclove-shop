"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { useState } from "react";
import ProductPreview from "./ProductPreview";
import { useFloating ,offset, flip, shift } from "@floating-ui/react";
type Props = {
  products: Product[];
};

function ProductGrid({ products }: Props) {
    const[previewProduct, setPreviewProduct] = useState<Product | null>(null)
    const [isePreviewOpen, setIsPreviewOpen] = useState(false)
    const {
        refs,
        floatingStyles,
    } = useFloating({
        placement: "right-start",
        middleware: [
            offset(12),
            flip(),
            shift(),
        ]
    })

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard 
            key={product.id}
            product={product}
            onHover={(element) => {
                refs.setReference(element);
                setPreviewProduct(product);
                setIsPreviewOpen(true)
            }}
        onLeave={() => setIsPreviewOpen(false)}
        />
      ))}

      {previewProduct && isePreviewOpen && (
        <ProductPreview 
        product={previewProduct}
        floatingStyles={floatingStyles}
        floatingRef={refs.setFloating}
        />
      )}
    </div>
  );
}

export default ProductGrid;
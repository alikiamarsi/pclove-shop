"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { useFloating ,offset, flip, shift, useDismiss, useInteractions } from "@floating-ui/react";
type Props = {
  products: Product[];
};

function ProductGrid({ products }: Props) {
    const[previewProduct, setPreviewProduct] = useState<Product | null>(null)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const {
        refs,
        floatingStyles,
        context,
    } = useFloating({
        open: isPreviewOpen,
        onOpenChange: setIsPreviewOpen,
        placement: "right-start",
        middleware: [
            offset(12),
            flip(),
            shift(),
        ]
    })

    const dismiss = useDismiss(context);
    const {getFloatingProps} = useInteractions([
      dismiss
    ])

    function openPreview(product: Product, element:HTMLElement) {
      refs.setReference(element);

      setPreviewProduct(product);
      setIsPreviewOpen(true)
    }

    function closePreview() {
      setIsPreviewOpen(false);
      setPreviewProduct(null)
    }

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if(e.key === "Escape") {
          setIsPreviewOpen(false);
          setPreviewProduct(null);
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    })
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard 
            key={product.id}
            product={product}
            onQuickView={openPreview}
        />
      ))}

      {previewProduct && isPreviewOpen && (
        <ProductPreview 
        product={previewProduct}
        floatingStyles={floatingStyles}
        floatingRef={refs.setFloating}
        onClose={closePreview}
        floatingProps={getFloatingProps()}
        />
      )}
    </div>
  );
}

export default ProductGrid;
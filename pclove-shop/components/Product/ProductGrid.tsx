"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { useCallback, useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { useFloating ,offset, flip, shift, useDismiss, useInteractions } from "@floating-ui/react";
type Props = {
  products: Product[];
  mobileColumns: 1 | 2;
  desktopColumns: 2 | 3 | 4;
};

function ProductGrid({ 
  products,
  mobileColumns,
  desktopColumns,
}: Props) {
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
      dismiss,
    ]);

    const openPreview = useCallback(
      (product: Product, element:HTMLElement) => {
      refs.setReference(element);

      setPreviewProduct(product);
      setIsPreviewOpen(true)
    },
    [refs]
    );

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
    }, [])
      const mobileGridClass =
        mobileColumns === 1
        ? "grid-cols-1"
        : "grid-cols-2";

      const desktopGridClass =
        desktopColumns === 2
        ? "sm:grid-cols-2"
        : desktopColumns === 3
          ? "sm:grid-cols-3"
          : "sm:grid-cols-4";

  return (
    <div className={`grid gap-6 ${mobileGridClass} ${desktopGridClass}`}>
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
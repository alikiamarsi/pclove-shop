import { Product } from "@/types/product"

type Props = {
    product: Product
}

function ProductCard({product}: Props) {
  return (
    <div>
        <h2>{product.title}</h2>
        <p>{product.price}</p>
    </div>
  )
}

export default ProductCard
import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/products'
import ProductDetailClient from '@/components/product-detail-client'

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}

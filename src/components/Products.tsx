import AnimatedList from './AnimatedList'
import { ProductType, getProducts } from '@/lib/sanity'

export default async function Products() {
  const products = (await getProducts()) as ProductType[]

  return (
    <section className="my-40">
      <h3 className=" text-right text-5xl font-medium">#products</h3>
      <AnimatedList items={products} />
    </section>
  )
}

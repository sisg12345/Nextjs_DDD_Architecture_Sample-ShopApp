import AddCart from './AddCart'
import BreadcrumbList from './BreadcrumbList'
import ProductInfo from './ProductInrfo'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import type { Product, ProductDetail, ResponseResult } from '@/types'
import { fetcher } from '@/utils/fetch/fetcher'

type ProductProps = {
  /** パラメーター */
  params: Promise<{ id: Product['id'] }> /** 商品ID */
}

/**
 *
 * @param id 商品ID
 * @returns 商品情報
 */
const searchProductById = async (id: number): Promise<ProductDetail> => {
  // 商品情報を取得
  const response = await fetcher<ResponseResult<ProductDetail>>(
    `http://localhost:3000/api/products/${id}`,
  )
  if (!response.data) {
    throw new Error(response.message)
  }

  return response.data
}

/**
 * 商品ページ
 */
export default async function ProductPage({ params }: ProductProps) {
  // 商品ID
  const { id } = await params
  // 商品情報を取得
  const product = await searchProductById(id)

  return (
    <Box>
      {/* パンくずリスト */}
      <BreadcrumbList {...product} />
      <Flex
        as="main"
        $justifyContent="center"
        $flexDirection={{ base: 'column', md: 'row' }}
        $width="100%"
      >
        {/* 商品情報 */}
        <ProductInfo {...product}>
          {/* カートに商品を追加 */}
          <AddCart
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
            }}
            routeInfo={{ pathname: '/cart' }}
          />
        </ProductInfo>
      </Flex>
    </Box>
  )
}

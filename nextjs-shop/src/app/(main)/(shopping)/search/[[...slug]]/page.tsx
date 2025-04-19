'use client'

import { notFound } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import BreadcrumbList from './BreadcrumbList'
import CategoryFilter from './CategoryFilter'
import ProductList from './ProductList'
import Box from '@/components/layouts/Box'
import Flex from '@/components/layouts/Flex'
import { searchProducts } from '@/lib/services/products/search-products'
import type { Product, ProductCategory, ProductCondition, ResponseResult } from '@/types'

type SearchPageProps = {
  /** パラメーター */
  params: Promise<{ slug: string[] }>
  /** クエリ */
  searchParams: Promise<Record<string, ProductCondition[]>>
}

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  // パラメーター
  const { slug } = use(params)
  // パラメーターがカテゴリではない場合はNot Foundページに遷移
  if (slug) {
    const searchSlug: ProductCategory[] = ['shoes', 'clothes', 'book']
    if (slug.length > 1 || !searchSlug.includes(slug[slug.length - 1] as ProductCategory)) {
      notFound()
    }
  }

  // クエリから商品の状態を取得
  const { condition: query } = use(searchParams)

  // 商品状態を配列に変換
  const conditions = (() => {
    if (Array.isArray(query)) {
      return query
    }
    if (query) {
      return [query]
    }

    return []
  })()
  // 商品カテゴリー
  const category = slug?.length === 1 ? (slug[slug.length - 1] as ProductCategory) : undefined
  // 商品一覧
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    ;(async () => {
      // 商品一覧取得
      const products = await searchProducts<ResponseResult<Product[]>>({
        category,
        conditions,
        limit: 20,
        page: 1,
      })
      // 商品一覧の状態をセット
      setProducts(products.data ?? [])
    })()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [slug, query])

  return (
    <Box>
      {/* パンくずリスト */}
      <BreadcrumbList category={category} />
      <Flex as="main" $paddingTop={2}>
        <Flex $flexDirection={{ base: 'column', md: 'row' }}>
          {/* カテゴリーフィルター */}
          <CategoryFilter routeInfo={{ pathname: category ? `/search/${category}` : `/search` }} />
          {/* 商品一覧 */}
          <ProductList products={products} />
        </Flex>
      </Flex>
    </Box>
  )
}

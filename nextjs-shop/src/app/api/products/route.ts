import { NextRequest, NextResponse } from 'next/server'
import { Command } from '@/server/application/product/get/category/command'
import { GetProductsHandler } from '@/server/application/product/get/category/getProductsHandler'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import type { ProductCategory, ProductCondition, ResponseResult } from '@/types'
import type { OrderBy } from '@/types/database'

/**
 * カテゴリーの商品を取得
 *
 * @param request リクエスト
 * @returns
 */
export async function GET(request: NextRequest) {
  // クエリーを取得
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as ProductCategory
  const condition = searchParams.getAll('condition') as ProductCondition[]
  const page = searchParams.get('_page')
  const limit = searchParams.get('_limit')
  const sort = searchParams.get('_sort')?.split(',') ?? null
  const order = searchParams.get('_order')?.split(',') as OrderBy[]

  // ユースケースのインプットデータ
  const inputData = new Command(category, condition, page, limit, sort, order)

  // ユースケース実行
  const result: ResponseResult = await new GetProductsHandler(
    inputData,
    new ProductRepository(),
  ).handle()

  // 結果返却
  return NextResponse.json(result, { status: result.status })
}

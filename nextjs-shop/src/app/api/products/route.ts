import { NextRequest, NextResponse } from 'next/server'
import { diContainer } from '@/lib/inversify/inversify.config'
import TYPES from '@/lib/inversify/symbol'
import { Command } from '@/server/application/product/get/category/command'
import { GetProductsHandler } from '@/server/application/product/get/category/getProductsHandler'
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

  // DI
  const getProductsHandler = diContainer.get<GetProductsHandler>(TYPES.IGetProductsHandler)
  // ユースケース実行
  const result: ResponseResult = await getProductsHandler.handle(inputData)

  // 結果返却
  return NextResponse.json(result, { status: result.status })
}

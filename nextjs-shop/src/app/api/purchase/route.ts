import { NextRequest, NextResponse } from 'next/server'
import { Command } from '@/server/application/product/create/order/command'
import { CreateProductOrderHandler } from '@/server/application/product/create/order/createProductOrderHandler'
import { ProductService } from '@/server/domain/services/productService'
import { ResponseResult } from '@/types'

// リクエストボディー
type RequestBody = {
  productId: number
}

/**
 * 商品を購入
 *
 * @param request リクエスト
 * @param param パラメーター
 */
export async function POST(request: NextRequest) {
  // リクエストボディー
  const { productId } = (await request.json()) as RequestBody
  // ユースケースのインプットデータ
  const inputData = new Command(Number(productId))

  // ユースケース実行
  const result: ResponseResult = await new CreateProductOrderHandler(
    inputData,
    new ProductService(),
  ).handler()

  return NextResponse.json(result, { status: result.status })
}

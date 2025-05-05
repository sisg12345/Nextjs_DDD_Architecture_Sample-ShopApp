import { NextRequest, NextResponse } from 'next/server'
import { diContainer } from '@/inversify.config'
import { Command } from '@/server/application/product/create/order/command'
import { CreateProductOrderHandler } from '@/server/application/product/create/order/createProductOrderHandler'
import { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'

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

  // DI
  const createProductOrderHandler = diContainer.get<CreateProductOrderHandler>(
    TYPES.ICreateProductOrderHandler,
  )
  // ユースケース実行
  const result: ResponseResult = await createProductOrderHandler.handler(inputData)

  // 結果返却
  return NextResponse.json(result, { status: result.status })
}

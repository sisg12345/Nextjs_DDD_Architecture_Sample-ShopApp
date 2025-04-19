import { NextRequest, NextResponse } from 'next/server'
import { Command } from '@/server/application/product/get/info/command'
import { GetProductHandler } from '@/server/application/product/get/info/getProductHandler'
import { ProductRepository } from '@/server/infrastructure/repositories/product/productRepository'
import { ResponseResult } from '@/types'

/**
 *  商品情報を取得
 *
 * @param request リクエスト
 * @param param パラメーター
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // 商品ID
  const productId = (await params).id
  // ユースケースのインプットデータ
  const inputData = new Command(Number(productId))

  // ユースケース実行
  const result: ResponseResult = await new GetProductHandler(
    inputData,
    new ProductRepository(),
  ).handle()

  // 結果返却
  return NextResponse.json(result, { status: result.status })
}

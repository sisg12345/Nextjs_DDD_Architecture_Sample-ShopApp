import { NextRequest, NextResponse } from 'next/server'
import { diContainer } from '@/lib/inversify/inversify.config'
import TYPES from '@/lib/inversify/symbol'
import { IGetProductHandler } from '@/server/application/product/get/info/IGetProductHandler'
import { Command } from '@/server/application/product/get/info/command'
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

  // DI
  const getProductHandler = diContainer.get<IGetProductHandler>(TYPES.IGetProductHandler)
  // ユースケース実行
  const result: ResponseResult = await getProductHandler.handle(inputData)

  // 結果返却
  return NextResponse.json(result, { status: result.status })
}

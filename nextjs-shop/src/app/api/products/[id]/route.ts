import { NextRequest, NextResponse } from 'next/server'
import { diContainer } from '@/inversify.config'
import { IGetProductHandler } from '@/server/application/product/get/info/IGetProductHandler'
import { Command } from '@/server/application/product/get/info/command'
import { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'

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

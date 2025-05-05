import { NextRequest, NextResponse } from 'next/server'
import { diContainer } from '@/inversify.config'
import { Command } from '@/server/application/user/get/command'
import { GetUserHandler } from '@/server/application/user/get/getUserHandler'
import { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'

/**
 * ユーザー取得
 *
 * @param request リクエスト
 * @param param パラメーター
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // ユースケースのインプットデータ
  const inputData = new Command(Number((await params).id))

  // DI
  const getUserHandler = diContainer.get<GetUserHandler>(TYPES.IGetUserHandler)
  // ユースケース実行
  const result: ResponseResult = await getUserHandler.handle(inputData)

  // 結果返却
  return NextResponse.json(result, { status: result.status })
}

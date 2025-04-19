import { NextRequest, NextResponse } from 'next/server'
import { Command } from '@/server/application/user/get/command'
import { GetUserHandler } from '@/server/application/user/get/getUserHandler'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import { ResponseResult } from '@/types'

/**
 * ユーザー取得
 *
 * @param request リクエスト
 * @param param パラメーター
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // ユースケースのインプットデータ
  const inputData = new Command(Number((await params).id))

  // ユースケース実行
  const result: ResponseResult = await new GetUserHandler(inputData, new UserRepository()).handle()

  // 結果返却
  return NextResponse.json(result, { status: result.status })
}

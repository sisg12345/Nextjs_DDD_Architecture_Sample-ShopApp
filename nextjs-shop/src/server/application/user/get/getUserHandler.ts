import 'server-only'

import { Command } from './command'
import { ValidateInteger } from '@/server/application/common/validations/validationUtils'
import { UserEntity } from '@/server/domain/entities/userEntity'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import { log } from '@/server/shared/decorators/log'
import { NotFoundError } from '@/server/shared/errors/notFoundError'
import { ValidationError } from '@/server/shared/errors/validationError'
import { ResponseResult } from '@/types'

export class GetUserHandler {
  constructor(
    private readonly command: Command,
    private readonly userRepository: UserRepository,
  ) {}

  @log
  public async handle(): Promise<ResponseResult> {
    // ステータスコード
    let status = 200
    // 処理結果
    let success = true
    // 取得データ
    // let data: responseData | null = null
    let data: ReturnType<UserEntity['toPrimitives']> | null = null

    try {
      // バリデーション実行
      await this.validate(this.command)

      // ユーザーを取得
      const result = await this.userRepository.findById(this.command.userId)
      // データが存在しない場合
      if (!result) {
        // Not Found エラー
        throw new NotFoundError()
      }
      data = result.toPrimitives()
    } catch (error: unknown) {
      // エラーステータスコード
      status = 500
      // 処理失敗
      success = false

      // バリデーションエラー
      if (error instanceof ValidationError) {
        // エラースターすコード
        status = error.status
      }
      // Not Found エラー
      if (error instanceof NotFoundError) {
        // エラースターすコード
        status = error.status
      }
    }

    return {
      status,
      success,
      data,
    }
  }

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  @log
  private async validate(command: Command): Promise<void> {
    // 整数チェック
    ValidateInteger(command.userId)
  }
}

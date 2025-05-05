import 'server-only'

import { inject, injectable } from 'inversify'
import { IGetUserHandler } from './IGetUserHandler'
import { Command } from './command'
import { ValidateInteger } from '@/server/application/common/validations/validationUtils'
import { UserEntity } from '@/server/domain/entities/userEntity'
import { IUserRepository } from '@/server/domain/interfaces/repositories/IUserRepository'
import { log } from '@/server/shared/decorators/log'
import { NotFoundError } from '@/server/shared/errors/notFoundError'
import { ValidationError } from '@/server/shared/errors/validationError'
import { ResponseResult } from '@/types'
import TYPES from '@/types/symbol'

@injectable()
export class GetUserHandler implements IGetUserHandler {
  readonly #userRepository: IUserRepository

  constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this.#userRepository = userRepository
  }

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    // ステータスコード
    let status = 200
    // 処理結果
    let success = true
    // 取得データ
    // let data: responseData | null = null
    let data: ReturnType<UserEntity['toPrimitives']> | null = null

    try {
      // バリデーション実行
      await this.validate(command)

      // ユーザーを取得
      const result = await this.#userRepository.findById(command.userId)
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
